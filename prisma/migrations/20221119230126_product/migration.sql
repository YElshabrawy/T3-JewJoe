/*
  Warnings:

  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cart_item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_line` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shop_order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_user_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_product_id_fkey";

-- DropForeignKey
ALTER TABLE "order_line" DROP CONSTRAINT "order_line_order_id_fkey";

-- DropForeignKey
ALTER TABLE "order_line" DROP CONSTRAINT "order_line_product_item_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_product_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_user_id_fkey";

-- DropForeignKey
ALTER TABLE "shop_order" DROP CONSTRAINT "shop_order_order_status_fkey";

-- DropForeignKey
ALTER TABLE "shop_order" DROP CONSTRAINT "shop_order_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "shop_order" DROP CONSTRAINT "shop_order_shipping_address_id_fkey";

-- DropForeignKey
ALTER TABLE "shop_order" DROP CONSTRAINT "shop_order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_address" DROP CONSTRAINT "user_address_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_payment" DROP CONSTRAINT "user_payment_payment_type_fkey";

-- DropForeignKey
ALTER TABLE "user_payment" DROP CONSTRAINT "user_payment_user_id_fkey";

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "cart";

-- DropTable
DROP TABLE "cart_item";

-- DropTable
DROP TABLE "order_line";

-- DropTable
DROP TABLE "order_status";

-- DropTable
DROP TABLE "payment_type";

-- DropTable
DROP TABLE "product_inventory";

-- DropTable
DROP TABLE "review";

-- DropTable
DROP TABLE "shop_order";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "user_address";

-- DropTable
DROP TABLE "user_payment";
