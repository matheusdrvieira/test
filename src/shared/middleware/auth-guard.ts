import { auth } from "@/shared/lib/auth";
import { Elysia } from "elysia";

export const authGuard = () =>
    new Elysia({ name: "better-auth" })
        .mount(auth.handler)
        .macro({
            auth: {
                async resolve({ status, request: { headers } }) {
                    const s = await auth.api.getSession({ headers });

                    if (!s?.user) return status(401, { message: "Unauthorized" });

                    return {
                        user: s.user,
                        session: s.session,
                    };
                }
            }
        });
