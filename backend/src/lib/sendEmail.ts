import { transporter } from "../config/mailer.js";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export interface ISendEmailReturn {
  messageId: string;
  response: string;
}

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
  replyTo,
}: SendEmailOptions): Promise<ISendEmailReturn> => {
  const result = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html,
    ...(text ? { text } : {}),
    ...(replyTo ? { replyTo } : {}),
  });

  return {
    messageId: result.messageId,
    response: result.response,
  };
};
