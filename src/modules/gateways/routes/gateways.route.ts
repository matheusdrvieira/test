import Elysia from "elysia";
import { authMercadoPagoController } from "../controllers/mercadopago/authenticate.controller";
import { authStripeController } from "../controllers/stripe/authenticate.controller";

export const gatewaysRoutes = new Elysia()
    .use(authStripeController)
    .use(authMercadoPagoController);
