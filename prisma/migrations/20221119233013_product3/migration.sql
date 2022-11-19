/*
  Warnings:

  - You are about to drop the column `images` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "images",
ADD COLUMN     "image" TEXT,
ALTER COLUMN "description" DROP NOT NULL;
