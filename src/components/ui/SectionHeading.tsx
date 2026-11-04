import type { ReactNode } from 'react';
import { MaskLines, Reveal } from './Reveal';

/** Chapter heading. A folha do grafismo Relax marca o início de cada seção. `chapter` fica só para compatibilidade. */
export function SectionHeading({ label, lines, intro, align = 'left', id }: { chapter?: string; label: string; lines: ReactNode[]; intro?: string; align?: 'left' | 'center'; id?: string }) {
  return (
    <header className={`relative ${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      <Reveal>
        <p className={`eyebrow relative flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span aria-hidden="true" className="leaf text-moss" />
          {label}
        </p>
      </Reveal>
      <MaskLines lines={lines} className="display relative mt-5 text-[clamp(2.4rem,8vw,4.5rem)]" />
      {intro && (
        <Reveal delay={0.1}>
          <p id={id} className="relative mt-5 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[18px] sm:leading-7">
            {intro}
          </p>
        </Reveal>
      )}
    </header>
  );
}
