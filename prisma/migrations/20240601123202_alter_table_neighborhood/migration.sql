/*
  Warnings:

  - You are about to drop the column `accessibility_ranking` on the `neighborhoods` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood_ranking` on the `neighborhoods` table. All the data in the column will be lost.
  - You are about to drop the column `value_per_square_meter_rental` on the `neighborhoods` table. All the data in the column will be lost.
  - You are about to drop the column `value_per_square_meter_sale` on the `neighborhoods` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `neighborhoods` DROP COLUMN `accessibility_ranking`,
    DROP COLUMN `neighborhood_ranking`,
    DROP COLUMN `value_per_square_meter_rental`,
    DROP COLUMN `value_per_square_meter_sale`,
    ADD COLUMN `accessibility_ranking_id` VARCHAR(191) NULL,
    ADD COLUMN `neighborhood_ranking_id` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `AccessibilityRanking` (
    `id` VARCHAR(191) NOT NULL,
    `ranking` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NeighborhoodRanking` (
    `id` VARCHAR(191) NOT NULL,
    `ranking` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `neighborhoods` ADD CONSTRAINT `neighborhoods_neighborhood_ranking_id_fkey` FOREIGN KEY (`neighborhood_ranking_id`) REFERENCES `NeighborhoodRanking`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `neighborhoods` ADD CONSTRAINT `neighborhoods_accessibility_ranking_id_fkey` FOREIGN KEY (`accessibility_ranking_id`) REFERENCES `AccessibilityRanking`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
