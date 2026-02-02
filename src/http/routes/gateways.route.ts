import Elysia from "elysia";

import { listGatewaysController } from "../controllers/gateways/list.controller";

export const gatewaysRoutes = new Elysia()
  .use(listGatewaysController);
