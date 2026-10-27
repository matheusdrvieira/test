import { openapi } from '@elysiajs/openapi';
import Elysia from "elysia";

export const openapiPlugin = new Elysia()
    .use(openapi({
        path: "/docs",
        exclude: {
            methods: ["OPTIONS"],
            paths: ["/", "/*"]
        },
        documentation: {
            info: {
                title: "Better Auth API",
                description: "Internal API",
                version: "1.0.0"
            },
        }
    }))