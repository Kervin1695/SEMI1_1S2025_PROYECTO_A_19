CREATE DATABASE DB_Proyecto_1;
USE DB_Proyecto_1;

CREATE TABLE IF NOT EXISTS `Usuarios` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    'photo' VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS 'Gastos' (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    'type' VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `date` DATE NOT NULL,
    'bill' VARCHAR(255),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `Usuarios`(`id`)
);