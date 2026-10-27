import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export type CreateIntegrationInput = {
  provider: string;
  accountId: string;
  userId: string;
  status: string;
  encrypted: Record<string, string>;
};

export class IntegrationService {
  async create(data: CreateIntegrationInput) {
    try {
      return await prisma.integrations.upsert({
        where: {
          provider_accountId_userId: {
            provider: data.provider,
            accountId: data.accountId,
            userId: data.userId,
          },
        },
        create: {
          provider: data.provider,
          accountId: data.accountId,
          userId: data.userId,
          status: data.status,
          encrypted: data.encrypted,
        },
        update: {
          status: data.status,
          encrypted: data.encrypted,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }

      throw new Error("Erro ao criar integração.");
    }
  }

  async list(userId: string) {
    try {
      return await prisma.integrations.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }

      throw new Error("Erro ao listar integrações.");
    }
  }
}
