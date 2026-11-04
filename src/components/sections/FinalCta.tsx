import { whatsappLink, waMessages } from '@/lib/whatsapp';
import { track } from '@/lib/analytics';
import { LinkButton, ExternalButton } from '../ui/Button';
import { MaskLines, Reveal } from '../ui/Reveal';

/** Convite final: faixa verde Relax com folhas decorativas (sem foto de fundo). */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative z-10 bg-ink px-5 pb-20 pt-4 sm:px-8 md:pb-28 lg:px-12">
      <div className="night relative mx-auto max-w-[1240px] overflow-hidden rounded-2xl bg-[rgb(46_74_58)] px-6 py-16 text-[#faf7f1] md:px-16 md:py-24">
        <span aria-hidden="true" className="leaf absolute -right-10 -top-10 text-[#faf7f1]/10" style={{ width: 280, height: 280 }} />
        <span aria-hidden="true" className="leaf absolute -bottom-16 right-32 hidden text-[#faf7f1]/10 md:block" style={{ width: 160, height: 160 }} />
        <div className="relative">
          <Reveal>
            <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#c4dac9]">
              <span aria-hidden="true" className="leaf" />
              Viva a experiência Relax
            </p>
          </Reveal>
          <MaskLines as="h2" lines={['Chegue,', <em key="e" className="italic text-[#c4dac9]">relaxe.</em>]} className="display mt-5 text-[clamp(3rem,10vw,6.5rem)]" />
          <Reveal delay={0.15} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton to="/agendar" size="lg" iconRight="arrowRight" className="!bg-[#faf7f1] !text-[#12130f] hover:!bg-white" onClick={() => track('cta_book_click', { from: 'final' })}>
              Agendar horário
            </LinkButton>
            <ExternalButton href={whatsappLink(waMessages.general())} variant="ghost" size="lg" icon="whatsapp" className="!border-[#faf7f1]/50 !text-[#faf7f1] hover:!bg-[#faf7f1]/10" onClick={() => track('whatsapp_click', { from: 'final' })}>
              Falar no WhatsApp
            </ExternalButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
