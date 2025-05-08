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

INSERT INTO products(category_name) VALUES ('ACCESSORIES');

INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('Guitar strings premium', 'finest guitar strings ever',
'assets/images/products/placeholder.png', 20, 25.99, 2);

INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('Guitar strings value', 'best for your budget guaranteed!', 'assets/images/products/placeholder.png', 50, 15.99, 2);

INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('guitar strap', 'groovy strap', 'assets/images/products/placeholder.png', 10, 20.99, 2);

INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('picks', 'best variety of picks known', 'assets/images/products/placeholder.png', 12, 9.99, 2);

INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('tuner non-electronic', 'really long description really long description really long description really long description really long description really long description really long description', 'assets/images/products/placeholder.png', 7, 16.99, 2);

INSERT INTO product_category(category_name) VALUES ('BOOKS');

INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('guitar pro', 'best book for pros!', 'assets/images/products/placeholder.png', 10, 10.99, 3);
INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('guitar beginners', 'best book for beginners!', 'assets/images/products/placeholder.png', 11, 11.99, 3);
INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('guitar intermediate', 'best book for intermediates!', 'assets/images/products/placeholder.png', 12, 12.99, 3);
INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('piano pro', 'best book for pros!', 'assets/images/products/placeholder.png', 13, 13.99, 3);
INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('piano beginners', 'best book for beginners!', 'assets/images/products/placeholder.png', 14, 14.99, 3);
INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('piano intermediates!', 'best book for intermediates!', 'assets/images/products/placeholder.png', 15, 15.99, 3);
INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('music history', 'music history on every instrument ever', 'assets/images/products/placeholder.png', 16, 16.99, 3);
INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('the beatles', 'comprehensive and accurate', 'assets/images/products/placeholder.png', 17, 17.99, 3);
INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('about violins', 'violing facts so interesting!', 'assets/images/products/placeholder.png', 18, 18.99, 3);
INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('scales', 'scales you would never think of', 'assets/images/products/placeholder.png', 19, 19.99, 3);
INSERT INTO products (name, description, image_url, stock, price, category_id)
VALUES ('blues', 'in depth coverage of the blues', 'assets/images/products/placeholder.png', 20, 20.99, 3);