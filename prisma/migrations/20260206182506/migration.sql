-- AlterTable
ALTER TABLE "users" ADD COLUMN     "twoFactorEnabled" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "twoFactors" (
    "id" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "backupCodes" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "twoFactors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "twoFactors_secret_idx" ON "twoFactors"("secret");

-- CreateIndex
CREATE INDEX "twoFactors_userId_idx" ON "twoFactors"("userId");

-- AddForeignKey
ALTER TABLE "twoFactors" ADD CONSTRAINT "twoFactors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
