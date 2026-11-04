/** Static medallion for no-WebGL, data saver and loading states. Same composition as the 3D scene. */
export function MedallionFallback() {
  return (
    <svg viewBox="0 0 400 400" className="relative h-full w-full" role="img" aria-label="Medalha do Clube Relax">
      <defs>
        <radialGradient id="mf-face" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#c4d9c8" />
          <stop offset="0.5" stopColor="#7f9a87" />
          <stop offset="1" stopColor="#2e4a3a" />
        </radialGradient>
        <linearGradient id="mf-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dbe8dd" />
          <stop offset="0.5" stopColor="#4b6a58" />
          <stop offset="1" stopColor="#a9c4af" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="url(#mf-rim)" />
      <circle cx="200" cy="200" r="138" fill="url(#mf-face)" />
      <circle cx="200" cy="200" r="118" fill="none" stroke="#faf7f1" strokeOpacity="0.5" strokeWidth="1.5" />
      <text x="200" y="224" textAnchor="middle" fontFamily="'Cormorant Garamond Variable', Georgia, serif" fontStyle="italic" fontWeight="500" fontSize="84" fill="#faf7f1" fillOpacity="0.92">
        Relax
      </text>
      <text x="200" y="278" textAnchor="middle" fontFamily="'Hanken Grotesk Variable', sans-serif" fontWeight="600" fontSize="11" letterSpacing="6" fill="#faf7f1" fillOpacity="0.85">
        CLUBE · BARBEARIA
      </text>
    </svg>
  );
}
