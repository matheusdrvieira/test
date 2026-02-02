import { SendMailEnum } from "@/domain/enum/send-mail";
import { SendMailProps } from "@/domain/interfaces/send-mail";
import { SendMailService } from "@/http/services/send-mail";
import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { haveIBeenPwned, jwt, magicLink, openAPI, organization } from "better-auth/plugins";

import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export const auth = betterAuth({
    plugins: [
        openAPI(),
        organization(),
        jwt(),
        haveIBeenPwned({ customPasswordCompromisedMessage: "PASSWORD_NOT_SECURE" }),
        magicLink({
            sendMagicLink: async ({ email, url }) => {
                const input: SendMailProps = {
                    email: email,
                    name: email.split("@")[0],
                    type: SendMailEnum.MAGIC_LINK,
                    url: url
                }
                await new SendMailService().execute(input);
            }
        })
    ],
    database: prismaAdapter(prisma, {
        provider: "postgresql",
        usePlural: true,
    }),
    secret: process.env.SECRET,
    baseURL: process.env.API_URL,
    trustedOrigins: [process.env.PUBLIC_URL as string],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        password: {
            hash: (input) => Bun.password.hash(input),
            verify: ({ password, hash }) => Bun.password.verify(password, hash)
        },
        sendResetPassword: async ({ user: { email, name }, url, token }, request) => {
            const input: SendMailProps = {
                email: email,
                name: name,
                type: SendMailEnum.RESET_PASSWORD,
                url: url
            }
            await new SendMailService().execute(input);
        }
    },
    emailVerification: {
        sendVerificationEmail: async ({ user: { email, name }, url }) => {
            const input: SendMailProps = {
                email: email,
                name: name,
                type: SendMailEnum.VERIFY_EMAIL,
                url: url
            }
            await new SendMailService().execute(input);
        },
        afterEmailVerification: async ({ email, name }) => {
            const input: SendMailProps = {
                email: email,
                name: name,
                type: SendMailEnum.WELCOME
            }
            await new SendMailService().execute(input);
        },
        autoSignInAfterVerification: true,
    },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    }
});
