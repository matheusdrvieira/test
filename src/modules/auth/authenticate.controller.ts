import { auth } from "@/shared/lib/auth";
import { authGuard } from "@/shared/middleware/auth-guard";
import { Elysia, t } from "elysia";

export const authenticateRoutes = new Elysia({ prefix: "/auth" })
    .use(authGuard())
    .post("/set-password",
        async ({ request, body }) => {
            const res = await auth.api.setPassword({
                body: { newPassword: body.newPassword },
                headers: request.headers,
            });

            return res;
        },
        {
            body: t.Object({
                newPassword: t.String({ minLength: 8 }),
            }),
            auth: true
        }
    );
