'use server';

import transporter from '@/lib/nodemailerConfig';

interface EmailOptions {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const sendContactEmail = async ({
  name,
  email,
  subject,
  message,
}: EmailOptions) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: `New Query on Scruter: ${subject}`,
    text: `
      Hello Admin,

      A new query has been raised on Scruter. Here are the details:

      - Name: ${name}
      - Email: ${email}
      - Subject: ${subject}

      Message:
      ${message}

      Please review and respond as necessary.
    `,
    html: `
      <h2>Hello Admin,</h2>
      <p>A new query has been raised on <strong>Scruter</strong>. Here are the details:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Subject:</strong> ${subject}</li>
      </ul>
      <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
      <p>Please review and respond as necessary.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export default sendContactEmail;
