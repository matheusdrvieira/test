import { SendMailProps } from "@/domain/interfaces/send-mail";
import { emailTemplates } from "@/utils/template/mail/mail.utils";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Boolean(process.env.SMTP_SECURE),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export class SendMailService {
    async execute(input: SendMailProps): Promise<void> {
        const emailTemplate = emailTemplates[input.type];
        if (!emailTemplate) throw new Error(`Email template for type "${input.type}" not found`);

        const html = await emailTemplate.generateHTML(input);

        await transporter.sendMail({
            from: {
                name: process.env.APP_NAME!,
                address: process.env.SMTP_MAIL!,
            },
            to: input.email,
            subject: emailTemplate.subject,
            html,
            attachments: [
                { filename: "isotipo-analiseai.webp", path: "./src/assets/isotipo-analiseai.webp", cid: "logo" },
                { filename: "illustration.webp", path: "./src/assets/illustration.webp", cid: "background" },
            ],
        });
    }
}
