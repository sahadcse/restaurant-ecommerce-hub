/*
  Warnings:

  - A unique constraint covering the columns `[restaurant_page_url]` on the table `restaurants` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "restaurant_id" UUID;

-- AlterTable
ALTER TABLE "restaurants" ALTER COLUMN "product_count" SET DEFAULT 0,
ALTER COLUMN "sales_count" SET DEFAULT 0;

-- CreateIndex
CREATE INDEX "categories_restaurant_id_idx" ON "categories"("restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_restaurant_page_url_key" ON "restaurants"("restaurant_page_url");
