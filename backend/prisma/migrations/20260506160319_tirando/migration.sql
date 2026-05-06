/*
  Warnings:

  - You are about to drop the column `userId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_userId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `userId`;

-- DropTable
DROP TABLE `user`;
