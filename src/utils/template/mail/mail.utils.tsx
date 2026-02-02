import { SendMailEnum } from "@/domain/enum/send-mail";
import { EmailTemplate, SendMailProps } from "@/domain/interfaces/send-mail";
import { render } from "@react-email/render";
import MagicLinkEmail from "./screens/MagicLink";
import RegisterEmail from "./screens/Register";
import ResetPasswordEmail from "./screens/ResetPassword";
import VerifyEmail from "./screens/VerifyEmail";
import WelcomeEmail from "./screens/Welcome";

function baseVars(input: SendMailProps) {
    return {
        appName: process.env.APP_NAME!,
        name: input.name,
        url: input.url,
        logoUrl: "cid:logo",
        heroUrl: "cid:background",
        unsubscribeUrl: process.env.UNSUBSCRIBE_URL,
    };
}

export const emailTemplates: Record<SendMailEnum, EmailTemplate> = {
    [SendMailEnum.REGISTER]: {
        subject: "Ativação de Conta - Bem-vindo!",
        generateHTML: (input) => render(<RegisterEmail {...baseVars(input)} />),
    },
    [SendMailEnum.WELCOME]: {
        subject: "Boas-vindas ao Better Auth",
        generateHTML: (input) => render(<WelcomeEmail {...baseVars(input)} />),
    },
    [SendMailEnum.MAGIC_LINK]: {
        subject: "Seu magic link está pronto",
        generateHTML: (input) => render(<MagicLinkEmail {...baseVars(input)} />),
    },
    [SendMailEnum.RESET_PASSWORD]: {
        subject: "Redefinição de senha do Better Auth",
        generateHTML: (input) => render(<ResetPasswordEmail {...baseVars(input)} />),
    },
    [SendMailEnum.VERIFY_EMAIL]: {
        subject: "Confirme seu e-mail",
        generateHTML: (input) => render(<VerifyEmail {...baseVars(input)} />),
    },
};
