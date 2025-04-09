-- -----------------------------------------------------
-- Schema music-shop-db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `music-shop-db`;

CREATE SCHEMA `music-shop-db`;
USE `music-shop-db` ;

-- -----------------------------------------------------
-- Table `music-shop-db`.`product_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music-shop-db`.`product_category` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `music-shop-db`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music-shop-db`.`products` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `price` DECIMAL(13,2) DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `stock` INT(11) DEFAULT NULL,
  `category_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category` (`category_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
--sample data
-- -----------------------------------------------------

INSERT INTO product_category(category_name) VALUES ('INSTRUMENTS');

INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('Gibson Guitar', 'Les Paul 1980 sunburst',
'assets/images/products/placeholder.png', 5, 1200.99, 1);

INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('Yamaha Piano', 'Electric', 'assets/images/products/placeholder.png', 15, 600.99, 1);

INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('Kawai Piano', 'Baby-grand', 'assets/images/products/placeholder.png', 3, 4000.99, 1);

INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('Fender', 'Strat', 'assets/images/products/placeholder.png', 12, 1100.99, 1);

INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('Pearl Drums', 'Full-set with cymbals', 'assets/images/products/placeholder.png', 7, 500.99, 1);
