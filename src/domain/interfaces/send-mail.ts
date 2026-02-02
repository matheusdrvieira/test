import { SendMailEnum } from "../enum/send-mail";

export interface EmailTemplate {
    subject: string;
    generateHTML: (input: SendMailProps) => string | Promise<string>;
}

export interface SendMailProps {
    email: string;
    name: string;
    type: SendMailEnum;
    url?: string;
}
