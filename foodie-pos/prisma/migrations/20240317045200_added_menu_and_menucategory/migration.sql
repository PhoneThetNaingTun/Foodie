-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL,
    "isArchive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menuMenuCategory" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "menuCategoryId" INTEGER NOT NULL,

    CONSTRAINT "menuMenuCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menuCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isAvalibel" BOOLEAN NOT NULL DEFAULT true,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL,
    "isArchive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "menuCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menuMenuCategory" ADD CONSTRAINT "menuMenuCategory_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menuMenuCategory" ADD CONSTRAINT "menuMenuCategory_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "menuCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
