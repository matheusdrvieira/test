import { IntegrationService } from "@/modules/integrations/services/integration.service";
import { authGuard } from "@/shared/middleware/auth-guard";
import { Elysia, t } from "elysia";
import { MercadoPagoService } from "../../services/mercadopago.service";

export const authMercadoPagoController = new Elysia({ prefix: "/oauth/mercadopago" })
  .use(authGuard())
  .get(
    "/start",
    async ({ user, redirect }) => {
      const { url } = await new MercadoPagoService().start(user.id);
      return redirect(url, 302);
    },
    { auth: true }
  )
  .get("/callback", async ({ query, redirect }) => {
    const data = await new MercadoPagoService().callback(query.code, query.state);

    await new IntegrationService().create({
      provider: "mercadopago",
      accountId: data.accountId,
      userId: data.userId,
      status: "connected",
      encrypted: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
        accountId: data.accountId
      },
    });

    return redirect(`${process.env.PUBLIC_URL}/gateways/list`);
  },
    {
      query: t.Object({
        code: t.String(),
        state: t.String(),
      }),
      auth: false,
    }
  );
