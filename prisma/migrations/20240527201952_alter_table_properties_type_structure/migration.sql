/*
  Warnings:

  - The values [CONDOMINIO,EDIFICIO] on the enum `properties_type_structure` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `properties` MODIFY `type_structure` ENUM('COMERCIAL', 'RESIDENCIAL') NOT NULL DEFAULT 'RESIDENCIAL';
