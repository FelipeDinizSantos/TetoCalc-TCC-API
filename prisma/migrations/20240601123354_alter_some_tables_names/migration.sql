/*
  Warnings:

  - You are about to drop the `AccessibilityRanking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NeighborhoodRanking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `neighborhoods` DROP FOREIGN KEY `neighborhoods_accessibility_ranking_id_fkey`;

-- DropForeignKey
ALTER TABLE `neighborhoods` DROP FOREIGN KEY `neighborhoods_neighborhood_ranking_id_fkey`;

-- DropTable
DROP TABLE `AccessibilityRanking`;

-- DropTable
DROP TABLE `NeighborhoodRanking`;

-- CreateTable
CREATE TABLE `accessibility_rankings` (
    `id` VARCHAR(191) NOT NULL,
    `ranking` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `neighborhood_rankings` (
    `id` VARCHAR(191) NOT NULL,
    `ranking` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `neighborhoods` ADD CONSTRAINT `neighborhoods_neighborhood_ranking_id_fkey` FOREIGN KEY (`neighborhood_ranking_id`) REFERENCES `neighborhood_rankings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `neighborhoods` ADD CONSTRAINT `neighborhoods_accessibility_ranking_id_fkey` FOREIGN KEY (`accessibility_ranking_id`) REFERENCES `accessibility_rankings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
