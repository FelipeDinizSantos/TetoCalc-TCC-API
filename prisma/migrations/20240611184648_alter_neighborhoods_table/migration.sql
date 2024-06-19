/*
  Warnings:

  - You are about to drop the column `averageSquareMeterForApartments` on the `neighborhoods` table. All the data in the column will be lost.
  - You are about to drop the column `averageSquareMeterForOneStoryHouse` on the `neighborhoods` table. All the data in the column will be lost.
  - You are about to drop the column `averageSquareMeterForTownhouses` on the `neighborhoods` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `neighborhoods` DROP COLUMN `averageSquareMeterForApartments`,
    DROP COLUMN `averageSquareMeterForOneStoryHouse`,
    DROP COLUMN `averageSquareMeterForTownhouses`,
    ADD COLUMN `averageSquareMeterForApartmentsLocation` DECIMAL(9, 2) NULL,
    ADD COLUMN `averageSquareMeterForApartmentsSale` DECIMAL(9, 2) NULL,
    ADD COLUMN `averageSquareMeterForOneStoryHouseLocation` DECIMAL(9, 2) NULL,
    ADD COLUMN `averageSquareMeterForOneStoryHouseSale` DECIMAL(9, 2) NULL,
    ADD COLUMN `averageSquareMeterForTownhousesLocation` DECIMAL(9, 2) NULL,
    ADD COLUMN `averageSquareMeterForTownhousesSale` DECIMAL(9, 2) NULL;
