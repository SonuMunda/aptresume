/*
  Warnings:

  - You are about to drop the column `userId` on the `Upload` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Upload" DROP CONSTRAINT "Upload_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Upload" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT;
