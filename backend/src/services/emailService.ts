import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    type: 'OAuth2',
    user: 'valerio_mena@hotmail.com',
    clientId: 'TU_CLIENT_ID',
    clientSecret: 'TU_CLIENT_SECRET',
    refreshToken: 'TU_REFRESH_TOKEN',
    accessToken: 'TU_ACCESS_TOKEN',
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: 'valerio_mena@hotmail.com',
      to,
      subject,
      text,
    });
    console.log('Correo enviado: %s', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
};
