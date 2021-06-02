/*
  Warnings:

  - You are about to drop the `_CategoryToCoffeeShop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToCoffeeShop" DROP CONSTRAINT "_CategoryToCoffeeShop_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToCoffeeShop" DROP CONSTRAINT "_CategoryToCoffeeShop_B_fkey";

-- DropTable
DROP TABLE "_CategoryToCoffeeShop";

-- CreateTable
CREATE TABLE "_CoffeeShopNCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoffeeShopNCategory_AB_unique" ON "_CoffeeShopNCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_CoffeeShopNCategory_B_index" ON "_CoffeeShopNCategory"("B");

-- AddForeignKey
ALTER TABLE "_CoffeeShopNCategory" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoffeeShopNCategory" ADD FOREIGN KEY ("B") REFERENCES "CoffeeShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
