
import { useEffect, useState } from 'react';

const images = {
  place: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1400&auto=format&fit=crop',
  church: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098?q=80&w=1400&auto=format&fit=crop',
  gathering: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1400&auto=format&fit=crop',
  community: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop',
  writing: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1400&auto=format&fit=crop',
  workspace: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop',
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [form, setForm] = useState({
    churchName: '',
    contactName: '',
    email: '',
    title: '',
    dateTime: '',
    place: '',
    platforms: 'Begge',
    tone: 'Varm og inkluderende',
    details: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('kirkeinnhold-plan');
    if (saved) setSelectedPlan(saved);
  }, []);

  const update = (field, value) => {
    setSubmitMessage('');
    setForm((current) => ({ ...current, [field]: value }));
  };

  const choosePlan = (plan) => {
    setSelectedPlan(plan);
    localStorage.setItem('kirkeinnhold-plan', plan);
    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 80);
  };

  const canContinue = () => {
    if (formStep === 1) return form.churchName && form.contactName && form.email;
    if (formStep === 2) return form.title && form.dateTime && form.place;
    return true;
  };

  const next = () => {
    if (!canContinue()) {
      setSubmitMessage('Fyll ut de nødvendige feltene før du går videre.');
      return;
    }
    setSubmitMessage('');
    setFormStep((step) => Math.min(step + 1, 3));
  };

  const back = () => {
    setSubmitMessage('');
    setFormStep((step) => Math.max(step - 1, 1));
  };

  const submit = async (event) => {
    event.preventDefault();
    setSubmitStatus('loading');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, selectedPlan }),
      });

      if (!response.ok) throw new Error('Failed');

      setSubmitStatus('success');
      setSubmitMessage('Takk! Vi har mottatt informasjonen deres. Dere får et ferdig eksempel innen 24 timer.');
      setFormStep(1);
      setForm({
        churchName: '',
        contactName: '',
        email: '',
        title: '',
        dateTime: '',
        place: '',
        platforms: 'Begge',
        tone: 'Varm og inkluderende',
        details: '',
      });
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Noe gikk galt. Sjekk at e-postsystemet er konfigurert i Vercel, eller prøv igjen.');
    }
  };

  const plans = [
    {
      name: 'Start',
      price: '499 kr / mnd',
      text: 'For små kirker med noen få arrangementer i måneden.',
      image: images.workspace,
      features: ['Opptil 4 innlegg per måned', 'Levering innen 24 timer', 'Facebook + Instagram + kort versjon'],
    },
    {
      name: 'Standard',
      price: '990 kr / mnd',
      text: 'For kirker som ønsker jevn og trygg kommunikasjon hver uke.',
      image: images.church,
      featured: true,
      features: ['Opptil 12 innlegg per måned', 'Prioritert levering', 'Tilpasset tone for menigheten', 'Facebook + Instagram + kort versjon'],
    },
    {
      name: 'Pluss',
      price: '1790 kr / mnd',
      text: 'For aktive kirker med mange samlinger, kampanjer og arrangementer.',
      image: images.gathering,
      features: ['Ubegrensede forespørsler innen rimelig bruk', 'Ekstra variasjoner ved behov', 'Raskere levering når mulig', 'Prioritert støtte'],
    },
  ];

  return (
    <div className="site">
      <header className="header">
        <div className="headerInner">
          <a href="#" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="logo">K</span>
            <span>
              <strong>Kirkeinnhold</strong>
              <small>Ferdige innlegg for sosiale medier</small>
            </span>
          </a>

          <nav className="desktopNav">
            <a href="#how">Slik fungerer det</a>
            <a href="#benefits">Hva dere får</a>
            <a href="#pricing">Priser</a>
            <a href="#faq">Spørsmål</a>
            <a href="#contact">Kontakt</a>
          </nav>

          <a className="headerCta" href="#contact">Få gratis eksempel</a>

          <button className="menuButton" onClick={() => setMenuOpen((open) => !open)} aria-label="Meny">
            <span className={menuOpen ? 'bar open one' : 'bar one'} />
            <span className={menuOpen ? 'bar open two' : 'bar two'} />
            <span className={menuOpen ? 'bar open three' : 'bar three'} />
          </button>
        </div>

        {menuOpen && (
          <div className="mobileMenu">
            {[
              ['01', 'Slik fungerer det', '#how'],
              ['02', 'Hva dere får', '#benefits'],
              ['03', 'Priser', '#pricing'],
              ['04', 'Spørsmål', '#faq'],
              ['05', 'Kontakt', '#contact'],
            ].map(([num, label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                <span><b>{num}</b>{label}</span><em>→</em>
              </a>
            ))}
            <p>Knappen for gratis prøve ligger fast nederst på skjermen.</p>
          </div>
        )}
      </header>

      <main>
        <section className="hero section">
          <div className="heroText">
            <div className="eyebrow">✦ Sosiale medier for kirker i Norge</div>
            <h1>Du sender detaljene — vi skriver innleggene.</h1>
            <p>
              En enkel abonnementstjeneste for kirker som vil kommunisere tydelig på nett.
              Send informasjon om gudstjenester, arrangementer og annonseringer, og få ferdige innlegg
              for Facebook og Instagram innen 24 timer.
            </p>
            <p className="softText">Mindre tid brukt på formuleringer. Mer tid til mennesker, fellesskap og det som skjer i menigheten.</p>
            <div className="heroActions">
              <a href="#contact" className="primary">Få gratis eksempel på deres neste innlegg →</a>
              <a href="#pricing" className="secondary">Se priser</a>
            </div>
            <div className="trust">
              <span>✓ Gratis første eksempel</span>
              <span>✓ Ingen binding</span>
              <span>✓ Levering innen 24 timer</span>
            </div>
          </div>

          <div className="sampleCard">
            <div className="sampleTop">
              <div><strong>Eksempel på leveranse</strong><small>Fra enkel info til publiseringsklart innlegg</small></div>
              <span>Før → Etter</span>
            </div>
            <div className="beforeBox">
              <small>Det dere sender</small>
              <p><b>Type:</b> Gudstjeneste</p>
              <p><b>Dato:</b> Søndag 12. mai kl. 11:00</p>
              <p><b>Tema:</b> Håp i krevende tider</p>
            </div>
            <div className="afterBox">
              <small>Det dere får tilbake</small>
              <p>Velkommen til gudstjeneste denne søndagen.</p>
              <p>Bli med på en varm samling med lovsang, bønn og en oppmuntrende tale om håp i krevende tider.</p>
              <p>Alle er hjertelig velkommen.</p>
            </div>
          </div>
        </section>

        <section className="section workflowSection">
          <div className="sectionTitle split">
            <div>
              <span>I praksis</span>
              <h2>Fra enkel informasjon til ferdig innhold.</h2>
            </div>
            <p>Tjenesten skal være lett å forstå med én gang: dere sender detaljene, vi gjør det klart til publisering.</p>
          </div>

          <div className="workflow">
            <div className="sendCard">
              <span className="miniLabel">Det dere sender</span>
              <h3>En enkel beskjed</h3>
              <div className="previewLine"><b>Tittel:</b> Søndagsgudstjeneste</div>
              <div className="twoCols">
                <div className="previewLine"><b>Tid:</b> Søndag kl. 11:00</div>
                <div className="previewLine"><b>Sted:</b> Kirken deres</div>
              </div>
              <div className="previewLine warm"><b>Tema:</b> Håp i krevende tider</div>
            </div>

            <div className="outputCard">
              <span className="miniLabel">Ferdig output</span>
              <h3>Klart til publisering</h3>
              <div className="post">
                <div className="postHead">
                  <span>K</span>
                  <div><b>Kirken deres</b><small>Publisert nå</small></div>
                </div>
                <div className="postBody">
                  <b>Velkommen til gudstjeneste denne søndagen.</b>
                  <p>Bli med på en varm samling med lovsang, bønn og en oppmuntrende tale om håp i krevende tider.</p>
                  <p>Alle er hjertelig velkommen.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section problemSection">
          <div className="sectionTitle split">
            <div>
              <span>Utfordringen</span>
              <h2>Viktig å poste. Lett å utsette.</h2>
            </div>
            <p>Sosiale medier betyr noe — men blir ofte nedprioritert i en travel uke.</p>
          </div>

          <div className="problemGrid">
            <div className="bigImage">
              <img src={images.community} alt="Fellesskap" />
              <div>
                <b>Folk kommer lettere når de faktisk får vite hva som skjer.</b>
                <p>God kommunikasjon hjelper flere å føle seg invitert — før arrangementet skjer.</p>
              </div>
            </div>
            <div className="problemCards">
              {[
                [images.place, 'Gudstjenester må deles', 'Hvis informasjonen ikke deles tydelig, vet mange ikke at de kan komme.'],
                [images.gathering, 'Arrangementer trenger synlighet', 'Små og store samlinger trenger en enkel måte å nå ut på.'],
                [images.workspace, 'Budskap må føles varmt', 'Teksten bør være klar, inviterende og enkel å publisere.'],
              ].map(([img, title, text]) => (
                <div className="smallImageCard" key={title}>
                  <img src={img} alt={title} />
                  <div><b>{title}</b><p>{text}</p></div>
                </div>
              ))}
              <div className="quote">“Vi vet at vi burde poste — men det blir lett skjøvet til senere.”</div>
            </div>
          </div>
        </section>

        <section id="how" className="section">
          <div className="sectionTitle split">
            <div><span>Slik fungerer det</span><h2>En enkel tjeneste som sparer tid hver uke.</h2></div>
            <p>Ingen komplisert plattform. Bare en tydelig og praktisk arbeidsflyt.</p>
          </div>
          <div className="steps">
            {[
              ['01', 'Send detaljene', 'Fyll ut tittel, dato, sted og noen linjer om arrangementet.'],
              ['02', 'Vi skriver innholdet', 'Vi gjør informasjonen om til varme og tydelige innlegg.'],
              ['03', 'Kopier og publiser', 'Dere får ferdige tekster til Facebook, Instagram og kort versjon.'],
            ].map(([num, title, text]) => (
              <div className="step" key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></div>
            ))}
          </div>
        </section>

        <section id="benefits" className="section benefitsSection">
          <div className="sectionTitle split">
            <div><span>Hva dere får</span><h2>Klar kommunikasjon uten ekstra arbeid.</h2></div>
            <p>Alt er laget for å være lett å bruke, lett å forstå og lett å publisere.</p>
          </div>
          <div className="benefits">
            {['Spar tid hver uke','Få jevnere kommunikasjon','Slipp stress rundt formuleringer','Tydelige og varme innlegg','Norsk først, engelsk ved behov','Klar levering innen 24 timer'].map((item, index) => (
              <div className="benefit" key={item}><b>{['↯','✓','✦','“”','NO','24'][index]}</b>{item}</div>
            ))}
          </div>
        </section>

        <section className="section testimonialSection">
          <div className="testimonial">
            <img src={images.community} alt="Fellesskap i menigheten" />
            <div>
              <span>Trygg test</span>
              <blockquote>“Vi brukte mye tid på å formulere innlegg før. Nå sender vi bare informasjon – og får ferdige tekster som faktisk treffer.”</blockquote>
              <p>– Frivillig, lokal menighet</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="section pricingSection">
          <div className="sectionTitle">
            <span>Priser</span>
            <h2>Fast månedlig pris. Enkel å forstå.</h2>
            <p>Bygget for små og mellomstore kirker som ønsker jevn kommunikasjon uten å ansette noen til å gjøre det.</p>
          </div>

          <div className="pricingGrid">
            {plans.map((plan) => (
              <div className={plan.featured ? 'plan featured' : 'plan'} key={plan.name}>
                {plan.featured && <div className="badge">Mest valgt</div>}
                <div className="planImage"><img src={plan.image} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} /></div>
                <div className="planBody">
                  <h3>{plan.name}</h3>
                  <p>{plan.text}</p>
                  <strong>{plan.price}</strong>
                  <ul>{plan.features.map((f) => <li key={f}>✓ {f}</li>)}</ul>
                  <button onClick={() => choosePlan(plan.name)}>Velg {plan.name} →</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section darkBlock">
          <div>
            <span>Hvorfor dette fungerer</span>
            <h2>Mindre stress. Bedre kommunikasjon. Mer konsekvent synlighet.</h2>
            <p>Dette handler ikke bare om tekst. Det handler om å gjøre det enklere å være kirke — også digitalt. Dere får mer ro, tydeligere kommunikasjon og mer tid til mennesker.</p>
          </div>
        </section>

        <section id="faq" className="section faqSection">
          <div className="faqCard">
            <div>
              <span>Spørsmål</span>
              <h2>Enkelt å teste. Enkelt å fortsette.</h2>
              <p>Alt er laget for å være trygt, enkelt og forutsigbart.</p>
            </div>
            <div className="faqList">
              {[
                ['Må vi binde oss?', 'Nei. Dere kan sende inn ett arrangement og få et gratis eksempel først. Dere starter abonnement bare hvis dere ønsker å fortsette.'],
                ['Hvor raskt får vi innlegget?', 'Normalt leveres ferdige tekster innen 24 timer.'],
                ['Kan dere skrive på engelsk også?', 'Ja. Tjenesten er norsk først, men vi kan også lage engelske versjoner ved behov.'],
                ['Hvordan betaler vi?', 'I starten håndteres betaling enkelt via Vipps, faktura eller bankoverføring.'],
              ].map(([q, a], i) => (
                <div className="faqItem" key={q}><b>{i + 1}</b><div><strong>{q}</strong><p>{a}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contactSection">
          <div className="contactCard">
            <div className="contactText">
              <span>Kontakt</span>
              <h2>Få et gratis eksempel på deres neste innlegg.</h2>
              <p>Send inn ett arrangement – vi viser hvordan et ferdig innlegg kan se ut.</p>
              <p>Dette er den enkleste måten å se om tjenesten passer for deres kirke — uten binding, uten møte og uten komplisert oppsett.</p>
              {selectedPlan && <div className="selected"><b>Valgt plan:</b> {selectedPlan}. Neste steg: send inn informasjonen.</div>}
            </div>

            <form className="leadForm" onSubmit={submit}>
              <div className="formIntro">
                <span>Send inn arrangement</span>
                <h3>Vi trenger bare det viktigste.</h3>
                <p>Skriv kort. Det trenger ikke være perfekt — vi gjør teksten klar for publisering.</p>
              </div>

              <div className="progressMeta"><span>Steg {formStep} av 3</span><span>{formStep === 1 ? 'Kontakt' : formStep === 2 ? 'Arrangement' : 'Ønsker'}</span></div>
              <div className="progress"><div style={{ width: `${(formStep / 3) * 100}%` }} /></div>

              {formStep === 1 && (
                <div className="formPanel">
                  <StepTitle number="01" title="Kontakt" text="Slik vet vi hvem vi skal sende eksempelet til." />
                  <div className="formGrid">
                    <Field label="Kirke / menighet" required value={form.churchName} onChange={(v) => update('churchName', v)} placeholder="Eks. Betel kirke" />
                    <Field label="Navn" required value={form.contactName} onChange={(v) => update('contactName', v)} placeholder="Ditt navn" />
                  </div>
                  <Field label="E-post" type="email" required value={form.email} onChange={(v) => update('email', v)} placeholder="navn@kirke.no" />
                </div>
              )}

              {formStep === 2 && (
                <div className="formPanel">
                  <StepTitle number="02" title="Arrangement" text="Tittel, tid og sted er nok for å komme i gang." />
                  <Field label="Tittel på arrangement" required value={form.title} onChange={(v) => update('title', v)} placeholder="Søndagsgudstjeneste" />
                  <div className="formGrid">
                    <Field label="Dato og tidspunkt" required value={form.dateTime} onChange={(v) => update('dateTime', v)} placeholder="Søndag kl. 11:00" />
                    <Field label="Sted" required value={form.place} onChange={(v) => update('place', v)} placeholder="Kirken / menighetssalen" />
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="formPanel">
                  <StepTitle number="03" title="Ønsker" text="Velg format og tone. Vi tilpasser teksten etter dette." />
                  <div className="formGrid">
                    <label>Format<select value={form.platforms} onChange={(e) => update('platforms', e.target.value)}><option>Begge</option><option>Facebook</option><option>Instagram</option></select></label>
                    <label>Tone<select value={form.tone} onChange={(e) => update('tone', e.target.value)}><option>Varm og inkluderende</option><option>Informativ og tydelig</option><option>Kort og enkel</option></select></label>
                  </div>
                  <label>Detaljer <em>(valgfritt)</em><textarea rows="4" value={form.details} onChange={(e) => update('details', e.target.value)} placeholder="Eks. lovsang, bønn, tale ved Pastor Anna, tema eller praktisk informasjon." /><small>Du trenger ikke skrive perfekt. Stikkord er nok.</small></label>
                </div>
              )}

              <div className="formButtons">
                {formStep > 1 && <button type="button" className="backBtn" onClick={back}>Tilbake</button>}
                {formStep < 3 && <button type="button" className="nextBtn" onClick={next}>Neste →</button>}
                {formStep === 3 && <button type="submit" className="submitBtn" disabled={submitStatus === 'loading'}>{submitStatus === 'loading' ? 'Sender...' : 'Få gratis eksempel nå'} →</button>}
              </div>

              {submitMessage && <div className={submitStatus === 'success' ? 'message success' : 'message error'}>{submitMessage}</div>}
              <div className="formTrust"><span>✓ Gratis første eksempel</span><span>✓ Ingen binding</span><span>✓ Svar innen 24 timer</span></div>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="footerInner">
          <a href="#" className="brand"><span className="logo">K</span><span><strong>Kirkeinnhold</strong><small>Ferdige innlegg for sosiale medier</small></span></a>
          <p>© {new Date().getFullYear()} Kirkeinnhold<br />Gratis prøve først. Ingen binding.</p>
        </div>
      </footer>

      <div className="stickyCta"><a href="#contact">Få gratis eksempel nå →</a><small>Tar ca. 1 minutt. Ingen forpliktelser.</small></div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', required = false }) {
  return (
    <label>
      {label}
      <input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

function StepTitle({ number, title, text }) {
  return (
    <div className="stepTitle">
      <b>{number}</b>
      <div><strong>{title}</strong><small>{text}</small></div>
    </div>
  );
}
