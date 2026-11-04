import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMotionPref } from '@/hooks/useMotionPref';
import { useOpenStatus } from '@/hooks/useMisc';
import { statusLabel } from '@/lib/hours';
import { track } from '@/lib/analytics';
import { relativeDayName } from '@/lib/time';
import { cachedBusy } from '@/booking/busyCache';
import { bookableDays, slotsFor } from '@/booking/availability';
import { useScheduleVersion } from '@/booking/sync';
import { site } from '@/config/site';
import { LinkButton, Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { SmartImage } from '../ui/SmartImage';
import { scrollToSection } from '../layout/nav';

const ease = [0.16, 1, 0.3, 1] as const;
const QUICK_SERVICE = 'corte-assinatura';

/** Primeiro horário livre do corte assinatura, para oferecer o agendamento em um toque. */
function useNextSlot() {
  const [next, setNext] = useState<{ day: string; time: string } | null>(null);
  const { tick } = useScheduleVersion({ fallbackMs: 30_000 });
  useEffect(() => {
    let alive = true;
    (async () => {
      const now = new Date();
      for (const d of bookableDays([QUICK_SERVICE], 'any', now).filter((x) => x.works).slice(0, 7)) {
        const slot = slotsFor([QUICK_SERVICE], 'any', d.day, await cachedBusy(d.day), now)[0];
        if (slot) return alive && setNext({ day: d.day, time: slot.time });
      }
      if (alive) setNext(null);
    })().catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [tick]);
  return next;
}

const pillars = ['Hora marcada', 'Café na chegada', 'Sala VIP', 'Cabelo infantil na tesoura'];

/** Abertura estática: título, convite de agendamento e uma foto. Sem vídeo de fundo. */
export function Hero() {
  const { reduced } = useMotionPref();
  const status = useOpenStatus();
  const label = statusLabel(status);
  const next = useNextSlot();
  const fade = (delay: number) => ({ initial: { opacity: 0, y: reduced ? 0 : 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease } });

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-ink pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <motion.p {...fade(0.05)} className="inline-flex w-fit items-center gap-2.5 rounded-full border hairline bg-ink-2 px-3.5 py-2 text-[12px]">
            <span className="relative flex h-2 w-2">
              {status.open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass opacity-50" />}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${status.open ? 'bg-brass' : 'bg-muted'}`} />
            </span>
            <span className="font-semibold">{label.short}</span>
            <span className="text-muted">· {label.detail}</span>
          </motion.p>

          <motion.p {...fade(0.1)} className="eyebrow mt-8 flex items-center gap-3">
            <span aria-hidden="true" className="leaf text-moss" />
            Desde 2019 em {site.address.city}
          </motion.p>

          <motion.h1 id="hero-title" {...fade(0.15)} className="display mt-4 text-[clamp(3.4rem,11vw,7.5rem)]">
            Corte com <em className="brass-text">calma.</em>
          </motion.h1>

          <motion.p {...fade(0.25)} className="mt-6 max-w-lg text-[17px] leading-7 text-muted md:text-[19px] md:leading-8">
            Precisão sem pressa: corte, barba e café na chegada, com hora marcada. Do primeiro corte da criança à Sala VIP.
          </motion.p>

          <motion.div {...fade(0.35)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton to="/agendar" size="lg" iconRight="arrowRight" onClick={() => track('cta_book_click', { from: 'hero' })}>
              Agendar horário
            </LinkButton>
            <Button variant="ghost" size="lg" onClick={() => scrollToSection('servicos', reduced)}>
              Ver serviços e preços
            </Button>
          </motion.div>

          {next && (
            <motion.div {...fade(0.45)}>
              <Link
                to={`/agendar?servico=${QUICK_SERVICE}&dia=${next.day}&hora=${next.time}`}
                onClick={() => track('cta_book_click', { from: 'hero_next_slot' })}
                className="group mt-5 inline-flex min-h-11 flex-wrap items-center gap-x-2.5 text-[14px] text-muted"
              >
                <span>Próximo horário livre:</span>
                <span className="font-semibold text-brass underline decoration-brass/40 underline-offset-4 group-hover:decoration-brass">
                  {relativeDayName(next.day).toLowerCase()} às {next.time}
                </span>
                <Icon name="arrowRight" className="h-4 w-4 text-brass transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          )}
        </div>

        <motion.div {...fade(0.2)} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div aria-hidden="true" className="absolute -right-3 -top-3 hidden h-full w-full rounded-2xl bg-moss/40 sm:block" />
          <div className="night relative overflow-hidden rounded-2xl border hairline">
            <SmartImage id="poltrona-vertical" alt="Poltrona preta de barbeiro diante do espelho" sizes="(min-width: 1024px) 40vw, 90vw" ratio="4 / 5" focal="50% 60%" priority />
          </div>
          <div className="absolute -bottom-5 left-4 right-4 flex items-center gap-3 rounded-xl border hairline bg-ink-2 p-4 shadow-[var(--shadow-card)] sm:left-auto sm:right-6 sm:max-w-[16rem]">
            <span aria-hidden="true" className="leaf shrink-0 text-brass" style={{ width: 22, height: 22 }} />
            <p className="text-[13px] leading-5">
              <span className="block font-semibold">Mais que um corte,</span>
              <span className="text-muted">uma experiência.</span>
            </p>
          </div>
        </motion.div>
      </div>

      <ul aria-label="Diferenciais" className="container-x mt-16 grid grid-cols-2 gap-x-6 gap-y-3 border-t hairline pt-6 text-[12px] font-semibold uppercase tracking-[0.14em] md:mt-24 md:flex md:flex-wrap md:justify-between">
        {pillars.map((p) => (
          <li key={p} className="flex items-center gap-2.5">
            <span aria-hidden="true" className="leaf text-moss" />
            {p}
          </li>
        ))}
      </ul>
    </section>
  );
}
