import { StripeService } from "@/modules/gateways/services/stripe.service";
import { IntegrationService } from "@/modules/integrations/services/integration.service";
import { authGuard } from "@/shared/middleware/auth-guard";
import { Elysia, t } from "elysia";

type StripeState = {
    userId: string;
    flow?: "onboarding" | "default";
}

export const authStripeController = new Elysia({ prefix: "/oauth/stripe", })
    .use(authGuard())
    .get("/start", async ({ user, query, redirect }) => {
        const { url } = await new StripeService().start(user.id, query.flow);

        return redirect(url, 302)
    }, {
        query: t.Object({
            flow: t.Optional(t.Union([t.Literal("onboarding"), t.Literal("default")])),
        }),
        auth: true
    })
    .get("/callback", async ({ query, redirect }) => {
        const data = await new StripeService().callback(query.code);
        const state = JSON.parse(query.state ?? "{}") as StripeState;
        const userId = state.userId;
        const flow = state.flow ?? "default";

        if (!userId) {
            return redirect(`${process.env.PUBLIC_URL}/gateways/list`);
        }

        const encrypted: Record<string, string> = {
            access_token: data.accessToken,
            refresh_token: data.refreshToken,
        }

        await new IntegrationService().create({
            provider: "stripe",
            accountId: data.accountId,
            userId: userId,
            status: "connected",
            encrypted: encrypted,
        });

        const path = flow === "onboarding"
            ? "/onboarding?flow=onboarding"
            : "/gateways/list";
        return redirect(`${process.env.PUBLIC_URL}${path}`);
    }, {
        query: t.Object({
            code: t.String(),
            state: t.Optional(t.String()),
        }),
        auth: false
    });
