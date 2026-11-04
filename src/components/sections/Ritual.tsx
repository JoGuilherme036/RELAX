import { useRef, useState } from 'react';
import { ritualSteps } from '@/config/content';
import { SectionHeading } from '../ui/SectionHeading';
import { SmartImage } from '../ui/SmartImage';

function StepCard({ step, className = '' }: { step: (typeof ritualSteps)[number]; className?: string }) {
  return (
    <article className={`night group relative overflow-hidden rounded-2xl border hairline bg-ink-2 ${className}`}>
      <SmartImage id={step.image} alt={step.title} sizes="(min-width: 768px) 40vw, 85vw" ratio="4 / 5" focal="50% 40%" imgClassName="transition-transform duration-[1.2s] ease-expo group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <span className="display brass-text text-6xl italic md:text-7xl">{step.n}</span>
        <h3 className="mt-2 font-display text-3xl">{step.title}</h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-ivory/75">{step.text}</p>
      </div>
    </article>
  );
}

/** Quatro etapas: grade no desktop, carrossel com snap no celular. */
export function Ritual() {
  return <SnapRitual />;
}

function SnapRitual() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (card) setActive(Math.round(el.scrollLeft / (card.offsetWidth + 16)));
  };
  return (
    <section id="ritual" aria-labelledby="ritual-title" className="relative z-10 scroll-mt-20 bg-ink py-20 md:py-28">
      <div className="container-x" id="ritual-title">
        <SectionHeading chapter="IV" label="O ritual" lines={['Quatro tempos,', <em key="e" className="brass-text">nenhuma pressa.</em>]} />
      </div>
      <div ref={track} onScroll={onScroll} className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 md:container-x md:grid md:snap-none md:grid-cols-4 md:overflow-visible md:px-0" aria-label="Etapas do ritual" tabIndex={0}>
        {ritualSteps.map((s) => (
          <StepCard key={s.n} step={s} className="w-[82%] max-w-sm shrink-0 snap-center md:w-auto md:max-w-none" />
        ))}
      </div>
      <div className="container-x mt-6 flex items-center gap-2 md:hidden" aria-hidden="true">
        {ritualSteps.map((s, i) => (
          <span key={s.n} className={`h-[3px] rounded-full transition-all duration-500 ${i === active ? 'w-10 bg-brass' : 'w-4 bg-ivory/20'}`} />
        ))}
        <span className="ml-auto text-[12px] tabular-nums text-muted">
          {String(active + 1).padStart(2, '0')} / {String(ritualSteps.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
