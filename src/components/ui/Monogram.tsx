/** Marca compacta: a folha do grafismo Relax dentro de um selo redondo. */
export function Monogram({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="23" fill="rgb(var(--brass))" />
      <path d="M13 24 A11 11 0 0 1 24 13 H35 V24 A11 11 0 0 1 24 35 H13 Z" fill="rgb(var(--ink))" />
    </svg>
  );
}

/** Logotipo tipográfico provisório (RELAX + BARBEARIA) até existir o vetor oficial. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-start leading-none ${className}`}>
      <span className="font-display text-[1.65rem] font-semibold tracking-[0.12em]">
        RELAX<sup className="ml-0.5 align-super text-[0.4em] font-sans font-medium">®</sup>
      </span>
      <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.42em] text-muted">Barbearia</span>
    </span>
  );
}
