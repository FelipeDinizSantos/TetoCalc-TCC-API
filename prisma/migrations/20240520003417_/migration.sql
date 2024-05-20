/*
  Warnings:

  - Added the required column `updated_at` to the `citys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `neighborhoods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `citys` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `neighborhoods` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
