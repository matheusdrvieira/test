import { IntegrationService } from "@/modules/integrations/services/integration.service";
import { authGuard } from "@/shared/middleware/auth-guard";
import { Elysia } from "elysia";

export const listGatewaysController = new Elysia({ prefix: "/gateways" })
  .use(authGuard())
  .get("/list", async ({ user }) => {
    const integrations = await new IntegrationService().list(user.id);

    return integrations ?? [];
  }, { auth: true });
