import Elysia from "elysia";
import { listGatewaysController } from "../controllers/list.controller";

export const integrationRoutes = new Elysia()
  .use(listGatewaysController);
