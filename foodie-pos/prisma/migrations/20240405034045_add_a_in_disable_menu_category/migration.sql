/*
  Warnings:

  - You are about to drop the `DisbleLocationMenuCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DisbleLocationMenuCategory" DROP CONSTRAINT "DisbleLocationMenuCategory_MenuCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "DisbleLocationMenuCategory" DROP CONSTRAINT "DisbleLocationMenuCategory_locationId_fkey";

-- DropTable
DROP TABLE "DisbleLocationMenuCategory";

-- CreateTable
CREATE TABLE "DisableLocationMenuCategory" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "MenuCategoryId" INTEGER NOT NULL,

    CONSTRAINT "DisableLocationMenuCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DisableLocationMenuCategory" ADD CONSTRAINT "DisableLocationMenuCategory_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisableLocationMenuCategory" ADD CONSTRAINT "DisableLocationMenuCategory_MenuCategoryId_fkey" FOREIGN KEY ("MenuCategoryId") REFERENCES "menuCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
