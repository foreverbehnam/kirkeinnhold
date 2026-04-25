import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const data = req.body || {};

    if (!data.email || !data.churchName || !data.contactName || !data.title) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const result = await resend.emails.send({
      from: 'Kirkeinnhold <delivered@resend.dev>',
      to: 'helliobest@gmail.com',
      subject: `Ny forespørsel fra ${escapeHtml(data.churchName)}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#0f172a">
          <h2>Ny innsending fra Kirkeinnhold</h2>

          <p><strong>Kirke / menighet:</strong> ${escapeHtml(data.churchName)}</p>
          <p><strong>Navn:</strong> ${escapeHtml(data.contactName)}</p>
          <p><strong>E-post:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Valgt plan:</strong> ${escapeHtml(data.selectedPlan || 'Ikke valgt')}</p>

          <hr/>

          <p><strong>Tittel:</strong> ${escapeHtml(data.title)}</p>
          <p><strong>Dato og tidspunkt:</strong> ${escapeHtml(data.dateTime || 'Ikke oppgitt')}</p>
          <p><strong>Sted:</strong> ${escapeHtml(data.place || 'Ikke oppgitt')}</p>

          <hr/>

          <p><strong>Format:</strong> ${escapeHtml(data.platforms || 'Ikke oppgitt')}</p>
          <p><strong>Tone:</strong> ${escapeHtml(data.tone || 'Ikke oppgitt')}</p>
          <p><strong>Detaljer:</strong><br/>${escapeHtml(data.details || 'Ikke oppgitt').replaceAll('\\n', '<br/>')}</p>
        </div>
      `,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return res.status(500).json({ success: false, message: 'Email failed' });
    }

    return res.status(200).json({ success: true, message: 'Success' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ success: false, message: 'Error sending email' });
  }
}
