import Elysia from "elysia";
import { authStripeController } from "../controllers/oauth/stripe/authenticate.controller";
export const oauthRoutes = new Elysia()
    .use(authStripeController);
