-- CreateTable
CREATE TABLE "integrations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "encrypted" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "integrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "integrations_provider_idx" ON "integrations"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "integrations_provider_accountId_userId_key" ON "integrations"("provider", "accountId", "userId");

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
