import { Elysia } from "elysia";
import { authGuard } from "../plugins/auth";

export const meController = new Elysia({ prefix: "/me" })
    .use(authGuard)
    .get("/", (ctx) => {
        return { ok: true, user: ctx.user };
    });
