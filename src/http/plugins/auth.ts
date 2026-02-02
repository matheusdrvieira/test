import Elysia from "elysia";
import { AuthPayload, jwtGuard } from "../strategy/jwt.strategy";

export const authGuard = new Elysia()
    .decorate("user", null as AuthPayload | null)
    .onBeforeHandle({ as: "scoped" }, jwtGuard);
