import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/asset';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Icon } from '../ui/Icon';

const items = [
  { file: '01_home_bem_vindo', title: 'Boas-vindas', alt: 'Boas-vindas à Barbearia Relax: poltrona preta diante do espelho' },
  { file: '06_barbeiro_em_acao', title: 'Barbeiro em ação', alt: 'Barbeiro de avental Relax finalizando um corte na tesoura' },
  { file: '08_ambiente_interno', title: 'Nosso ambiente', alt: 'Ambiente interno da barbearia com espelhos iluminados, plantas e cadeiras pretas' },
  { file: '02_servicos_barbearia', title: 'Serviços', alt: 'Serviços: corte de cabelo, barba, sobrancelha, limpeza de pele e pacotes especiais' },
  { file: '07_antes_e_depois', title: 'Antes e depois', alt: 'Transformação em cada detalhe: antes e depois de um corte com barba' },
  { file: '04_produtos_profissionais', title: 'Produtos', alt: 'Produtos profissionais Relax: shampoo para barba, pomada modeladora e óleo para barba' },
  { file: '03_agendamento_online', title: 'Agendamento', alt: 'Agende seu horário com praticidade e conforto' },
  { file: '05_promocoes_especiais', title: 'Promoções', alt: 'Promoções especiais e cupons exclusivos' },
  { file: '09_vale_presente', title: 'Vale-presente', alt: 'Vale-presente Relax Barbearia' },
  { file: '10_localizacao', title: 'Localização', alt: 'Venha nos visitar e viva a experiência Relax' },
];

const src = (file: string) => asset(`media/relax/${file}.webp`);

/** Galeria de artes da marca: trilho com rolagem no celular, grade editorial no desktop, e visualização ampliada. */
export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const track = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section id="galeria" aria-labelledby="galeria-title" className="relative z-10 scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" id="galeria-title">
          <SectionHeading label="Galeria" lines={['Viva a', <em key="e" className="brass-text">experiência Relax.</em>]} intro="Serviços, ambiente, produtos e presentes. Toque em uma imagem para ampliar." />
          <div className="hidden gap-2 md:flex">
            <button onClick={() => scrollBy(-1)} className="grid h-12 w-12 place-items-center rounded-md border border-line-strong hover:bg-ivory/5" aria-label="Imagens anteriores">
              <Icon name="arrowLeft" />
            </button>
            <button onClick={() => scrollBy(1)} className="grid h-12 w-12 place-items-center rounded-md border border-line-strong hover:bg-ivory/5" aria-label="Próximas imagens">
              <Icon name="arrowRight" />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={track}
        aria-label="Imagens da galeria"
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:scroll-px-8 sm:px-8 md:gap-5 lg:scroll-px-[max(3rem,calc((100vw-1240px)/2+3rem))] lg:px-[max(3rem,calc((100vw-1240px)/2+3rem))]"
      >
        {items.map((it, i) => (
          <li key={it.file} className="w-[70%] shrink-0 snap-start sm:w-[42%] md:w-[30%] lg:w-[22%]">
            <Reveal delay={Math.min(i, 4) * 0.05}>
              <button onClick={() => setOpen(i)} className="group block w-full text-left" aria-label={`Ampliar: ${it.title}`}>
                <span className="night block overflow-hidden rounded-2xl border hairline bg-ink">
                  <img src={src(it.file)} alt={it.alt} loading="lazy" decoding="async" width={646} height={918} className="aspect-[646/918] h-auto w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.03]" />
                </span>
                <span className="mt-3 flex items-center justify-between text-[13px] font-semibold">
                  {it.title}
                  <span className="text-[12px] font-medium tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</span>
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="container-x">
        <p className="mt-6 text-[12px] text-muted">Artes conceituais ilustrativas: não são fotos do endereço, dos produtos nem de clientes reais.</p>
      </div>

      <Lightbox index={open} onClose={() => setOpen(null)} onMove={setOpen} />
    </section>
  );
}

function Lightbox({ index, onClose, onMove }: { index: number | null; onClose: () => void; onMove: (i: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const move = useCallback(
    (d: number) => {
      if (index === null) return;
      onMove((index + d + items.length) % items.length);
    },
    [index, onMove],
  );

  useEffect(() => {
    if (index === null) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      prev?.focus();
    };
  }, [index, onClose, move]);

  const it = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {it && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={it.title}
          className="night fixed inset-0 z-[80] flex flex-col bg-ink/95 text-ivory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <div className="container-x flex h-16 shrink-0 items-center justify-between pt-[env(safe-area-inset-top)]" onClick={(e) => e.stopPropagation()}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em]">
              {it.title} <span className="ml-2 text-muted">{String(index! + 1).padStart(2, '0')} / {items.length}</span>
            </p>
            <button ref={closeRef} onClick={onClose} className="grid h-12 w-12 place-items-center rounded-md border hairline" aria-label="Fechar">
              <Icon name="close" />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6">
            <motion.img
              key={it.file}
              src={src(it.file)}
              alt={it.alt}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="max-h-full max-w-full rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={(e) => { e.stopPropagation(); move(-1); }} className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-md border hairline bg-ink/70 md:left-8" aria-label="Imagem anterior">
              <Icon name="arrowLeft" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); move(1); }} className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-md border hairline bg-ink/70 md:right-8" aria-label="Próxima imagem">
              <Icon name="arrowRight" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
