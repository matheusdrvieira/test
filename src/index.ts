import "dotenv/config";

import { openapiPlugin } from '@/shared/docs/openapi';
import { auth } from '@/shared/lib/auth';
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from 'elysia';
import { routes } from "./modules/index.route";

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
  .use(routes)
  .get('/health', () => ({ ok: true }))
  .listen({
    port: Number(process.env.PORT),
    hostname: "0.0.0.0",
  }, () => console.info(`Auth up on :${process.env.PORT}`))
