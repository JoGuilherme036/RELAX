import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '@/components/sections/Hero';
import { LiveBoard } from '@/components/sections/LiveBoard';
import { Manifesto } from '@/components/sections/Manifesto';
import { Services } from '@/components/sections/Services';
import { Ritual } from '@/components/sections/Ritual';
import { Team } from '@/components/sections/Team';
import { Styles } from '@/components/sections/Styles';
import { Space } from '@/components/sections/Space';
import { Gallery } from '@/components/sections/Gallery';
import { Club } from '@/components/sections/Club';
import { Reviews } from '@/components/sections/Reviews';
import { Location } from '@/components/sections/Location';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

// Seções em faixas alternadas (ink, ink-3, ink-2) para dar ritmo à leitura.
export default function Home() {
  useDocumentTitle();
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 60);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <main id="conteudo" className="relative">
      <Hero />
      <LiveBoard />
      <Manifesto />
      <Services />
      <Ritual />
      <Team />
      <Styles />
      <Space />
      <Club />
      <Gallery />
      <Location />
      <Reviews />
      <Faq />
      <FinalCta />
    </main>
  );
}
