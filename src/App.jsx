import { useEffect, useState } from 'react';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScp9iJAd6Vjsb68cfbwdhiKL74d4-V-_IEtKPHJeaBlZFUWAQ/viewform?usp=header';

  useEffect(() => {
    const savedPlan = localStorage.getItem('kirkeinnhold-selected-plan');
    if (savedPlan) setSelectedPlan(savedPlan);
  }, []);

  const openFormUrl = selectedPlan ? `${formUrl}&entry_selected_plan=${encodeURIComponent(selectedPlan)}` : formUrl;
  const closeMenu = () => setMenuOpen(false);

  const choosePlan = (planName) => {
    setSelectedPlan(planName);
    localStorage.setItem('kirkeinnhold-selected-plan', planName);
    setMenuOpen(false);
    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 80);
  };

  const imageSystem = {
    place: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1400&auto=format&fit=crop',
    worshipPlace: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?q=80&w=1400&auto=format&fit=crop',
    gathering: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1400&auto=format&fit=crop',
    community: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop',
    communication: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop',
    writing: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1400&auto=format&fit=crop',
  };

  const plans = [
    {
      name: 'Start',
      price: '499 kr / mnd',
      description: 'For små kirker med noen få arrangementer i måneden.',
      features: ['Opptil 4 innlegg per måned', 'Levering innen 24 timer', 'Facebook + Instagram + kort versjon'],
      featured: false,
      image: imageSystem.communication,
    },
    {
      name: 'Standard',
      price: '990 kr / mnd',
      description: 'For kirker som ønsker jevn og trygg kommunikasjon hver uke.',
      features: ['Opptil 12 innlegg per måned', 'Prioritert levering', 'Tilpasset tone for menigheten', 'Facebook + Instagram + kort versjon'],
      featured: true,
      image: imageSystem.worshipPlace,
    },
    {
      name: 'Pluss',
      price: '1790 kr / mnd',
      description: 'For aktive kirker med mange samlinger, kampanjer og arrangementer.',
      features: ['Ubegrensede forespørsler innen rimelig bruk', 'Ekstra variasjoner ved behov', 'Raskere levering når mulig', 'Prioritert støtte'],
      featured: false,
      image: imageSystem.gathering,
    },
  ];

  const steps = [
    { number: '01', title: 'Send detaljene', text: 'Fyll ut tittel, dato, sted og noen linjer om arrangementet.', image: imageSystem.communication, icon: '↗' },
    { number: '02', title: 'Vi skriver innholdet', text: 'Vi gjør informasjonen om til varme og tydelige innlegg.', image: imageSystem.writing, icon: '✦' },
    { number: '03', title: 'Kopier og publiser', text: 'Dere får ferdige tekster til Facebook, Instagram og kort versjon.', image: imageSystem.place, icon: '✓' },
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
    ['Hvor raskt får vi innlegget?', 'Normalt leveres ferdige tekster innen 24 timer. Teksten kan kopieres direkte til Facebook, Instagram eller annen kommunikasjon.'],
    ['Kan dere skrive på engelsk også?', 'Ja. Tjenesten er norsk først, men vi kan også lage engelske versjoner ved behov.'],
    ['Hvordan betaler vi?', 'I starten håndteres betaling enkelt via Vipps, faktura eller bankoverføring. Dette avtales etter at dere ønsker å starte fast.'],
  ];

  const IconBadge = ({ children }) => (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-200/70 bg-amber-50 text-sm font-semibold text-amber-700 shadow-sm">
      {children}
    </span>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fffdf8] text-slate-900 antialiased">
      <style>{`
        html { scroll-behavior: smooth; scroll-padding-top: 84px; }
        body { font-feature-settings: 'kern'; text-rendering: optimizeLegibility; }
        p, li { letter-spacing: -0.005em; }
        a, button { -webkit-tap-highlight-color: transparent; }
        a:active, button:active { transform: scale(0.985); }
        .page-bg { background: radial-gradient(circle at 14% 8%, rgba(217,119,6,0.09), transparent 28%), radial-gradient(circle at 90% 18%, rgba(15,23,42,0.05), transparent 24%), linear-gradient(180deg, #fffdf8 0%, #fff7ed 42%, #ffffff 100%); }
        .soft-section { background: linear-gradient(180deg, rgba(255,253,248,0.72), rgba(255,255,255,0.92)); }
        .warm-section { background: linear-gradient(180deg, rgba(255,247,237,0.72), rgba(255,255,255,0.9)); }
        .card { border: 1px solid rgba(251,191,36,0.22); background: rgba(255,255,255,0.82); box-shadow: 0 14px 42px rgba(15,23,42,0.06); backdrop-filter: blur(14px); }
        .card-hover { transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 56px rgba(15,23,42,0.10); border-color: rgba(217,119,6,0.24); }
        .cta { box-shadow: 0 14px 34px rgba(180,83,9,0.24); }
        .cta:hover { box-shadow: 0 18px 44px rgba(180,83,9,0.30); }
        .copy { font-size: clamp(1.02rem, 0.96rem + 0.24vw, 1.14rem); line-height: 1.72; }
        .small-copy { font-size: clamp(0.96rem, 0.92rem + 0.16vw, 1.04rem); line-height: 1.65; }
        @media (max-width: 767px) {
          html { scroll-padding-top: 76px; }
          .card { backdrop-filter: blur(8px); box-shadow: 0 10px 30px rgba(15,23,42,0.055); }
          .mobile-section { padding-top: 3.5rem; padding-bottom: 3.5rem; }
          .mobile-full { margin-left: -0.25rem; margin-right: -0.25rem; }
        }
      `}</style>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-amber-100/70 bg-[#fffdf8]/95 shadow-[0_8px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <a href="#" onClick={closeMenu} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-base font-semibold text-amber-700 shadow-sm">K</div>
            <div>
              <div className="bg-gradient-to-r from-slate-950 via-slate-800 to-amber-800 bg-clip-text text-lg font-semibold tracking-tight text-transparent md:text-xl">Kirkeinnhold</div>
              <div className="hidden text-sm text-slate-500 sm:block">Ferdige innlegg for sosiale medier</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#how-it-works" className="hover:text-amber-700">Slik fungerer det</a>
            <a href="#benefits" className="hover:text-amber-700">Hva dere får</a>
            <a href="#pricing" className="hover:text-amber-700">Priser</a>
            <a href="#faq" className="hover:text-amber-700">Spørsmål</a>
            <a href="#contact" className="hover:text-amber-700">Kontakt</a>
          </nav>

          <a href="#contact" className="cta hidden rounded-2xl bg-amber-700 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-amber-800 md:inline-flex">Få gratis eksempel</a>

          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-100 bg-white/86 text-slate-950 shadow-sm md:hidden" aria-label="Åpne meny">
            <span className="relative h-4 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-slate-950 transition ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-slate-950 transition ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-slate-950 transition ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-amber-100 bg-[#fffdf8]/98 px-4 pb-4 pt-3 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl md:hidden">
            <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.35rem] border border-amber-100 bg-white/88 p-2 shadow-sm backdrop-blur">
              {[
                ['01', 'Slik fungerer det', '#how-it-works'],
                ['02', 'Hva dere får', '#benefits'],
                ['03', 'Priser', '#pricing'],
                ['04', 'Spørsmål', '#faq'],
                ['05', 'Kontakt', '#contact'],
              ].map(([number, label, href]) => (
                <a key={href} onClick={closeMenu} href={href} className="group flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium text-slate-800 transition active:bg-amber-50">
                  <span className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">{number}</span>{label}</span>
                  <span className="text-slate-300">→</span>
                </a>
              ))}
              <div className="mt-2 rounded-2xl bg-amber-50/70 px-4 py-3 text-center text-sm leading-6 text-slate-600">Knappen for gratis prøve ligger fast nederst på skjermen.</div>
            </div>
          </div>
        )}
      </header>

      <main className="page-bg pt-[70px] md:pt-[78px]">
        <section className="mobile-section relative mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
          <div className="pointer-events-none absolute -left-24 top-8 h-56 w-56 rounded-full bg-amber-200/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 top-28 h-72 w-72 rounded-full bg-slate-300/20 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.08fr_0.92fr] md:gap-12">
            <div>
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-amber-200/80 bg-white/86 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 text-xs font-semibold text-amber-700">✦</span>Sosiale medier for kirker i Norge</div>
              <h1 className="max-w-3xl text-[2.55rem] font-semibold leading-[1.04] tracking-[-0.035em] text-slate-950 md:text-6xl">Du sender detaljene — vi skriver innleggene.</h1>
              <p className="copy mt-5 max-w-2xl text-slate-600 md:mt-6">En enkel abonnementstjeneste for kirker som vil kommunisere tydelig på nett. Send informasjon om gudstjenester, arrangementer og annonseringer, og få ferdige innlegg for Facebook og Instagram innen 24 timer.</p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 md:text-lg md:leading-8">Mindre tid brukt på formuleringer. Mer tid til mennesker, fellesskap og det som skjer i menigheten.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row md:mt-8">
                <a href={openFormUrl} target="_blank" rel="noreferrer" className="cta inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-700 px-6 py-4 text-center text-base font-medium text-white transition hover:-translate-y-0.5 hover:bg-amber-800">Få gratis eksempel på deres neste innlegg <span aria-hidden="true">→</span></a>
                <a href="#pricing" className="rounded-2xl border border-slate-200 bg-white/88 px-6 py-4 text-center text-base font-medium text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-amber-50">Se priser</a>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">{['Gratis første eksempel', 'Ingen binding', 'Levering innen 24 timer'].map((item) => <span key={item} className="rounded-full border border-amber-100 bg-white/82 px-3 py-1.5 shadow-sm backdrop-blur">✓ {item}</span>)}</div>
            </div>
            <div className="mobile-full relative">
              <div className="card rounded-[1.6rem] p-4 md:rounded-[2rem] md:p-6">
                <div className="mb-4 flex items-center justify-between gap-4"><div><div className="text-sm font-semibold text-slate-900">Eksempel på leveranse</div><div className="text-sm text-slate-500">Fra enkel info til publiseringsklart innlegg</div></div><div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">Før → Etter</div></div>
                <div className="grid gap-4"><div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 md:p-5"><div className="text-sm font-medium text-slate-500">Det dere sender</div><div className="mt-3 space-y-2 small-copy text-slate-700"><p><span className="font-semibold">Type:</span> Gudstjeneste</p><p><span className="font-semibold">Dato:</span> Søndag 12. mai kl. 11:00</p><p><span className="font-semibold">Tema:</span> Håp i krevende tider</p></div></div><div className="rounded-2xl bg-slate-950 p-4 text-white shadow-inner md:p-5"><div className="text-sm font-medium text-amber-100/80">Det dere får tilbake</div><div className="mt-3 space-y-3 small-copy text-slate-100"><p>Velkommen til gudstjeneste denne søndagen.</p><p>Bli med på en varm samling med lovsang, bønn og en oppmuntrende tale om håp i krevende tider.</p><p>Alle er hjertelig velkommen.</p></div></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mobile-section soft-section px-4 py-14 md:px-6 md:py-20"><div className="mx-auto max-w-6xl"><div className="mb-8 grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-end"><div><div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">I praksis</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">Fra enkel informasjon til ferdig innhold.</h2></div><p className="copy text-slate-500 md:text-xl">Tjenesten skal være lett å forstå med én gang: dere sender detaljene, vi gjør det klart til publisering.</p></div><div className="card mobile-full grid gap-6 rounded-[2rem] p-5 md:grid-cols-[0.85fr_1.15fr] md:p-8"><div className="grid gap-5"><div className="rounded-[1.5rem] border border-amber-100 bg-white p-5 shadow-sm"><div className="flex items-center justify-between gap-4"><div><div className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">Det dere sender</div><h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">En enkel beskjed</h3></div><IconBadge>01</IconBadge></div><div className="mt-5 space-y-3 small-copy text-slate-700"><div className="rounded-2xl bg-slate-50 p-4"><span className="font-semibold text-slate-950">Tittel:</span> Søndagsgudstjeneste</div><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-4"><span className="font-semibold text-slate-950">Tid:</span> Søndag kl. 11:00</div><div className="rounded-2xl bg-slate-50 p-4"><span className="font-semibold text-slate-950">Sted:</span> Kirken deres</div></div><div className="rounded-2xl bg-amber-50/70 p-4"><span className="font-semibold text-slate-950">Tema:</span> Håp i krevende tider</div></div></div><div className="rounded-[1.5rem] border border-amber-100 bg-amber-50/60 p-5"><div className="flex items-start gap-4"><IconBadge>✦</IconBadge><div><h3 className="text-xl font-semibold tracking-tight text-slate-950">Vi gjør teksten klar</h3><p className="small-copy mt-2 text-slate-600">Vi skriver naturlig, varmt og tydelig — uten at det høres generisk eller robotaktig ut.</p></div></div></div></div><div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] md:p-7"><div className="flex items-center justify-between gap-4"><div><div className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-100/70">Ferdig output</div><h3 className="mt-2 text-2xl font-semibold tracking-tight">Klart til publisering</h3></div><div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-amber-50">Facebook / Instagram</div></div><div className="mt-6 rounded-[1.5rem] bg-white p-5 text-slate-900 shadow-2xl"><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-sm font-semibold text-amber-700">K</div><div><div className="font-semibold text-slate-950">Kirken deres</div><div className="text-xs text-slate-400">Publisert nå</div></div></div><div className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">Forhåndsvisning</div></div><div className="mt-5 rounded-2xl bg-amber-50/70 p-5"><p className="font-semibold leading-7 text-slate-950">Velkommen til gudstjeneste denne søndagen.</p><p className="small-copy mt-3 text-slate-700">Bli med på en varm samling med lovsang, bønn og en oppmuntrende tale om håp i krevende tider.</p><p className="small-copy mt-3 text-slate-700">Alle er hjertelig velkommen.</p></div></div></div></div><div className="mt-7 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] border border-amber-100 bg-white/82 px-5 py-5 shadow-sm backdrop-blur md:flex-row md:items-center md:px-6"><div><div className="font-semibold text-slate-950">Vil dere se hvordan dette kan se ut for deres kirke?</div><div className="mt-1 text-sm text-slate-500">Send ett arrangement og få et gratis eksempel tilbake.</div></div><a href={openFormUrl} target="_blank" rel="noreferrer" className="rounded-2xl bg-amber-700 px-5 py-3 text-sm font-medium text-white shadow-[0_10px_28px_rgba(15,23,42,0.14)] transition hover:bg-amber-800">Se hvordan deres innlegg kan se ut →</a></div></div></section>

        <section className="mobile-section warm-section px-4 py-14 md:px-6 md:py-20"><div className="mx-auto max-w-6xl"><div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end md:gap-14"><div><div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Utfordringen</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">Viktig å poste. Lett å utsette.</h2></div><p className="copy text-slate-500 md:text-2xl md:leading-9">Sosiale medier betyr noe — men blir ofte nedprioritert i en travel uke.</p></div><div className="mt-9 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch"><div className="mobile-full relative min-h-[360px] overflow-hidden rounded-[2rem] border border-amber-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.10)] md:min-h-[440px]"><img src={imageSystem.community} alt="Mennesker samlet i fellesskap" loading="lazy" className="h-full min-h-[360px] w-full object-cover brightness-[0.9] saturate-[0.82] md:min-h-[440px]" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/18 to-white/5" /><div className="absolute left-5 right-5 top-5 flex items-center justify-between md:left-6 md:right-6 md:top-6"><div className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">Fellesskap</div><div className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">Synlighet</div></div><div className="absolute bottom-6 left-5 right-5 text-white md:left-8 md:right-8"><p className="max-w-md text-2xl font-semibold leading-snug tracking-[-0.02em] md:text-3xl">Folk kommer lettere når de faktisk får vite hva som skjer.</p><p className="mt-3 max-w-md text-base leading-7 text-white/78">God kommunikasjon hjelper flere å føle seg invitert — før arrangementet skjer.</p></div></div><div className="grid gap-4">{[{ image: imageSystem.place, title: 'Gudstjenester må deles', text: 'Hvis informasjonen ikke deles tydelig, vet mange ikke at de kan komme.' }, { image: imageSystem.gathering, title: 'Arrangementer trenger synlighet', text: 'Små og store samlinger trenger en enkel måte å nå ut på.' }, { image: imageSystem.communication, title: 'Budskap må føles varmt', text: 'Teksten bør være klar, inviterende og enkel å publisere.' }].map((item) => <div key={item.title} className="card card-hover flex gap-4 rounded-[1.35rem] p-3 md:p-4"><img src={item.image} alt={item.title} loading="lazy" className="h-20 w-20 shrink-0 rounded-2xl object-cover brightness-95 saturate-75 md:h-24 md:w-24" /><div className="py-1"><h3 className="text-lg font-semibold tracking-tight text-slate-950">{item.title}</h3><p className="small-copy mt-1 text-slate-600">{item.text}</p></div></div>)}<div className="grid gap-4 md:grid-cols-[1fr_0.9fr]"><div className="rounded-[1.35rem] bg-amber-50/80 p-5 text-slate-700 shadow-inner"><p className="copy">Men selve skrivingen blir ofte utsatt — ikke fordi det er uviktig, men fordi det alltid finnes noe annet som haster mer.</p></div><div className="rounded-[1.35rem] border border-amber-100 bg-white/75 px-5 py-4 italic text-slate-500 shadow-sm backdrop-blur">“Vi vet at vi burde poste — men det blir lett skjøvet til senere.”</div></div></div></div></div></section>

        <section id="how-it-works" className="mobile-section soft-section px-4 py-14 md:px-6 md:py-20"><div className="mx-auto max-w-6xl"><div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end md:gap-10"><div><div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Slik fungerer det</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">En enkel tjeneste som sparer tid hver uke.</h2></div><p className="copy text-slate-500 md:text-2xl md:leading-9">Ingen komplisert plattform. Bare en tydelig og praktisk arbeidsflyt.</p></div><div className="relative mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">{steps.map((step) => <div key={step.number} className="card card-hover overflow-hidden rounded-[1.5rem] md:rounded-[1.75rem]"><div className="relative h-24 overflow-hidden md:h-28"><img src={step.image} alt="Arbeidsflyt" loading="lazy" className="h-full w-full object-cover brightness-95 saturate-75" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-white/10" /></div><div className="p-5 md:p-6"><div className="flex items-center justify-between"><div className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">{step.number}</div><IconBadge>{step.icon}</IconBadge></div><h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">{step.title}</h3><p className="small-copy mt-3 text-slate-600">{step.text}</p></div></div>)}</div></div></section>

        <section id="benefits" className="mobile-section warm-section px-4 py-14 md:px-6 md:py-20"><div className="mx-auto max-w-6xl"><div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end"><div><div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Hva dere får</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">Klar kommunikasjon uten ekstra arbeid.</h2></div><p className="copy text-slate-500 md:text-2xl md:leading-9">Alt er laget for å være lett å bruke, lett å forstå og lett å publisere.</p></div><div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 lg:grid-cols-3">{benefits.map(([icon, item]) => <div key={item} className="card card-hover flex items-start gap-4 rounded-2xl px-5 py-5 text-base text-slate-700"><IconBadge>{icon}</IconBadge><div className="pt-2 font-medium">{item}</div></div>)}</div></div></section>

        <section className="mobile-section soft-section px-4 py-14 md:px-6 md:py-20"><div className="mx-auto max-w-5xl"><div className="card grid gap-8 rounded-[2rem] p-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:p-10"><div className="relative min-h-[240px] overflow-hidden rounded-[1.5rem] border border-amber-100 bg-white shadow-sm"><img src={imageSystem.community} alt="Fellesskap i menigheten" loading="lazy" className="h-full min-h-[240px] w-full object-cover brightness-[0.92] saturate-[0.85]" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" /><div className="absolute bottom-5 left-5 right-5 text-white"><div className="mb-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">Tilbakemelding</div><p className="text-xl font-semibold leading-snug">Tydelig kommunikasjon gjør det lettere for folk å møte opp.</p></div></div><div><div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Trygg test</div><blockquote className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-slate-950 md:text-3xl">“Vi brukte mye tid på å formulere innlegg før. Nå sender vi bare informasjon – og får ferdige tekster som faktisk treffer.”</blockquote><div className="mt-5 text-base text-slate-500">– Frivillig, lokal menighet</div></div></div></div></section>

        <section id="pricing" className="mobile-section relative isolate overflow-hidden px-4 py-14 md:px-6 md:py-20"><div className="pointer-events-none absolute inset-0 opacity-[0.045]"><img src={imageSystem.place} alt="Kirkerom" loading="lazy" className="h-full w-full object-cover blur-[2px] brightness-95 saturate-75" /></div><div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fffdf8]/88 via-white/94 to-[#fffdf8]" /><div className="relative mx-auto max-w-6xl"><div className="max-w-3xl"><div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Priser</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">Fast månedlig pris. Enkel å forstå.</h2><p className="copy mt-4 text-slate-500 md:text-2xl md:leading-9">Bygget for små og mellomstore kirker som ønsker jevn kommunikasjon uten å ansette noen til å gjøre det.</p></div><div className="mt-8 grid gap-5 lg:grid-cols-3 lg:gap-6">{plans.map((plan) => <div key={plan.name} className={`relative overflow-hidden rounded-[1.6rem] border shadow-sm transition hover:-translate-y-1 md:rounded-[2rem] ${plan.featured ? 'border-slate-900 bg-slate-950 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] ring-1 ring-amber-300/40' : 'border-amber-100 bg-white/94 text-slate-900 backdrop-blur hover:shadow-md'}`}>{plan.featured && <><div className="pointer-events-none absolute inset-0"><div className="absolute inset-0 rounded-[2rem] bg-amber-300/10 blur-2xl opacity-70" /></div><div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-70" /><div className="absolute right-4 top-4 z-20 rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold text-slate-900 shadow">Mest valgt</div></>}<div className="relative h-36 overflow-hidden md:h-40"><div className={`absolute inset-0 ${plan.featured ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/40' : 'bg-gradient-to-br from-amber-50 via-white to-slate-100'}`} /><img src={plan.image} alt="Kirke og kommunikasjon" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} className={`relative h-full w-full object-cover brightness-[0.82] contrast-[1.05] saturate-[0.82] ${plan.name === 'Start' ? 'object-[center_52%]' : plan.name === 'Standard' ? 'object-[center_48%]' : 'object-[center_45%]'}`} /><div className={`absolute inset-0 ${plan.featured ? 'bg-gradient-to-b from-slate-950/10 via-slate-950/68 to-slate-950' : 'bg-gradient-to-b from-white/0 via-white/76 to-white'}`} /><div className={`absolute bottom-0 left-0 right-0 h-32 ${plan.featured ? 'bg-gradient-to-t from-slate-950 via-slate-950/88 to-transparent' : 'bg-gradient-to-t from-white via-white/88 to-transparent'}`} /></div><div className="relative p-6 md:p-7"><div className="pr-20 md:pr-24"><h3 className="text-2xl font-semibold tracking-tight">{plan.name}</h3><p className={`small-copy mt-2 ${plan.featured ? 'text-amber-50/80' : 'text-slate-600'}`}>{plan.description}</p></div><div className="mt-7 text-3xl font-semibold tracking-tight">{plan.price}</div><ul className="mt-7 space-y-3">{plan.features.map((feature) => <li key={feature} className={`flex items-start gap-3 text-sm leading-6 ${plan.featured ? 'text-slate-100' : 'text-slate-700'}`}><span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${plan.featured ? 'bg-amber-50 text-amber-800' : 'bg-amber-50 text-amber-700'}`}>✓</span><span>{feature}</span></li>)}</ul><button type="button" onClick={() => choosePlan(plan.name)} className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-medium transition hover:-translate-y-0.5 ${plan.featured ? 'bg-amber-50 text-amber-950 hover:bg-amber-100' : 'cta bg-amber-700 text-white hover:bg-amber-800'}`}>Velg {plan.name}<span aria-hidden="true">→</span></button></div></div>)}</div><div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50/70 px-5 py-4 small-copy text-slate-700 backdrop-blur">Når du velger en plan, blir valget synlig i kontaktdelen nederst på siden. Få første eksempel gratis. Ingen binding før dere ønsker å starte.</div></div></section>

        <section className="mobile-section px-4 py-14 md:px-6 md:py-20"><div className="mx-auto max-w-6xl rounded-[1.6rem] bg-slate-950 px-6 py-10 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] md:rounded-[2rem] md:px-12 md:py-14"><div className="max-w-3xl"><div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-100/70">Hvorfor dette fungerer</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">Mindre stress. Bedre kommunikasjon. Mer konsekvent synlighet.</h2><p className="copy mt-4 text-amber-50/70 md:text-xl">En liten tjeneste som gjør en stor forskjell i en travel uke.</p><p className="copy mt-5 text-slate-300 md:text-xl">Dette handler ikke bare om tekst. Det handler om å gjøre det enklere å være kirke — også digitalt. Dere får mer ro, tydeligere kommunikasjon og mer tid til mennesker.</p></div></div></section>

        <section id="faq" className="mobile-section soft-section px-4 py-14 md:px-6 md:py-20"><div className="card mx-auto max-w-6xl rounded-[2rem] p-6 md:p-10"><div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr]"><div><div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Spørsmål</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">Enkelt å teste. Enkelt å fortsette.</h2><p className="copy mt-5 text-slate-600 md:text-xl">Alt er laget for å være trygt, enkelt og forutsigbart.</p></div><div className="divide-y divide-amber-100">{faqs.map(([question, answer], index) => <div key={question} className="py-5 first:pt-0 last:pb-0"><div className="flex items-start gap-4"><span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-sm font-semibold text-amber-700">{index + 1}</span><div><h3 className="text-lg font-semibold tracking-tight text-slate-950">{question}</h3><p className="small-copy mt-2 text-slate-600">{answer}</p></div></div></div>)}</div></div></div></section>

        <section id="contact" className="mobile-section px-4 py-14 md:px-6 md:py-20"><div className="card mx-auto max-w-5xl overflow-hidden rounded-[2rem] p-6 md:p-10"><div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-center"><div><div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Kontakt</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">Få et gratis eksempel på deres neste innlegg.</h2><p className="copy mt-5 text-slate-600 md:text-2xl md:leading-9">Send inn ett arrangement – vi viser hvordan et ferdig innlegg kan se ut.</p><p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">Dette er den enkleste måten å se om tjenesten passer for deres kirke — uten binding, uten møte og uten komplisert oppsett.</p>{selectedPlan && <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 small-copy text-amber-950"><span className="font-semibold">Valgt plan:</span> {selectedPlan}. Neste steg: send inn informasjon via Google Form.</div>}</div><div className="rounded-[1.6rem] border border-amber-100 bg-white/88 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur md:p-6"><div className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">Hva skjer etterpå?</div><div className="mt-5 grid gap-4">{[['01', 'Send arrangementet', 'Fyll ut skjemaet med tittel, dato, sted og noen detaljer.'], ['02', 'Vi lager et eksempel', 'Du får et klart innlegg som viser hvordan tjenesten fungerer.'], ['03', 'Dere bestemmer selv', 'Hvis det føles nyttig, kan dere starte abonnement etterpå.']].map(([number, title, text]) => <div key={number} className="flex gap-4 rounded-2xl bg-amber-50/60 p-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-semibold text-amber-700 shadow-sm">{number}</div><div><div className="font-semibold text-slate-950">{title}</div><p className="small-copy mt-1 text-slate-600">{text}</p></div></div>)}</div><a href={openFormUrl} target="_blank" rel="noreferrer" className="cta mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-amber-700 px-6 py-5 text-center text-base font-semibold text-white transition hover:bg-amber-800">Få gratis eksempel nå <span aria-hidden="true">→</span></a><div className="mt-4 grid gap-2 text-center text-sm text-slate-500 sm:grid-cols-3"><div>✓ Gratis første eksempel</div><div>✓ Ingen binding</div><div>✓ Svar innen 24 timer</div></div></div></div></div></section>
      </main>

      <footer className="border-t border-amber-100 bg-[#fffdf8]/88 px-4 py-10 md:px-6"><div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-base font-semibold text-amber-700 shadow-sm">K</div><div><div className="font-semibold tracking-tight text-slate-950">Kirkeinnhold</div><div className="text-sm text-slate-500">Ferdige innlegg for sosiale medier</div></div></div><div className="text-sm leading-6 text-slate-500 md:text-right"><div>© {new Date().getFullYear()} Kirkeinnhold</div><div>Gratis prøve først. Ingen binding.</div></div></div></footer>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-amber-100 bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden"><a href={openFormUrl} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-700 px-5 py-4 text-center text-base font-medium text-white">Få gratis eksempel nå <span aria-hidden="true">→</span></a><div className="mt-2 text-center text-xs text-slate-500">Tar ca. 1 minutt. Ingen forpliktelser.</div></div>
    </div>
  );
}
