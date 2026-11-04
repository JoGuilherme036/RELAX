import { asset } from '@/lib/asset';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

const items = [
  { file: '01_home_bem_vindo', alt: 'Boas-vindas à Barbearia Relax: poltrona preta diante do espelho' },
  { file: '02_servicos_barbearia', alt: 'Serviços: corte de cabelo, barba, sobrancelha, limpeza de pele e pacotes especiais' },
  { file: '03_agendamento_online', alt: 'Agende seu horário com praticidade e conforto' },
  { file: '04_produtos_profissionais', alt: 'Produtos profissionais Relax: shampoo para barba, pomada modeladora e óleo para barba' },
  { file: '05_promocoes_especiais', alt: 'Promoções especiais e cupons exclusivos' },
  { file: '06_barbeiro_em_acao', alt: 'Barbeiro de avental Relax finalizando um corte na tesoura' },
  { file: '07_antes_e_depois', alt: 'Transformação em cada detalhe: antes e depois de um corte com barba' },
  { file: '08_ambiente_interno', alt: 'Ambiente interno da barbearia com espelhos iluminados, plantas e cadeiras pretas' },
  { file: '09_vale_presente', alt: 'Vale-presente Relax Barbearia' },
  { file: '10_localizacao', alt: 'Venha nos visitar e viva a experiência Relax' },
];

/** Galeria de artes conceituais da marca. Os textos dentro das imagens são estáticos; o título e o contexto ficam em HTML. */
export function Gallery() {
  return (
    <section id="galeria" aria-labelledby="galeria-title" className="relative z-10 scroll-mt-20 py-24 md:py-32">
      <div className="container-x" id="galeria-title">
        <SectionHeading chapter="—" label="Galeria" lines={['Viva a', <em key="e" className="brass-text">experiência Relax.</em>]} intro="Serviços, ambiente, produtos e presentes: um panorama da casa." />
        <ul className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {items.map((it, i) => (
            <li key={it.file} className="w-[72%] shrink-0 snap-center sm:w-auto">
              <Reveal delay={(i % 5) * 0.05}>
                <figure className="night overflow-hidden rounded-2xl border hairline bg-ink shadow-[var(--shadow-card)]">
                  <img src={asset(`media/relax/${it.file}.webp`)} alt={it.alt} loading="lazy" decoding="async" width={1122} height={1584} className="aspect-[646/918] h-auto w-full object-cover" />
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[12px] text-muted">Artes conceituais ilustrativas: não são fotos do endereço, dos produtos nem de clientes reais.</p>
      </div>
    </section>
  );
}
