import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data = req.body;

    await resend.emails.send({
      from: 'Kirkeinnhold <onboarding@resend.dev>',
      to: process.env.LEAD_EMAIL,
      subject: 'Ny forespørsel fra nettsiden',
      html: `
        <h2>Ny innsending fra Kirkeinnhold</h2>
        <p><strong>Kirke / menighet:</strong> ${data.churchName}</p>
        <p><strong>Navn:</strong> ${data.contactName}</p>
        <p><strong>E-post:</strong> ${data.email}</p>
        <hr/>
        <p><strong>Tittel:</strong> ${data.title}</p>
        <p><strong>Dato og tidspunkt:</strong> ${data.dateTime}</p>
        <p><strong>Sted:</strong> ${data.place}</p>
        <hr/>
        <p><strong>Format:</strong> ${data.platforms}</p>
        <p><strong>Tone:</strong> ${data.tone}</p>
        <p><strong>Detaljer:</strong> ${data.details || 'Ikke oppgitt'}</p>
      `,
    });

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error sending email' });
  }
}
