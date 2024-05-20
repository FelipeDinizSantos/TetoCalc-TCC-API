/*
  Warnings:

  - You are about to drop the column `value_per_square_meter` on the `neighborhoods` table. All the data in the column will be lost.
  - Added the required column `value_per_square_meter_rental` to the `neighborhoods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value_per_square_meter_sale` to the `neighborhoods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `neighborhoods` DROP COLUMN `value_per_square_meter`,
    ADD COLUMN `value_per_square_meter_rental` DECIMAL(8, 2) NOT NULL,
    ADD COLUMN `value_per_square_meter_sale` DECIMAL(8, 2) NOT NULL;
