import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Elysia } from "elysia";

import { authGuard } from "../../plugins/auth";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export const listGatewaysController = new Elysia({ prefix: "/gateways" })
  .use(authGuard)
  .get("/list", async ({ user, set }) => {
    const userId = user?.sub;

    if (!userId) {
      set.status = 401;
      return { ok: false, error: "UNAUTHORIZED" };
    }

    const integrations = await prisma.integrations.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    console.log(integrations);

    return integrations ?? [];
  });
