import Elysia from "elysia";
import { authenticateRoutes } from "./auth/authenticate.controller";
import { gatewaysRoutes } from "./gateways/routes/gateways.route";
import { integrationRoutes } from "./integrations/routes/integrations.route";

export const routes = new Elysia()
    .use(authenticateRoutes)
    .use(gatewaysRoutes)
    .use(integrationRoutes);