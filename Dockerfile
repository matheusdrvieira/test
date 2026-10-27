FROM oven/bun:1.3.6 AS base
WORKDIR /app

COPY package.json ./
COPY bun.lock* ./
RUN bun install --frozen-lockfile

COPY prisma.config.ts ./prisma.config.ts
COPY prisma ./prisma
RUN bunx prisma generate --schema=./prisma/schema.prisma

COPY . .
RUN bun build src/index.ts --target=bun --outdir dist --sourcemap

FROM oven/bun:1.3.6
WORKDIR /app
ENV NODE_ENV=production

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/prisma.config.ts ./prisma.config.ts
COPY --from=base /app/src/assets ./src/assets

EXPOSE 3000
CMD ["sh", "-lc", "bunx prisma migrate deploy --schema=./prisma/schema.prisma && bun dist/index.js"]
