-- DropForeignKey
ALTER TABLE `pricehistory` DROP FOREIGN KEY `PriceHistory_productId_fkey`;

-- AddForeignKey
ALTER TABLE `PriceHistory` ADD CONSTRAINT `PriceHistory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
