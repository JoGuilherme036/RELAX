// Single source of truth for business data.
// Every value marked DEMO must be replaced with the real information before going live.

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
export type TimeRange = { start: string; end: string }; // "HH:mm", local time of the shop

export const site = {
  demo: true, // DEMO: set to false once all real data below is filled in
  name: 'Relax Barbearia',
  shortName: 'Relax',
  concept: 'Barbearia com calma e precisão',
  url: 'https://relax-barbearia.example', // DEMO: production domain, no trailing slash

  seo: {
    title: 'Relax Barbearia — Corte com calma em Teresina',
    description:
      'Mais que um corte, uma experiência. Corte, barba e atendimento infantil com hora marcada, café na chegada e Sala VIP. Desde 2019 em Teresina.',
  },

  contact: {
    whatsapp: '5511999999999', // DEMO: country + area code + number, digits only
    phone: '+55 11 99999-9999', // DEMO: display format
    phoneHref: '+5511999999999', // DEMO
    email: 'contato@relax-barbearia.example', // DEMO
    instagram: 'https://instagram.com/relaxbarbearia', // DEMO
    instagramHandle: '@relaxbarbearia', // DEMO
  },

  address: {
    street: 'Av. Raul Lopes, Poty Premier 880',
    district: 'Teresina', // DEMO: confirmar o bairro
    city: 'Teresina',
    state: 'PI',
    zip: '01000-000', // DEMO
    lat: -23.55052, // DEMO
    lng: -46.633308, // DEMO
    reference: 'Poty Premier, Av. Raul Lopes. Procure a fachada com o logotipo Relax.', // DEMO
    parking: 'Estacionamento conveniado a 50 m.', // DEMO
  },

  // Brazil has no DST since 2019; adjust if the shop is in a different offset.
  timeZone: 'America/Fortaleza',
  utcOffset: '-03:00',

  hours: {
    0: [],
    1: [{ start: '13:00', end: '20:00' }],
    2: [{ start: '09:00', end: '20:00' }],
    3: [{ start: '09:00', end: '20:00' }],
    4: [{ start: '09:00', end: '21:00' }],
    5: [{ start: '09:00', end: '21:00' }],
    6: [{ start: '09:00', end: '18:00' }],
  } as Record<Weekday, TimeRange[]>, // DEMO

  // Dates the shop is closed (YYYY-MM-DD).
  closedDates: ['2026-12-25', '2027-01-01'] as string[], // DEMO

  booking: {
    slotStepMin: 15,
    bufferMin: 10, // preparation time between clients
    minLeadMin: 60, // earliest booking from now
    maxDaysAhead: 30,
    cancelUntilHours: 2,
    policy:
      'Tolerância de 10 minutos de atraso. Cancelamentos e remarcações gratuitos até 2 horas antes do horário.', // DEMO
  },

  social: {
    reviews: [] as { author: string; text: string; rating: number; source: string }[], // only real, authorized reviews
  },
} as const;

export const fullAddress = `${site.address.street} — ${site.address.city}/${site.address.state}`;
