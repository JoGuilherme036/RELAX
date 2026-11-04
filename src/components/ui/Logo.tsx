import { asset } from '@/lib/asset';

/** Logotipo oficial Relax. Preto sobre o tema Dia, branco dentro de `.night` (troca por CSS, sem JS). */
export function Logo({ className = 'h-9' }: { className?: string }) {
  return (
    <span className={`inline-flex ${className}`} role="img" aria-label="Relax Barbearia">
      <img src={asset('brand/relax-logo-preto.png')} alt="" className="logo-day h-full w-auto" width={1112} height={382} />
      <img src={asset('brand/relax-logo-branco.png')} alt="" className="logo-night h-full w-auto" width={1112} height={394} />
    </span>
  );
}
