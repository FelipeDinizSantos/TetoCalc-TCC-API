-- AlterTable
ALTER TABLE `neighborhoods` ADD COLUMN `averageSquareMeterForApartments` DECIMAL(9, 2) NULL,
    ADD COLUMN `averageSquareMeterForOneStoryHouse` DECIMAL(9, 2) NULL,
    ADD COLUMN `averageSquareMeterForTownhouses` DECIMAL(9, 2) NULL;
