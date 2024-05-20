-- CreateTable
CREATE TABLE `neighborhoods` (
    `id` VARCHAR(191) NOT NULL,
    `neighborhood_ranking` DOUBLE NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `accessibility_ranking` DOUBLE NOT NULL,
    `value_per_square_meter` DECIMAL(8, 2) NOT NULL,
    `additional_information` VARCHAR(191) NOT NULL,
    `city_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `citys` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `properties` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('VENDIDO', 'LOCADO', 'SUSPENSO', 'ATIVO') NOT NULL,
    `type` ENUM('SOBRADO', 'APARTAMENTO', 'CASA_TERREA', 'CASA_PADRAO') NOT NULL DEFAULT 'CASA_TERREA',
    `type_structure` ENUM('CONDOMINIO', 'EDIFICIO', 'RESIDENCIAL') NOT NULL,
    `negotiation` ENUM('VENDA', 'LOCACAO') NOT NULL,
    `value_per_square_meter` DECIMAL(8, 2) NOT NULL,
    `value` DECIMAL(9, 2) NOT NULL,
    `dormitories` INTEGER NOT NULL,
    `suites` INTEGER NULL,
    `bathrooms` INTEGER NOT NULL,
    `parking_spaces` INTEGER NULL,
    `total_area` DOUBLE NULL,
    `useful_area` DOUBLE NOT NULL,
    `building_area` DOUBLE NULL,
    `land_area` DOUBLE NULL,
    `neighborhood_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `neighborhoods` ADD CONSTRAINT `neighborhoods_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `citys`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_neighborhood_id_fkey` FOREIGN KEY (`neighborhood_id`) REFERENCES `neighborhoods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
