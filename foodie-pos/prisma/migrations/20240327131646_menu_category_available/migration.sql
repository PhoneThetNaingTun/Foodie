/*
  Warnings:

  - You are about to drop the column `isAvalibel` on the `menuCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "menuCategory" DROP COLUMN "isAvalibel",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;
