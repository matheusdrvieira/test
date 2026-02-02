import "dotenv/config";
import { createRemoteJWKSet, jwtVerify } from "jose";

export interface AuthPayload {
    sub: string;
    email?: string;
    name?: string;
    iss: string;
    aud: string;
    iat: number;
    exp: number;
}

const jwks = createRemoteJWKSet(new URL(process.env.BETTER_AUTH_JWKS_URL!));

export async function jwtGuard(ctx: any) {
    const auth = ctx.request.headers.get("authorization");

    if (!auth?.startsWith("Bearer ")) {
        ctx.set.status = 401;
        throw new Error("Missing bearer token");
    }

    const token = auth.slice("Bearer ".length).trim();

    const { payload } = await jwtVerify(token, jwks, {
        issuer: process.env.BETTER_AUTH_ISSUER,
        audience: process.env.BETTER_AUTH_AUDIENCE,
    });

    ctx.user = payload as AuthPayload;
}