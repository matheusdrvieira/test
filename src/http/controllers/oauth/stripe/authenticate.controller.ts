import { authGuard } from "@/http/plugins/auth";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Elysia, t } from "elysia";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const SCOPES = "read_write";

export const authStripeController = new Elysia({ prefix: "/oauth/stripe", })
    .group("", (app) => app
        .use(authGuard)
        .get("/start", async ({ user }) => {
            const params = new URLSearchParams({
                response_type: "code",
                client_id: process.env.STRIPE_CLIENT_ID!,
                scope: SCOPES,
                redirect_uri: process.env.STRIPE_REDIRECT_URI!,
                state: JSON.stringify({ userId: user!.sub }),
            });

            return {
                url: `https://connect.stripe.com/oauth/authorize?${params.toString()}`,
                status: 303
            };
        })
    )
    .get("/callback", async ({ query, set, redirect }) => {
        const payload = new URLSearchParams({
            grant_type: "authorization_code",
            code: query.code,
            client_secret: process.env.STRIPE_CLIENT_SECRET!,
        });

        const response = await fetch("https://connect.stripe.com/oauth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: payload.toString(),
        });

        const data = await response.json();

        if (!response.ok) {
            set.status = response.status;
            return { ok: false, error: "STRIPE_TOKEN_ERROR", details: data };
        }

        const userId = JSON.parse(query.state!).userId;

        const encrypted: Record<string, string> = {
            access_token: data.access_token,
            refresh_token: data.refresh_token,
        }

        const integration = await prisma.integrations.upsert({
            where: {
                provider_accountId_userId: {
                    provider: "stripe",
                    accountId: data.stripe_user_id,
                    userId: userId,
                },
            },
            create: {
                provider: "stripe",
                accountId: data.stripe_user_id,
                userId: userId,
                status: "connected",
                encrypted: encrypted
            },
            update: {
                status: "connected",
                encrypted: encrypted
            },
        });

        return redirect(`${process.env.PUBLIC_URL}/gateways`);
    }, {
        query: t.Object({
            code: t.String(),
            state: t.Optional(t.String()),
        }),
    });
