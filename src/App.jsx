import { useEffect, useState } from 'react';

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScp9iJAd6Vjsb68cfbwdhiKL74d4-V-_IEtKPHJeaBlZFUWAQ/viewform?usp=header';

const plans = [
  {
    name: 'Start',
    price: '499 kr / mnd',
    description: 'For små kirker med noen få arrangementer i måneden.',
    features: ['Opptil 4 innlegg per måned', 'Levering innen 24 timer', 'Facebook + Instagram + kort versjon'],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    name: 'Standard',
    price: '990 kr / mnd',
    description: 'For kirker som ønsker jevn og trygg kommunikasjon hver uke.',
    features: ['Opptil 12 innlegg per måned', 'Prioritert levering', 'Tilpasset tone for menigheten', 'Facebook + Instagram + kort versjon'],
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    name: 'Pluss',
    price: '1790 kr / mnd',
    description: 'For aktive kirker med mange samlinger, kampanjer og arrangementer.',
    features: ['Ubegrensede forespørsler innen rimelig bruk', 'Ekstra variasjoner ved behov', 'Raskere levering når mulig', 'Prioritert støtte'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
];

const steps = [
  ['01', 'Send detaljene', 'Send tittel, dato, sted og noen linjer om arrangementet via skjema.', '↗'],
  ['02', 'Vi skriver innholdet', 'Vi gjør informasjonen om til varme, tydelige og klare innlegg tilpasset kirkelig kommunikasjon.', '✦'],
  ['03', 'Kopier og publiser', 'Du får ferdige versjoner for Facebook, Instagram og en kort versjon som kan brukes med én gang.', '✓'],
];

const benefits = [
  ['↯', 'Spar tid hver uke'],
  ['✓', 'Få jevnere kommunikasjon'],
  ['✦', 'Slipp stress rundt formuleringer'],
  ['“”', 'Tydelige og varme innlegg'],
  ['NO', 'Norsk først, engelsk ved behov'],
  ['24', 'Klar levering innen 24 timer'],
];

const faqs = [
  ['Må vi binde oss?', 'Nei. Dere kan sende inn ett arrangement og få et gratis eksempel først. Dere starter abonnement bare hvis dere ønsker å fortsette.'],
  ['Hvor raskt får vi innlegget?', 'Normalt leveres ferdige tekster innen 24 timer. Dere får tekst som kan kopieres direkte til Facebook, Instagram og annen kommunikasjon.'],
  ['Kan dere skrive på engelsk også?', 'Ja. Tjenesten er norsk først, men vi kan også lage engelske versjoner ved behov.'],
  ['Hvordan betaler vi?', 'I starten håndteres betaling enkelt via Vipps, faktura eller bankoverføring. Dette avtales etter at dere ønsker å starte fast.'],
];

function IconCircle({ children, dark = false }) {
  return (
    <span
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-xs font-semibold shadow-sm md:h-11 md:w-11 md:text-sm ${
        dark ? 'border-amber-200/20 bg-amber-50/10 text-amber-100' : 'border-amber-200/70 bg-gradient-to-br from-amber-50 to-white text-amber-700'
      }`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('kirkeinnhold-selected-plan');
    if (saved) setSelectedPlan(saved);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY || 0);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openFormUrl = selectedPlan ? `${FORM_URL}&entry_selected_plan=${encodeURIComponent(selectedPlan)}` : FORM_URL;

  const choosePlan = (planName) => {
    setSelectedPlan(planName);
    localStorage.setItem('kirkeinnhold-selected-plan', planName);
    setMenuOpen(false);
    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#fffdf8] via-amber-50/30 to-white text-slate-900 antialiased">
      <style>{`
        html { scroll-behavior: smooth; scroll-padding-top: 92px; }
        body { font-feature-settings: 'kern'; text-rendering: optimizeLegibility; }
        p, li { font-size: clamp(1.02rem, 0.96rem + 0.25vw, 1.16rem); line-height: 1.75; letter-spacing: -0.005em; }
        a, button { -webkit-tap-highlight-color: transparent; }
        .small-copy { font-size: clamp(0.98rem, 0.94rem + 0.16vw, 1.06rem); line-height: 1.7; }
        .micro-copy { font-size: 0.95rem; line-height: 1.65; }
        .section-reveal { animation: fadeUp .75s ease both; }
        .premium-card { transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease; }
        .premium-card:hover { transform: translateY(-4px); box-shadow: 0 18px 50px rgba(15,23,42,.10); }
        .primary-cta { box-shadow: 0 14px 34px rgba(180,83,9,.24); }
        .primary-cta:hover { box-shadow: 0 18px 42px rgba(180,83,9,.30); }
        .hero-pulse { animation: softPulse 3.8s ease-in-out infinite; }
        @keyframes softPulse { 0%,100% { box-shadow: 0 14px 34px rgba(180,83,9,.22); } 50% { box-shadow: 0 18px 46px rgba(180,83,9,.34); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-amber-100/60 bg-[#fffdf8]/95 shadow-[0_6px_20px_rgba(15,23,42,0.06)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-6 md:py-4">
          <a href="#" onClick={closeMenu} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-base font-semibold text-amber-700 shadow-sm md:h-11 md:w-11 md:text-lg">K</div>
            <div>
              <div className="bg-gradient-to-r from-slate-950 via-slate-800 to-amber-800 bg-clip-text text-lg font-semibold tracking-tight text-transparent md:text-xl">Kirkeinnhold</div>
              <div className="hidden micro-copy text-slate-500 sm:block">Ferdige innlegg for sosiale medier</div>
            </div>
          </a>
          <nav className="hidden items-center gap-6 micro-copy text-slate-600 md:flex">
            <a href="#how-it-works" className="transition hover:text-amber-700">Slik fungerer det</a>
            <a href="#benefits" className="transition hover:text-amber-700">Hva dere får</a>
            <a href="#pricing" className="transition hover:text-amber-700">Priser</a>
            <a href="#faq" className="transition hover:text-amber-700">Spørsmål</a>
            <a href="#contact" className="transition hover:text-amber-700">Kontakt</a>
          </nav>
          <a href="#contact" className="primary-cta hidden rounded-2xl bg-amber-700 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-amber-800 md:block">Få gratis prøve</a>
          <button onClick={() => setMenuOpen((open) => !open)} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-100 bg-white/85 text-slate-950 shadow-sm md:hidden" aria-label="Åpne meny" aria-expanded={menuOpen}>
            <span className="relative h-4 w-5"><span className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-slate-950 transition ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} /><span className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-slate-950 transition ${menuOpen ? 'opacity-0' : 'opacity-100'}`} /><span className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-slate-950 transition ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} /></span>
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-amber-100 bg-[#fffdf8]/98 px-5 pb-5 pt-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl md:hidden">
            <nav className="mx-auto grid max-w-6xl gap-2 text-base font-medium text-slate-800">
              {[
                ['#how-it-works', 'Slik fungerer det'],
                ['#benefits', 'Hva dere får'],
                ['#pricing', 'Priser'],
                ['#faq', 'Spørsmål'],
                ['#contact', 'Kontakt'],
              ].map(([href, label]) => <a key={href} onClick={closeMenu} href={href} className="rounded-2xl px-4 py-3 transition hover:bg-amber-50">{label}</a>)}
              <a onClick={closeMenu} href="#contact" className="mt-2 flex items-center justify-center rounded-2xl bg-amber-700 px-5 py-4 text-center text-base font-medium text-white shadow-[0_10px_28px_rgba(15,23,42,.14)]">Få gratis prøve</a>
            </nav>
          </div>
        )}
      </header>

      <main className="pt-[72px] pb-24 md:pb-0">
        <section className="relative mx-auto max-w-6xl overflow-hidden px-5 pb-12 pt-10 md:px-6 md:pb-22 md:pt-20">
          <div className="pointer-events-none absolute inset-x-[-12rem] top-0 h-[34rem] opacity-[0.06]">
            <img src="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1800&auto=format&fit=crop" alt="Kirkerom med varmt lys" loading="eager" className="h-full w-full object-cover blur-[2px] brightness-95 saturate-75" style={{ transform: `translate3d(0, ${scrollY * 0.035}px, 0) scale(1.04)` }} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#fffdf8]/40 via-[#fffdf8]/80 to-[#fffdf8]" />
          </div>
          <div className="relative grid items-center gap-10 md:grid-cols-[1.08fr_0.92fr] md:gap-12">
            <div className="section-reveal">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-amber-200/80 bg-white/85 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 text-xs font-semibold text-amber-700">✦</span>Sosiale medier for kirker i Norge</div>
              <h1 className="max-w-3xl text-[2.45rem] font-semibold leading-[1.06] tracking-tight text-slate-950 md:text-6xl">Du sender detaljene — vi skriver innleggene.</h1>
              <p className="mt-5 max-w-2xl text-[1.08rem] leading-8 text-slate-600 md:mt-6 md:text-xl md:leading-8">En enkel abonnementstjeneste for kirker som vil kommunisere tydelig på nett. Send informasjon om gudstjenester, arrangementer og annonseringer, og få ferdige innlegg for Facebook og Instagram innen 24 timer.</p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 md:text-lg md:leading-8">Mindre tid brukt på formuleringer. Mer tid til mennesker, fellesskap og det som skjer i menigheten.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row md:mt-8 md:gap-4"><a href={openFormUrl} target="_blank" rel="noreferrer" className="primary-cta hero-pulse inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-700 px-6 py-4 text-center text-base font-medium text-white transition hover:-translate-y-0.5 hover:bg-amber-800">Få et gratis eksempel <span aria-hidden="true">→</span></a><a href="#pricing" className="rounded-2xl border border-slate-200 bg-white/85 px-6 py-4 text-center text-base font-medium text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-amber-50">Se priser</a></div>
              <div className="mt-4 micro-copy text-slate-500 md:mt-5">Tar ca. 1 minutt. Ingen forpliktelser.</div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3 md:mt-8 md:gap-4">{[['24 timer', 'Normal levering'], ['Norsk først', 'Engelsk ved behov'], ['Klar til publisering', 'Ingen ekstra skriving']].map(([title, text]) => <div key={title} className="premium-card rounded-2xl border border-amber-100 bg-white/85 p-4 shadow-sm backdrop-blur"><div className="text-base font-semibold text-slate-950">{title}</div><div className="mt-1 small-copy text-slate-600">{text}</div></div>)}</div>
            </div>
            <div className="relative section-reveal delay-1">
              <div className="relative rounded-[1.6rem] border border-white/70 bg-white/88 p-4 shadow-[0_30px_90px_rgba(15,23,42,.12)] backdrop-blur-xl md:rounded-[2rem] md:p-6">
                <div className="mb-4 flex items-center justify-between gap-4"><div><div className="text-sm font-semibold text-slate-900">Eksempel på leveranse</div><div className="micro-copy text-slate-500">Fra enkel info til publiseringsklart innlegg</div></div><div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">Før → Etter</div></div>
                <div className="grid gap-4"><div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5"><div className="text-sm font-medium text-slate-500">Det dere sender</div><div className="mt-4 space-y-2 small-copy text-slate-700"><p><span className="font-semibold">Type:</span> Gudstjeneste</p><p><span className="font-semibold">Dato:</span> Søndag 12. mai kl. 11:00</p><p><span className="font-semibold">Tema:</span> Håp i krevende tider</p><p><span className="font-semibold">Detaljer:</span> Lovsang, bønn og tale ved Pastor Anna</p></div></div><div className="rounded-2xl bg-slate-950 p-5 text-white shadow-inner"><div className="text-sm font-medium text-amber-100/80">Det dere får tilbake</div><div className="mt-4 space-y-4 small-copy text-slate-100"><p>Velkommen til gudstjeneste denne søndagen.</p><p>Bli med på en varm samling med lovsang, bønn og en oppmuntrende tale om håp i krevende tider ved Pastor Anna.</p><p>Alle er hjertelig velkommen.</p></div></div><div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4 small-copy text-slate-700 shadow-sm">Enklere kommunikasjon for menigheten — uten at noen må bruke tid på å finne ordene i siste liten.</div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-reveal mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-20">
          <div className="mb-10 grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-end"><div><div className="text-sm font-semibold uppercase tracking-[.25em] text-amber-700">I praksis</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">Fra enkel informasjon til ferdig innhold.</h2></div><p className="max-w-2xl text-lg leading-7 text-slate-500 md:text-2xl md:leading-9">Tjenesten skal være lett å forstå med én gang: dere sender detaljene, vi gjør det klart til publisering.</p></div>
          <div className="relative overflow-hidden rounded-[2rem] border border-amber-100 bg-white/85 p-5 shadow-[0_24px_80px_rgba(15,23,42,.08)] backdrop-blur-lg md:p-8"><div className="relative grid gap-6 lg:grid-cols-[.85fr_1.15fr] lg:items-stretch"><div className="grid gap-6"><div className="premium-card rounded-[1.5rem] border border-amber-100 bg-white p-5 shadow-sm md:p-6"><div className="flex items-center justify-between gap-4"><div><div className="text-sm font-semibold uppercase tracking-[.22em] text-amber-700">Det dere sender</div><h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">En enkel beskjed</h3></div><IconCircle>01</IconCircle></div><div className="mt-6 space-y-3 small-copy text-slate-700"><div className="rounded-2xl bg-slate-50 p-4"><span className="font-semibold text-slate-950">Tittel:</span> Søndagsgudstjeneste</div><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-4"><span className="font-semibold text-slate-950">Tid:</span> Søndag kl. 11:00</div><div className="rounded-2xl bg-slate-50 p-4"><span className="font-semibold text-slate-950">Sted:</span> Kirken deres</div></div><div className="rounded-2xl bg-amber-50/70 p-4"><span className="font-semibold text-slate-950">Tema:</span> Håp i krevende tider</div><div className="rounded-2xl bg-slate-50 p-4"><span className="font-semibold text-slate-950">Detaljer:</span> Lovsang, bønn og tale ved Pastor Anna</div></div></div><div className="rounded-[1.5rem] border border-amber-100 bg-amber-50/60 p-5 md:p-6"><div className="flex items-start gap-4"><IconCircle>✦</IconCircle><div><h3 className="text-xl font-semibold tracking-tight text-slate-950">Vi gjør teksten klar</h3><p className="mt-2 small-copy text-slate-600">Vi skriver naturlig, varmt og tydelig — uten at det høres generisk eller robotaktig ut.</p></div></div></div></div><div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,.18)] md:p-7"><div className="flex items-center justify-between gap-4"><div><div className="text-sm font-semibold uppercase tracking-[.22em] text-amber-100/70">Ferdig output</div><h3 className="mt-2 text-2xl font-semibold tracking-tight">Klart til publisering</h3></div><div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-amber-50">Facebook / Instagram</div></div><div className="mt-6 rounded-[1.5rem] bg-white p-5 text-slate-900 shadow-2xl md:p-6"><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-sm font-semibold text-amber-700">K</div><div><div className="font-semibold text-slate-950">Kirken deres</div><div className="text-xs text-slate-400">Publisert nå</div></div></div><div className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">Forhåndsvisning</div></div><div className="mt-5 rounded-2xl bg-amber-50/70 p-5"><p className="text-base font-semibold leading-7 text-slate-950">Velkommen til gudstjeneste denne søndagen.</p><p className="mt-3 small-copy text-slate-700">Bli med på en varm samling med lovsang, bønn og en oppmuntrende tale om håp i krevende tider ved Pastor Anna.</p><p className="mt-3 small-copy text-slate-700">Alle er hjertelig velkommen.</p><div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-amber-800"><span className="rounded-full bg-white/75 px-3 py-1">#gudstjeneste</span><span className="rounded-full bg-white/75 px-3 py-1">#fellesskap</span><span className="rounded-full bg-white/75 px-3 py-1">#velkommen</span></div></div><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400"><div className="flex gap-4"><span>❤️ 24</span><span>💬 3</span><span>↗ Del</span></div><span>Klar til kopiering</span></div><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-slate-50 px-3 py-2 text-center text-xs font-medium text-slate-600">Facebook</div><div className="rounded-xl bg-slate-50 px-3 py-2 text-center text-xs font-medium text-slate-600">Instagram</div><div className="rounded-xl bg-slate-50 px-3 py-2 text-center text-xs font-medium text-slate-600">Kort versjon</div></div></div><div className="mt-5 grid gap-3 sm:grid-cols-3">{['Send', 'Skriv', 'Publiser'].map((item, index) => <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center"><div className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-xs font-semibold text-amber-700">{index + 1}</div><div className="mt-2 text-sm font-medium text-slate-100">{item}</div></div>)}</div></div></div></div>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] border border-amber-100 bg-white/80 px-5 py-5 shadow-sm backdrop-blur md:flex-row md:items-center md:px-6"><div><div className="font-semibold text-slate-950">Vil dere se hvordan dette kan se ut for deres kirke?</div><div className="micro-copy mt-1 text-slate-500">Send ett arrangement og få et gratis eksempel tilbake.</div></div><a href={openFormUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-2xl bg-amber-700 px-5 py-3 text-sm font-medium text-white shadow-[0_10px_28px_rgba(15,23,42,.14)] transition hover:-translate-y-0.5 hover:bg-amber-800">Få gratis eksempel →</a></div>
        </section>

        <section className="section-reveal relative isolate overflow-hidden border-y border-amber-100 bg-white/75 backdrop-blur"><div className="pointer-events-none absolute inset-0 z-0 opacity-[.025]"><img src="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1800&auto=format&fit=crop" alt="Kirkerom og fellesskap" loading="lazy" className="h-full w-full object-cover blur-3xl brightness-95 saturate-75" style={{ transform: `translate3d(0, ${scrollY * -0.025}px, 0) scale(1.08)` }} /></div><div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/95 via-white/88 to-[#fffdf8]/95" /><div className="relative z-10 mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-24"><div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-end md:gap-14"><div><div className="text-sm font-semibold uppercase tracking-[.25em] text-amber-700">Utfordringen</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:mt-5 md:text-5xl">Viktig å poste. Lett å utsette.</h2></div><p className="max-w-2xl text-lg leading-7 text-slate-500 md:text-2xl md:leading-9">Sosiale medier betyr noe — men blir ofte nedprioritert i en travel uke.</p></div><div className="mt-10 grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-stretch"><div className="relative min-h-[440px] overflow-hidden rounded-[2rem] border border-amber-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,.10)]"><img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop" alt="Mennesker samlet i fellesskap" loading="lazy" className="h-full min-h-[440px] w-full object-cover brightness-[.9] saturate-[.82]" style={{ transform: `translate3d(0, ${scrollY * -0.018}px, 0) scale(1.04)` }} /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/18 to-white/5" /><div className="absolute bottom-7 left-6 right-6 text-white md:left-8 md:right-8"><p className="max-w-md text-2xl font-semibold leading-snug tracking-[-.02em] md:text-3xl">Folk kommer lettere når de faktisk får vite hva som skjer.</p><p className="mt-4 max-w-md text-base leading-7 text-white/78">God kommunikasjon hjelper flere å føle seg invitert — før arrangementet skjer.</p></div></div><div className="grid gap-4">{[{ image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=500&auto=format&fit=crop', title: 'Gudstjenester må deles', text: 'Hvis informasjonen ikke deles tydelig, vet mange ikke at de kan komme.' }, { image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=500&auto=format&fit=crop', title: 'Arrangementer trenger synlighet', text: 'Små og store samlinger trenger en enkel måte å nå ut på.' }, { image: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=500&auto=format&fit=crop', title: 'Budskap må føles varmt', text: 'Teksten bør være klar, inviterende og enkel å publisere.' }].map((item) => <div key={item.title} className="premium-card flex gap-4 rounded-[1.35rem] border border-amber-100 bg-white/88 p-3 shadow-sm backdrop-blur md:p-4"><img src={item.image} alt={item.title} loading="lazy" className="h-20 w-20 shrink-0 rounded-2xl object-cover brightness-95 saturate-75 md:h-24 md:w-24" /><div className="py-1"><h3 className="text-lg font-semibold tracking-tight text-slate-950">{item.title}</h3><p className="mt-1 small-copy text-slate-600">{item.text}</p></div></div>)}<div className="grid gap-4 md:grid-cols-[1fr_.9fr]"><div className="rounded-[1.35rem] bg-amber-50/80 p-5 text-slate-700 shadow-inner"><p className="text-base leading-7 md:text-lg">Men selve skrivingen blir ofte utsatt — ikke fordi det er uviktig, men fordi det alltid finnes noe annet som haster mer.</p></div><div className="rounded-[1.35rem] border border-amber-100 bg-white/75 px-5 py-4 italic text-slate-500 shadow-sm backdrop-blur">“Vi vet at vi burde poste — men det blir lett skjøvet til senere.”</div></div><div className="rounded-[1.35rem] border border-amber-100 bg-white/80 p-5 shadow-sm backdrop-blur"><div className="text-sm font-semibold uppercase tracking-[.22em] text-amber-700">Hvorfor det betyr noe</div><p className="mt-3 text-lg leading-8 text-slate-700">Når kommunikasjonen er tydelig, blir det enklere for mennesker å møte opp, delta og kjenne seg invitert.</p></div></div></div></div></section>

        <section id="how-it-works" className="section-reveal mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-20"><div className="grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-end md:gap-10"><div><div className="text-sm font-semibold uppercase tracking-[.25em] text-amber-700">Slik fungerer det</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:mt-5 md:text-5xl">En enkel tjeneste som sparer tid hver uke.</h2></div><p className="max-w-2xl text-lg leading-7 text-slate-500 md:text-2xl md:leading-9">Ingen komplisert plattform. Bare en tydelig og praktisk arbeidsflyt.</p></div><div className="relative mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6"><div className="pointer-events-none absolute left-[16%] right-[16%] top-[4.2rem] hidden h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent md:block" />{steps.map(([number, title, text, symbol]) => <div key={number} className="premium-card group overflow-hidden rounded-[1.5rem] border border-amber-100 bg-white/80 shadow-sm backdrop-blur-lg md:rounded-[1.75rem]"><div className="relative h-28 overflow-hidden"><img src={{ '01': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop', '02': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop', '03': 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop' }[number]} alt="Arbeidsflyt" loading="lazy" className="h-full w-full object-cover brightness-95 saturate-75 transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-white/10" /></div><div className="p-5 md:p-6"><div className="flex items-center justify-between"><div className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">{number}</div><IconCircle>{symbol}</IconCircle></div><h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">{title}</h3><p className="mt-3 text-base leading-7 text-slate-600">{text}</p></div></div>)}</div></section>

        <section id="benefits" className="section-reveal border-y border-amber-100 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/20"><div className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-20"><div className="grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-end"><div><div className="text-sm font-semibold uppercase tracking-[.25em] text-amber-700">Hva dere får</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:mt-5 md:text-5xl">Klar kommunikasjon uten ekstra arbeid.</h2></div><p className="max-w-2xl text-lg leading-7 text-slate-500 md:text-2xl md:leading-9">Alt er laget for å være lett å bruke, lett å forstå og lett å publisere.</p></div><div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 lg:grid-cols-3">{benefits.map(([symbol, text]) => <div key={text} className="premium-card flex items-start gap-4 rounded-2xl border border-amber-100 bg-white/80 px-5 py-5 text-base text-slate-700 shadow-sm backdrop-blur-lg"><IconCircle>{symbol}</IconCircle><div className="pt-2 font-medium">{text}</div></div>)}</div><div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] border border-amber-100 bg-white/85 px-5 py-5 shadow-sm backdrop-blur md:flex-row md:items-center md:px-6"><div><div className="font-semibold text-slate-950">Første eksempel er gratis.</div><div className="micro-copy mt-1 text-slate-500">En trygg måte å teste tjenesten uten forpliktelser.</div></div><a href="#contact" className="inline-flex items-center justify-center rounded-2xl border border-amber-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-50">Start nederst på siden →</a></div></div></section>

        <section className="section-reveal mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-16"><div className="grid gap-4 md:grid-cols-3">{['Ingen binding', 'Gratis første eksempel', 'Svar innen 24 timer'].map((item) => <div key={item} className="premium-card rounded-2xl border border-amber-100 bg-white/85 px-5 py-5 text-center font-medium text-slate-800 shadow-sm backdrop-blur">{item}</div>)}</div><div className="mt-6 rounded-[1.6rem] border border-amber-100 bg-slate-950 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,.14)] md:p-8"><div className="grid gap-6 md:grid-cols-[.9fr_1.1fr] md:items-center"><div><div className="text-sm font-semibold uppercase tracking-[.25em] text-amber-100/70">Tillitsfullt og enkelt</div><h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Bygget for kirker i Norge.</h2></div><div className="grid gap-3 sm:grid-cols-3">{['Norsk først', 'Manuell kvalitetssjekk', 'Ingen binding'].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-center text-sm font-medium text-slate-100">{item}</div>)}</div></div></div></section>

        <section id="pricing" className="section-reveal relative isolate overflow-hidden px-5 py-12 md:px-6 md:py-20"><div className="pointer-events-none absolute inset-0 opacity-[.055]"><img src="https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1800&auto=format&fit=crop" alt="Kirkerom" loading="lazy" className="h-full w-full object-cover blur-[2px] brightness-95 saturate-75" /></div><div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fffdf8]/85 via-white/92 to-[#fffdf8]" /><div className="relative mx-auto max-w-6xl"><div className="max-w-3xl"><div className="text-sm font-semibold uppercase tracking-[.25em] text-amber-700">Priser</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:mt-5 md:text-5xl">Fast månedlig pris. Enkel å forstå.</h2><p className="mt-4 text-lg leading-7 text-slate-500 md:mt-5 md:text-2xl md:leading-9">Bygget for små og mellomstore kirker som ønsker jevn kommunikasjon uten å ansette noen til å gjøre det.</p><p className="mt-5 text-base leading-7 text-slate-600 md:mt-6 md:text-xl md:leading-9">Alle planer inkluderer klare og publiseringsklare tekster. Dere slipper å bruke tid på formuleringer, og kan fokusere på det som faktisk skjer i menigheten.</p></div><div className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-3 lg:gap-6">{plans.map((plan) => <div key={plan.name} className={`relative overflow-hidden rounded-[1.6rem] border shadow-sm transition hover:-translate-y-1 md:rounded-[2rem] ${plan.featured ? 'border-slate-900 bg-slate-950 text-white shadow-[0_30px_90px_rgba(15,23,42,.18)] ring-1 ring-amber-300/40' : 'border-amber-100 bg-white/92 text-slate-900 backdrop-blur hover:shadow-md'}`}>{plan.featured && <><div className="pointer-events-none absolute inset-0"><div className="absolute inset-0 rounded-[2rem] bg-amber-300/10 blur-2xl opacity-70" /></div><div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-70" /><div className="absolute right-4 top-4 z-20 rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold text-slate-900 shadow">Mest valgt</div></>}<div className="relative h-40 overflow-hidden"><div className={`absolute inset-0 ${plan.featured ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/40' : 'bg-gradient-to-br from-amber-50 via-white to-slate-100'}`} /><img src={plan.image} alt="Kirke og kommunikasjon" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} className={`relative h-full w-full object-cover brightness-[.82] contrast-[1.05] saturate-[.82] transition duration-700 hover:scale-[1.03] ${plan.name === 'Start' ? 'object-[center_52%]' : plan.name === 'Standard' ? 'object-[center_48%]' : 'object-[center_45%]'}`} /><div className={`absolute inset-0 ${plan.featured ? 'bg-gradient-to-b from-slate-950/10 via-slate-950/68 to-slate-950' : 'bg-gradient-to-b from-white/0 via-white/76 to-white'}`} /><div className={`absolute bottom-0 left-0 right-0 h-32 ${plan.featured ? 'bg-gradient-to-t from-slate-950 via-slate-950/88 to-transparent' : 'bg-gradient-to-t from-white via-white/88 to-transparent'}`} /></div><div className="relative p-6 md:p-7"><div className="pr-20 md:pr-24"><h3 className="text-2xl font-semibold tracking-tight">{plan.name}</h3><p className={`mt-2 text-sm leading-6 ${plan.featured ? 'text-amber-50/80' : 'text-slate-600'}`}>{plan.description}</p></div><div className="mt-7 text-3xl font-semibold tracking-tight md:mt-8">{plan.price}</div><ul className="mt-7 space-y-3 md:mt-8">{plan.features.map((feature) => <li key={feature} className={`flex items-start gap-3 text-sm leading-6 ${plan.featured ? 'text-slate-100' : 'text-slate-700'}`}><span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${plan.featured ? 'bg-amber-50 text-amber-800' : 'bg-amber-50 text-amber-700'}`} aria-hidden="true">✓</span><span>{feature}</span></li>)}</ul><button type="button" onClick={() => choosePlan(plan.name)} className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-medium transition hover:-translate-y-0.5 md:mt-8 ${plan.featured ? 'bg-amber-50 text-amber-950 hover:bg-amber-100' : 'primary-cta bg-amber-700 text-white hover:bg-amber-800'}`}>Velg {plan.name}<span aria-hidden="true">→</span></button></div></div>)}</div><div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50/70 px-5 py-4 text-sm leading-6 text-slate-700 backdrop-blur">Når du velger en plan, blir valget synlig i kontaktdelen nederst på siden. Få første eksempel gratis. Ingen binding før dere ønsker å starte.</div></div></section>

        <section className="mx-auto max-w-6xl px-5 pb-8 md:px-6"><div className="relative overflow-hidden rounded-[1.6rem] bg-slate-950 px-6 py-10 text-white shadow-[0_30px_90px_rgba(15,23,42,.18)] md:rounded-[2rem] md:px-12 md:py-14"><div className="pointer-events-none absolute inset-0 opacity-30"><div className="absolute -right-10 top-0 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" /><div className="absolute bottom-[-5rem] left-8 h-56 w-56 rounded-full bg-white/10 blur-3xl" /></div><div className="relative max-w-3xl"><div className="text-sm font-semibold uppercase tracking-[.25em] text-amber-100/70">Hvorfor dette fungerer</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:mt-5 md:text-5xl">Mindre stress. Bedre kommunikasjon. Mer konsekvent synlighet.</h2><p className="mt-4 text-base leading-7 text-amber-50/70 md:text-xl md:leading-9">En liten tjeneste som gjør en stor forskjell i en travel uke.</p><p className="mt-5 text-base leading-7 text-slate-300 md:mt-6 md:text-xl md:leading-9">Dette handler ikke bare om tekst. Det handler om å gjøre det enklere å være kirke — også digitalt. Dere får mer ro, tydeligere kommunikasjon og mer tid til mennesker.</p></div></div></section>

        <section id="faq" className="section-reveal mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-20"><div className="rounded-[2rem] border border-amber-100 bg-white/80 p-6 shadow-sm backdrop-blur-lg md:p-10"><div className="grid gap-10 md:grid-cols-[.85fr_1.15fr] md:items-start"><div><div className="text-sm font-semibold uppercase tracking-[.25em] text-amber-700">Spørsmål</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">Enkelt å teste. Enkelt å fortsette.</h2><p className="mt-5 text-base leading-7 text-slate-600 md:text-xl md:leading-9">Alt er laget for å være trygt, enkelt og forutsigbart.</p><div className="mt-6 space-y-2 text-sm text-slate-500"><div>• Ingen binding</div><div>• Gratis første eksempel</div><div>• Rask levering</div></div></div><div className="divide-y divide-amber-100">{faqs.map(([question, answer], index) => <div key={question} className="py-5 first:pt-0 last:pb-0"><div className="flex items-start gap-4"><div className="mt-1"><span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-sm font-semibold text-amber-700">{index + 1}</span></div><div><h3 className="text-lg font-semibold tracking-tight text-slate-950">{question}</h3><p className="mt-2 text-base leading-7 text-slate-600">{answer}</p></div></div></div>)}</div></div></div></section>

        <section id="contact" className="section-reveal mx-auto max-w-5xl px-5 py-12 md:px-6 md:py-20"><div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[0_30px_90px_rgba(15,23,42,.12)] backdrop-blur-lg md:p-10"><div className="pointer-events-none absolute inset-0 opacity-[.13]"><img src="https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=1600&auto=format&fit=crop" alt="Varmt lys og fellesskap" loading="lazy" className="h-full w-full object-cover brightness-95 saturate-75" style={{ transform: `translate3d(0, ${scrollY * -0.012}px, 0) scale(1.05)` }} /></div><div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/80" /><div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl" /><div className="relative z-10 grid gap-10 md:grid-cols-[1fr_.9fr] md:items-center"><div><div className="text-sm font-semibold uppercase tracking-[.25em] text-amber-700">Kontakt</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:mt-5 md:text-5xl">Få et gratis eksempel før dere bestemmer dere.</h2><p className="mt-5 text-lg leading-8 text-slate-600 md:text-2xl md:leading-9">Send inn ett kommende arrangement, så lager vi et ferdig innlegg dere kan vurdere.</p><p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">Dette er den enkleste måten å se om tjenesten passer for deres kirke — uten binding, uten møte og uten komplisert oppsett.</p>{selectedPlan && <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 small-copy text-amber-950"><span className="font-semibold">Valgt plan:</span> {selectedPlan}. Neste steg: send inn informasjon via Google Form.</div>}</div><div className="rounded-[1.6rem] border border-amber-100 bg-white/88 p-5 shadow-[0_18px_50px_rgba(15,23,42,.08)] backdrop-blur md:p-6"><div className="text-sm font-semibold uppercase tracking-[.22em] text-amber-700">Hva skjer etterpå?</div><div className="mt-5 grid gap-4">{[['01', 'Send arrangementet', 'Fyll ut skjemaet med tittel, dato, sted og noen detaljer.'], ['02', 'Vi lager et eksempel', 'Du får et klart innlegg som viser hvordan tjenesten fungerer.'], ['03', 'Dere bestemmer selv', 'Hvis det føles nyttig, kan dere starte abonnement etterpå.']].map(([number, title, text]) => <div key={number} className="flex gap-4 rounded-2xl bg-amber-50/60 p-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-semibold text-amber-700 shadow-sm">{number}</div><div><div className="font-semibold text-slate-950">{title}</div><p className="mt-1 small-copy text-slate-600">{text}</p></div></div>)}</div><a href={openFormUrl} target="_blank" rel="noreferrer" className="primary-cta mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-amber-700 px-6 py-5 text-center text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-amber-800">Åpne Google Form <span aria-hidden="true">→</span></a><div className="mt-4 grid gap-2 text-center text-sm text-slate-500 sm:grid-cols-3"><div>Gratis første eksempel</div><div>Ingen binding</div><div>Svar innen 24 timer</div></div></div></div></div></section>
      </main>

      <footer className="border-t border-amber-100 bg-[#fffdf8]/80 px-5 py-10 md:px-6"><div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-base font-semibold text-amber-700 shadow-sm">K</div><div><div className="font-semibold tracking-tight text-slate-950">Kirkeinnhold</div><div className="micro-copy text-slate-500">Ferdige innlegg for sosiale medier</div></div></div><div className="text-sm leading-6 text-slate-500 md:text-right"><div>© {new Date().getFullYear()} Kirkeinnhold</div><div>Gratis prøve først. Ingen binding.</div></div></div></footer>
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-amber-100 bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(15,23,42,.08)] backdrop-blur md:hidden"><a href={openFormUrl} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-700 px-5 py-4 text-center text-base font-medium text-white">Start gratis prøve <span aria-hidden="true">→</span></a><div className="mt-2 text-center text-xs text-slate-500">Tar ca. 1 minutt. Ingen forpliktelser.</div></div>
    </div>
  );
}
