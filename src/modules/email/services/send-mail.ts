import { SendMailProps } from "@/domain/interfaces/send-mail";
import { emailTemplates } from "@/shared/utils/template/mail/mail.utils";
import { readFileSync } from "node:fs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const buildAttachments = () => [
    {
        filename: "isotipo-analiseai.webp",
        content: readFileSync("./src/assets/isotipo-analiseai.webp").toString("base64"),
        contentId: "logo",
    },
    {
        filename: "illustration.webp",
        content: readFileSync("./src/assets/illustration.webp").toString("base64"),
        contentId: "background",
    },
];

export class SendMailService {
    async execute(input: SendMailProps): Promise<void> {
        const emailTemplate = emailTemplates[input.type];
        if (!emailTemplate) throw new Error(`Email template for type "${input.type}" not found`);

        const html = await emailTemplate.generateHTML(input);

        try {
            const { error } = await resend.emails.send({
                from: `${process.env.APP_NAME!} <${process.env.RESEND_FROM!}>`,
                to: [input.email],
                subject: emailTemplate.subject,
                html,
                attachments: buildAttachments(),
            });

            if (error) throw new Error(error.message);
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }

            throw new Error("Erro ao enviar e-mail.");
        }
    }
}
