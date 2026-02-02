# ---- Base com Bun ----
FROM oven/bun:1.3.6 AS base
WORKDIR /app

# ---- Instala deps ----
COPY package.json ./
COPY bun.lock* ./
RUN bun install --frozen-lockfile

# ---- Copia Prisma schema ----
COPY prisma ./prisma

# ---- Gera Prisma Client ----
RUN bunx prisma generate --schema=./prisma/schema.prisma

# ---- Copia código e builda ----
COPY . .
RUN bun build src/index.ts --target=bun --outdir dist

# ---- Runtime ----
FROM oven/bun:1.3.6
WORKDIR /app

ENV NODE_ENV=production

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/prisma.config.ts ./prisma.config.ts

EXPOSE 3000
CMD ["sh", "-lc", "bunx prisma migrate deploy --config=prisma.config.ts && bun dist/index.js"]
