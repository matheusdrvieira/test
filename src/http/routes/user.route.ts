import Elysia from "elysia";
import { meController } from "../controllers/user.controller";

export const routes = new Elysia()
    .use(meController);