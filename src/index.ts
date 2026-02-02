import "dotenv/config";

import { openapiPlugin } from '@/http/plugins/openapi';
import { auth } from '@/lib/auth';
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from 'elysia';
import { gatewaysRoutes } from './http/routes/gateways.route';
import { oauthRoutes } from './http/routes/oauth.route';
import { routes } from './http/routes/user.route';

new Elysia()
  .use(cors({
    origin: process.env.PUBLIC_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }))
  .use(openapiPlugin)
  .use(staticPlugin({
    assets: "src/assets",
    prefix: "/assets",
  }))
  .mount(auth.handler)
  .use(oauthRoutes)
  .use(gatewaysRoutes)
  .use(routes)
  .get('/health', () => ({ ok: true }))
  .listen(Number(process.env.PORT), () => console.info(`Auth up on :${process.env.PORT}`))
