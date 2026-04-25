<script>
let step = 1;
let selectedPlan = localStorage.getItem('kirkeinnhold-plan') || '';

const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');

menuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
  menuButton.querySelectorAll('.bar').forEach(b => b.classList.toggle('open'));
});

mobileMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('show');
    menuButton.querySelectorAll('.bar').forEach(b => b.classList.remove('open'));
  })
);

document.getElementById('year').textContent = new Date().getFullYear();

function showSelected() {
  const el = document.getElementById('selectedPlan');
  if (selectedPlan) {
    el.style.display = 'block';
    el.innerHTML = '<b>Valgt plan:</b> ' + selectedPlan;
  }
}
showSelected();

document.querySelectorAll('[data-plan]').forEach(btn =>
  btn.addEventListener('click', () => {
    selectedPlan = btn.dataset.plan;
    localStorage.setItem('kirkeinnhold-plan', selectedPlan);
    showSelected();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  })
);

function updateStep() {
  document.querySelectorAll('.formStep').forEach(s => {
    s.style.display = Number(s.dataset.step) === step ? 'block' : 'none';
  });

  document.getElementById('stepText').textContent = 'Steg ' + step + ' av 3';
  document.getElementById('stepName').textContent =
    step === 1 ? 'Kontakt' : step === 2 ? 'Arrangement' : 'Ønsker';

  document.getElementById('progressBar').style.width = (step / 3 * 100) + '%';

  document.getElementById('backBtn').style.display = step > 1 ? 'block' : 'none';
  document.getElementById('nextBtn').style.display = step < 3 ? 'block' : 'none';
  document.getElementById('submitBtn').style.display = step === 3 ? 'block' : 'none';
}

function validStep() {
  const panel = document.querySelector('.formStep[data-step="' + step + '"]');
  const fields = [...panel.querySelectorAll('input[required]')];
  return fields.every(f => f.checkValidity() && f.value.trim());
}

document.getElementById('nextBtn').addEventListener('click', () => {
  if (!validStep()) {
    message('Fyll ut alle feltene før du går videre.', 'error');
    return;
  }
  message('', null);
  step++;
  updateStep();
});

document.getElementById('backBtn').addEventListener('click', () => {
  message('', null);
  step--;
  updateStep();
});

function message(text, type) {
  const el = document.getElementById('formMessage');
  if (!text) {
    el.innerHTML = '';
    return;
  }
  el.className = 'message ' + type;
  el.textContent = text;
}

document.getElementById('leadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = 'Sender...';

  const data = Object.fromEntries(new FormData(e.currentTarget).entries());
  data.selectedPlan = selectedPlan;

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      message('Takk! Vi har mottatt informasjonen deres. Du får svar innen 24 timer.', 'success');
      e.currentTarget.reset();
      step = 1;
      updateStep();
    } else {
      throw new Error();
    }

  } catch (err) {
    message('Noe gikk galt. Prøv igjen.', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Få gratis eksempel nå →';
  }
});

updateStep();
</script>
