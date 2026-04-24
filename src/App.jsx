import { useEffect, useState } from 'react';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState('');

  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScp9iJAd6Vjsb68cfbwdhiKL74d4-V-_IEtKPHJeaBlZFUWAQ/viewform?usp=header';

  useEffect(() => {
    const savedPlan = localStorage.getItem('kirkeinnhold-selected-plan');
    if (savedPlan) setSelectedPlan(savedPlan);
  }, []);

  const choosePlan = (planName) => {
    setSelectedPlan(planName);
    localStorage.setItem('kirkeinnhold-selected-plan', planName);
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const openFormUrl = selectedPlan
    ? `${formUrl}&entry_selected_plan=${encodeURIComponent(selectedPlan)}`
    : formUrl;

  const plans = [
    {
      name: 'Start',
      price: '499 kr / mnd',
      description: 'For små kirker med noen få arrangementer i måneden.',
      features: ['Opptil 4 innlegg per måned', 'Levering innen 24 timer', 'Facebook + Instagram + kort versjon'],
      featured: false,
    },
    {
      name: 'Standard',
      price: '990 kr / mnd',
      description: 'For kirker som ønsker jevn og trygg kommunikasjon hver uke.',
      features: ['Opptil 12 innlegg per måned', 'Prioritert levering', 'Tilpasset tone for menigheten', 'Facebook + Instagram + kort versjon'],
      featured: true,
    },
    {
      name: 'Pluss',
      price: '1790 kr / mnd',
      description: 'For aktive kirker med mange samlinger, kampanjer og arrangementer.',
      features: ['Ubegrensede forespørsler innen rimelig bruk', 'Ekstra variasjoner ved behov', 'Raskere levering når mulig', 'Prioritert støtte'],
      featured: false,
    },
  ];

  const steps = [
    { number: '01', title: 'Send detaljene', text: 'Send tittel, dato, sted og noen linjer om arrangementet via skjema.', symbol: '↗' },
    { number: '02', title: 'Vi skriver innholdet', text: 'Vi gjør informasjonen om til varme, tydelige og klare innlegg tilpasset kirkelig kommunikasjon.', symbol: '✦' },
    { number: '03', title: 'Kopier og publiser', text: 'Du får ferdige versjoner for Facebook, Instagram og en kort versjon som kan brukes med én gang.', symbol: '✓' },
  ];

  const benefits = [
    { symbol: '↯', text: 'Spar tid hver uke' },
    { symbol: '✓', text: 'Få jevnere kommunikasjon' },
    { symbol: '✦', text: 'Slipp stress rundt formuleringer' },
    { symbol: '“”', text: 'Tydelige og varme innlegg' },
    { symbol: 'NO', text: 'Norsk først, engelsk ved behov' },
    { symbol: '24', text: 'Klar levering innen 24 timer' },
  ];

  const trustItems = ['Ingen binding', 'Gratis første eksempel', 'Svar innen 24 timer'];

  const faqs = [
    { question: 'Må vi binde oss?', answer: 'Nei. Dere kan sende inn ett arrangement og få et gratis eksempel først. Dere starter abonnement bare hvis dere ønsker å fortsette.' },
    { question: 'Hvor raskt får vi innlegget?', answer: 'Normalt leveres ferdige tekster innen 24 timer. Dere får tekst som kan kopieres direkte til Facebook, Instagram og annen kommunikasjon.' },
    { question: 'Kan dere skrive på engelsk også?', answer: 'Ja. Tjenesten er norsk først, men vi kan også lage engelske versjoner ved behov.' },
    { question: 'Hvordan betaler vi?', answer: 'I starten håndteres betaling enkelt via Vipps, faktura eller bankoverføring. Dette avtales etter at dere ønsker å starte fast.' },
  ];

  const IconCircle = ({ children, dark = false }) => (
    <span
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-xs font-semibold shadow-sm md:h-11 md:w-11 md:text-sm ${
        dark ? 'border-amber-200/20 bg-amber-50/10 text-amber-100' : 'border-amber-200/70 bg-gradient-to-br from-amber-50 to-white text-amber-700'
      }`}
      aria-hidden="true"
    >
      {children}
    </span>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#fffdf8] via-amber-50/30 to-white text-slate-900 antialiased">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-amber-100/60 bg-[#fffdf8]/95 backdrop-blur-xl shadow-[0_6px_20px_rgba(15,23,42,0.06)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-6 md:py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-base font-semibold text-amber-700 shadow-sm md:h-11 md:w-11 md:text-lg">K</div>
            <div>
              <div className="bg-gradient-to-r from-slate-950 via-slate-800 to-amber-800 bg-clip-text text-lg font-semibold tracking-tight text-transparent md:text-xl">Kirkeinnhold</div>
              <div className="hidden text-sm text-slate-500 sm:block">Ferdige innlegg for sosiale medier</div>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#how-it-works" className="transition hover:text-amber-700">Slik fungerer det</a>
            <a href="#benefits" className="transition hover:text-amber-700">Hva dere får</a>
            <a href="#pricing" className="transition hover:text-amber-700">Priser</a>
            <a href="#faq" className="transition hover:text-amber-700">Spørsmål</a>
            <a href="#contact" className="transition hover:text-amber-700">Kontakt</a>
          </nav>
          <a href="#contact" className="rounded-2xl bg-amber-700 px-4 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-amber-800 md:px-5">Få gratis prøve</a>
        </div>
      </header>

      <main className="pt-[72px] pb-24 md:pb-0">
        <section className="relative mx-auto max-w-6xl px-5 pb-12 pt-10 md:px-6 md:pb-22 md:pt-20">
          <div className="absolute left-[-6rem] top-10 h-52 w-52 rounded-full bg-amber-200/30 blur-3xl" />
          <div className="absolute right-[-4rem] top-28 h-60 w-60 rounded-full bg-slate-300/30 blur-3xl" />
          <div className="relative grid items-center gap-10 md:gap-12 md:grid-cols-[1.08fr_0.92fr]">
            <div className="fade-up">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-amber-200/80 bg-white/85 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 text-xs font-semibold text-amber-700">✦</span>
                Sosiale medier for kirker i Norge
              </div>
              <h1 className="max-w-3xl text-[2.45rem] font-semibold leading-[1.06] tracking-tight text-slate-950 md:text-6xl">Du sender detaljene — vi skriver innleggene.</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:mt-6 md:text-xl md:leading-8">En enkel abonnementstjeneste for kirker som vil kommunisere tydelig på nett. Send informasjon om gudstjenester, arrangementer og annonseringer, og få ferdige innlegg for Facebook og Instagram innen 24 timer.</p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 md:mt-4 md:text-lg md:leading-7">Mindre tid brukt på formuleringer. Mer tid til mennesker, fellesskap og det som skjer i menigheten.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row md:mt-8 md:gap-4">
                <a href={openFormUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-700 px-6 py-4 text-center text-base font-medium text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-amber-800">Få et gratis eksempel <span aria-hidden="true">→</span></a>
                <a href="#pricing" className="rounded-2xl border border-amber-200 bg-white/80 px-6 py-4 text-center text-base font-medium text-slate-900 backdrop-blur-lg transition hover:bg-amber-50">Se priser</a>
              </div>
              <div className="mt-4 text-sm leading-6 text-slate-500 md:mt-5">Tar ca. 1 minutt. Ingen forpliktelser.</div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3 md:mt-8 md:gap-4">
                {[['24 timer', 'Normal levering'], ['Norsk først', 'Engelsk ved behov'], ['Klar til publisering', 'Ingen ekstra skriving']].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-amber-100 bg-white/85 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md">
                    <div className="text-base font-semibold text-slate-950">{title}</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600">{text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative fade-up delay-1">
              <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-amber-200/40 blur-3xl" />
              <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-slate-300/50 blur-3xl" />
              <div className="relative rounded-[1.6rem] border border-white/70 bg-white/88 p-4 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl md:rounded-[2rem] md:p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div><div className="text-sm font-semibold text-slate-900">Eksempel på leveranse</div><div className="text-sm text-slate-500">Fra enkel info til publiseringsklart innlegg</div></div>
                  <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">Før → Etter</div>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                    <div className="text-sm font-medium text-slate-500">Det dere sender</div>
                    <div className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                      <p><span className="font-semibold">Type:</span> Gudstjeneste</p><p><span className="font-semibold">Dato:</span> Søndag 12. mai kl. 11:00</p><p><span className="font-semibold">Tema:</span> Håp i krevende tider</p><p><span className="font-semibold">Detaljer:</span> Lovsang, bønn og tale ved Pastor Anna</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-950 p-5 text-white shadow-inner">
                    <div className="text-sm font-medium text-amber-100/80">Det dere får tilbake</div>
                    <div className="mt-4 space-y-4 text-sm leading-7 text-slate-100"><p>Velkommen til gudstjeneste denne søndagen.</p><p>Bli med på en varm samling med lovsang, bønn og en oppmuntrende tale om håp i krevende tider ved Pastor Anna.</p><p>Alle er hjertelig velkommen.</p></div>
                  </div>
                  <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4 text-sm leading-6 text-slate-700 shadow-sm">Enklere kommunikasjon for menigheten — uten at noen må bruke tid på å finne ordene i siste liten.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-amber-100 bg-white/75 backdrop-blur">
          <div className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-20">
            <div className="grid gap-8 md:gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
              <div><div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Utfordringen</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:mt-5 md:text-5xl">Viktig å poste. Lett å utsette.</h2></div>
              <div className="max-w-2xl pt-1"><p className="text-lg leading-7 text-slate-500 md:text-2xl md:leading-9">Sosiale medier betyr noe — men blir ofte nedprioritert i en travel uke.</p><ul className="mt-5 space-y-2 text-base leading-7 text-slate-600 md:mt-6 md:space-y-3 md:text-xl md:leading-9"><li>– Gudstjenester skal deles.</li><li>– Arrangementer skal kommuniseres.</li><li>– Annonseringer skal være tydelige.</li></ul><p className="mt-5 text-base leading-7 text-slate-600 md:mt-6 md:text-xl md:leading-9">Men selve skrivingen blir ofte utsatt. Ikke fordi det er uviktig, men fordi det alltid finnes noe annet som haster mer.</p></div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-20">
          <div className="grid gap-8 md:gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end"><div><div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Slik fungerer det</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:mt-5 md:text-5xl">En enkel tjeneste som sparer tid hver uke.</h2></div><p className="max-w-2xl text-lg leading-7 text-slate-500 md:text-2xl md:leading-9">Ingen komplisert plattform. Bare en tydelig og praktisk arbeidsflyt.</p></div>
          <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
            {steps.map((step) => (<div key={step.number} className="group rounded-[1.5rem] border border-amber-100 bg-white/80 p-5 shadow-sm backdrop-blur-lg transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)] md:rounded-[1.75rem] md:p-6"><div className="flex items-center justify-between"><div className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">{step.number}</div><IconCircle>{step.symbol}</IconCircle></div><h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">{step.title}</h3><p className="mt-3 text-base leading-7 text-slate-600">{step.text}</p></div>))}
          </div>
        </section>

        <section id="benefits" className="border-y border-amber-100 bg-gradient-to-b from-amber-50/40 to-white">
          <div className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-20">
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end"><div><div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Hva dere får</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:mt-5 md:text-5xl">Klar kommunikasjon uten ekstra arbeid.</h2></div><p className="max-w-2xl text-lg leading-7 text-slate-500 md:text-2xl md:leading-9">Alt er laget for å være lett å bruke, lett å forstå og lett å publisere.</p></div>
            <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 lg:grid-cols-3">{benefits.map((item) => (<div key={item.text} className="flex items-start gap-4 rounded-2xl border border-amber-100 bg-white/80 px-5 py-5 text-base text-slate-700 shadow-sm backdrop-blur-lg transition hover:-translate-y-1 hover:shadow-md"><IconCircle>{item.symbol}</IconCircle><div className="pt-2 font-medium">{item.text}</div></div>))}</div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-16"><div className="grid gap-4 md:grid-cols-3">{trustItems.map((item) => (<div key={item} className="rounded-2xl border border-amber-100 bg-white/85 px-5 py-5 text-center font-medium text-slate-800 shadow-sm backdrop-blur">{item}</div>))}</div></section>

        <section id="pricing" className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-20">
          <div className="max-w-3xl"><div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Priser</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:mt-5 md:text-5xl">Fast månedlig pris. Enkel å forstå.</h2><p className="mt-4 text-lg leading-7 text-slate-500 md:mt-5 md:text-2xl md:leading-9">Bygget for små og mellomstore kirker som ønsker jevn kommunikasjon uten å ansette noen til å gjøre det.</p><p className="mt-5 text-base leading-7 text-slate-600 md:mt-6 md:text-xl md:leading-9">Alle planer inkluderer klare og publiseringsklare tekster. Dere slipper å bruke tid på formuleringer, og kan fokusere på det som faktisk skjer i menigheten.</p></div>
          <div className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-3 lg:gap-6">
            {plans.map((plan) => (<div key={plan.name} className={`relative rounded-[1.6rem] border p-6 shadow-sm transition hover:-translate-y-1 md:rounded-[2rem] md:p-7 ${plan.featured ? 'border-slate-900 bg-slate-950 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)]' : 'border-amber-100 bg-white/92 text-slate-900 backdrop-blur hover:shadow-md'}`}>{plan.featured && (<div className="absolute right-6 top-6 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 shadow-sm">Mest verdi</div>)}<div className="pr-20 md:pr-24"><h3 className="text-2xl font-semibold tracking-tight">{plan.name}</h3><p className={`mt-2 text-sm leading-6 ${plan.featured ? 'text-amber-50/80' : 'text-slate-600'}`}>{plan.description}</p></div><div className="mt-7 text-3xl font-semibold tracking-tight md:mt-8">{plan.price}</div><ul className="mt-7 space-y-3 md:mt-8">{plan.features.map((feature) => (<li key={feature} className={`flex items-start gap-3 text-sm leading-6 ${plan.featured ? 'text-slate-100' : 'text-slate-700'}`}><span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${plan.featured ? 'bg-amber-50 text-amber-800' : 'bg-amber-50 text-amber-700'}`} aria-hidden="true">✓</span><span>{feature}</span></li>))}</ul><button type="button" onClick={() => choosePlan(plan.name)} className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-medium transition hover:-translate-y-0.5 md:mt-8 ${plan.featured ? 'bg-amber-50 text-amber-950 hover:bg-amber-50' : 'bg-amber-700 text-white hover:bg-amber-800'}`}>Velg {plan.name}<span aria-hidden="true">→</span></button></div>))}
          </div>
          <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50/70 px-5 py-4 text-sm leading-6 text-slate-700 backdrop-blur">Når du velger en plan, blir valget synlig i kontaktdelen nederst på siden. Få første eksempel gratis. Ingen binding før dere ønsker å starte.</div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-8 md:px-6"><div className="rounded-[1.6rem] bg-slate-950 px-6 py-10 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] md:rounded-[2rem] md:px-12 md:py-14"><div className="max-w-3xl"><div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-100/70">Hvorfor dette fungerer</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:mt-5 md:text-5xl">Mindre stress. Bedre kommunikasjon. Mer konsekvent synlighet.</h2><p className="mt-4 text-base leading-7 text-amber-50/70 md:text-xl md:leading-9">En liten tjeneste som gjør en stor forskjell i en travel uke.</p><p className="mt-5 text-base leading-7 text-slate-300 md:mt-6 md:text-xl md:leading-9">Dette handler ikke bare om tekst. Det handler om å gjøre det enkelt for kirken å dele det som skjer, uten at noen må sitte og finne ord i siste liten.</p></div></div></section>

        <section id="faq" className="mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-20">
          <div className="rounded-[2rem] border border-amber-100 bg-white/80 p-6 shadow-sm backdrop-blur-lg md:p-10"><div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start"><div><div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Spørsmål</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">Enkelt å teste. Enkelt å fortsette.</h2><p className="mt-5 text-base leading-7 text-slate-600 md:text-xl md:leading-9">Alt er laget for å være trygt, enkelt og forutsigbart.</p><div className="mt-6 space-y-2 text-sm text-slate-500"><div>• Ingen binding</div><div>• Gratis første eksempel</div><div>• Rask levering</div></div></div><div className="divide-y divide-amber-100">{faqs.map((item, index) => (<div key={item.question} className="py-5 first:pt-0 last:pb-0"><div className="flex items-start gap-4"><div className="mt-1"><span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-sm font-semibold text-amber-700">{index + 1}</span></div><div><h3 className="text-lg font-semibold tracking-tight text-slate-950">{item.question}</h3><p className="mt-2 text-base leading-7 text-slate-600">{item.answer}</p></div></div></div>))}</div></div></div>
        </section>

        <section id="contact" className="mx-auto max-w-4xl px-5 py-12 md:px-6 md:py-20">
          <div className="rounded-[1.6rem] border border-white/70 bg-white/80 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-lg md:rounded-[2rem] md:p-12"><div className="max-w-2xl"><div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Kontakt</div><h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:mt-5 md:text-5xl">Få et gratis eksempel på deres neste innlegg.</h2><p className="mt-4 text-lg leading-7 text-slate-500 md:mt-5 md:text-2xl md:leading-9">En enkel gratis test gjør det lettere å se verdien med en gang.</p><p className="mt-5 text-base leading-7 text-slate-600 md:mt-6 md:text-xl md:leading-9">Send ett kommende arrangement via Google Form, så viser vi hvordan et ferdig innlegg kan se ut. Dette er den enkleste måten å teste tjenesten på.</p></div>{selectedPlan && (<div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950"><span className="font-semibold">Valgt plan:</span> {selectedPlan}. Neste steg: send inn informasjon via Google Form.</div>)}<div className="mt-8 grid gap-4 md:mt-10"><a href={openFormUrl} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-2xl bg-amber-700 px-6 py-5 text-left font-medium text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-amber-800"><span className="flex items-center gap-3"><IconCircle dark>F</IconCircle><span>Åpne Google Form</span></span><span className="text-sm text-white transition group-hover:translate-x-0.5" aria-hidden="true">→</span></a></div><div className="mt-5 text-sm leading-6 text-slate-500">Tar ca. 1 minutt. Ingen forpliktelser. Første eksempel er gratis.</div></div>
        </section>
      </main>

      <footer className="border-t border-amber-100 bg-[#fffdf8]/80 px-5 py-10 md:px-6"><div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between"><div><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-base font-semibold text-amber-700 shadow-sm">K</div><div><div className="font-semibold tracking-tight text-slate-950">Kirkeinnhold</div><div className="text-sm text-slate-500">Ferdige innlegg for sosiale medier</div></div></div></div><div className="text-sm leading-6 text-slate-500 md:text-right"><div>© {new Date().getFullYear()} Kirkeinnhold</div><div>Gratis prøve først. Ingen binding.</div></div></div></footer>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-amber-100 bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden"><a href={openFormUrl} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-700 px-5 py-4 text-center text-base font-medium text-white">Start gratis prøve <span aria-hidden="true">→</span></a><div className="mt-2 text-center text-xs text-slate-500">Tar ca. 1 minutt. Ingen forpliktelser.</div></div>
    </div>
  );
}
