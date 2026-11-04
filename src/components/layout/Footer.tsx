import { Link } from 'react-router-dom';
import { fullAddress, site } from '@/config/site';
import { formatRanges } from '@/lib/hours';
import { weekdayNames } from '@/lib/time';
import { whatsappLink, waMessages } from '@/lib/whatsapp';
import { useMotionPref } from '@/hooks/useMotionPref';
import { Logo } from '../ui/Logo';
import { Icon, type IconName } from '../ui/Icon';

const linkCls = 'text-ivory/80 transition-colors hover:text-brass';

export function Footer() {
  const { reduced, setPref } = useMotionPref();
  const order = [1, 2, 3, 4, 5, 6, 0] as const;
  const contacts: { href: string; icon: IconName; label: string; text: string }[] = [
    { href: whatsappLink(waMessages.general()), icon: 'whatsapp', label: 'WhatsApp', text: site.contact.phone },
    { href: site.contact.instagram, icon: 'instagram', label: 'Instagram', text: site.contact.instagramHandle },
    { href: `mailto:${site.contact.email}`, icon: 'mail', label: 'E-mail', text: site.contact.email },
  ];
  return (
    <footer className="night relative z-10 bg-ink pb-28 pt-16 text-ivory md:pb-10 md:pt-20">
      <div className="container-x grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr]">
        <div>
          <Logo className="h-12" />
          <p className="mt-5 max-w-xs text-[15px] leading-6 text-muted">Mais que um corte, uma experiência. Desde 2019 em {site.address.city}.</p>
          <address className="mt-5 max-w-xs text-[14px] not-italic leading-6 text-ivory/80">{fullAddress}</address>
        </div>

        <div>
          <p className="eyebrow">Contato</p>
          <ul className="mt-5 space-y-3 text-[14px]">
            {contacts.map((c) => (
              <li key={c.label}>
                <a href={c.href} className={`inline-flex min-h-8 items-center gap-3 ${linkCls}`} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <Icon name={c.icon} className="h-[18px] w-[18px] text-brass" />
                  <span>
                    <span className="sr-only">{c.label}: </span>
                    {c.text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Horários</p>
          <dl className="mt-5 space-y-1.5 text-[14px]">
            {order.map((d) => (
              <div key={d} className="flex justify-between gap-4">
                <dt className="text-muted">{weekdayNames[d]}</dt>
                <dd className="tabular-nums">{formatRanges(site.hours[d])}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <p className="eyebrow">Atalhos</p>
          <ul className="mt-5 space-y-3 text-[14px]">
            <li><Link className={linkCls} to="/agendar">Agendar horário</Link></li>
            <li><Link className={linkCls} to="/meu-agendamento">Meu agendamento</Link></li>
            <li><Link className={linkCls} to="/privacidade">Privacidade</Link></li>
            <li><Link className={linkCls} to="/admin">Área da barbearia</Link></li>
            <li>
              <button className={`text-left ${linkCls}`} onClick={() => setPref(reduced ? 'full' : 'reduced')} aria-pressed={reduced}>
                {reduced ? 'Ativar animações' : 'Reduzir animações'}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-14">
        <div className="flex flex-col gap-2 border-t hairline pt-6 text-[12px] text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</p>
          {site.demo && <p>Versão de demonstração: contatos, preços e horários ilustrativos.</p>}
        </div>
      </div>
    </footer>
  );
}
