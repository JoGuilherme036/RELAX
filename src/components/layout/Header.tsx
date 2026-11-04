import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { site } from '@/config/site';
import { useMotionPref } from '@/hooks/useMotionPref';
import { useOpenStatus, useScrolledPast } from '@/hooks/useMisc';
import { useEffect, useState as useS } from 'react';
import { statusLabel } from '@/lib/hours';
import { track } from '@/lib/analytics';
import { Icon } from '../ui/Icon';
import { Logo } from '../ui/Logo';
import { LinkButton } from '../ui/Button';
import { Menu } from './Menu';
import { navLinks, scrollToSection } from './nav';

export function Header() {
  const scrolled = useScrolledPast(24);
  const [vh, setVh] = useS(800);
  useEffect(() => {
    const on = () => setVh(window.innerHeight);
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  const pastIntro = useScrolledPast(vh * 1.9);
  const [open, setOpen] = useState(false);
  const { reduced } = useMotionPref();
  const status = statusLabel(useOpenStatus());
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const go = (id: string) => {
    setOpen(false);
    if (pathname !== '/' || !scrollToSection(id, reduced)) navigate(`/#${id}`);
  };

  // Na abertura da home o cabeçalho flutua sobre o filme (tema Noite); depois assenta no tema Dia.
  const night = pathname === '/' && !pastIntro;
  return (
    <>
      <header
        className={`${night ? 'night text-ivory' : ''} fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-[background-color,border-color] duration-300 ${
          scrolled ? 'border-b hairline bg-ink/95' : 'border-b border-transparent'
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
          <Link to="/" className="flex items-center gap-3" aria-label={`${site.name}, página inicial`}>
            <Logo className="h-9 md:h-10" />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} className="rounded-md px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ivory/80 transition-colors hover:text-brass">
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 text-[12px] text-muted md:flex">
              <span className={`h-1.5 w-1.5 rounded-full ${status.short === 'Aberto agora' ? 'bg-brass' : 'bg-muted'}`} />
              {status.short}
            </span>
            <LinkButton to="/agendar" className="hidden !min-h-11 md:inline-flex" onClick={() => track('cta_book_click', { from: 'header' })}>
              Agendar
            </LinkButton>
            <button
              onClick={() => setOpen(true)}
              className="grid h-12 w-12 place-items-center rounded-md border border-line-strong bg-transparent text-ivory transition-colors hover:bg-ivory/5 lg:hidden"
              aria-label="Abrir menu"
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <Menu open={open} onClose={() => setOpen(false)} onNavigate={go} />
    </>
  );
}
