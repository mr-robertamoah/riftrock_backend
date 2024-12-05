/*
  Warnings:

  - You are about to drop the column `morphId` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `morphType` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `file` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `file` DROP FOREIGN KEY `File_Product_Relation`;

-- DropForeignKey
ALTER TABLE `file` DROP FOREIGN KEY `File_Service_Relation`;

-- DropIndex
DROP INDEX `File_morphId_morphType_idx` ON `file`;

-- AlterTable
ALTER TABLE `file` DROP COLUMN `morphId`,
    DROP COLUMN `morphType`,
    DROP COLUMN `updatedAt`;

-- CreateTable
CREATE TABLE `ServiceFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceId` INTEGER NOT NULL,
    `fileId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `fileId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServiceFile` ADD CONSTRAINT `ServiceFile_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceFile` ADD CONSTRAINT `ServiceFile_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductFile` ADD CONSTRAINT `ProductFile_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductFile` ADD CONSTRAINT `ProductFile_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `File`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
