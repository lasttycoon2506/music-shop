-- -----------------------------------------------------
-- Schema music-shop-db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `music-shop-db`;

CREATE SCHEMA `music-shop-db`;
USE `music-shop-db` ;


-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`instruments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music-shop-db`.`instruments` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `price` DECIMAL(13,2) DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `stock` INT(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Add sample data
-- -----------------------------------------------------

INSERT INTO instruments (name, description, image_url, stock, price)
VALUES ('Gibson Guitar', 'Les Paul 1980 sunburst',
'assets/images/products/placeholder.png', 5, 1200.99);

INSERT INTO instruments (name, description, image_url, stock,
price)
VALUES ('Yamaha Piano', 'Electric', 'assets/images/products/placeholder.png', 15, 600.99);

INSERT INTO instruments (name, description, image_url, stock,
price)
VALUES ('Kawai Piano', 'Baby-grand', 'assets/images/products/placeholder.png', 3, 4000.99);

INSERT INTO instruments (name, description, image_url, stock,
price)
VALUES ('Fender', 'Strat', 'assets/images/products/placeholder.png', 12, 1100.99);

INSERT INTO instruments (name, description, image_url, stock,
price)
VALUES ('Pearl Drums', 'Full-set with cymbals', 'assets/images/products/placeholder.png', 7, 500.99);
