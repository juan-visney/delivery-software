create database delivery;

use delivery;

create table admin(
    idAdmin INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user VARCHAR(10) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    fullname VARCHAR(50) NOT NULL,
    mail VARCHAR(50) NOT NULL
);
ALTER TABLE admin AUTO_INCREMENT = 1000;

create table client(
    idClient INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user VARCHAR(10) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    fullname VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    mail VARCHAR(50) NOT NULL,
    phone INT(10) NOT NULL
);
ALTER TABLE client AUTO_INCREMENT = 10000;

create table business(
    idBusiness INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user VARCHAR(10) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    name VARCHAR(50) NOT NULL,
    owner VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    mail VARCHAR(50) NOT NULL,
    phone INT(10) NOT NULL
);
ALTER TABLE business AUTO_INCREMENT = 20000;

create table deliver(
    idDeliver INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user VARCHAR(10) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    fullname VARCHAR(50) NOT NULL,
    phone INT(10) NOT NULL,
    status VARCHAR(1) NOT NULL
);
ALTER TABLE deliver AUTO_INCREMENT = 30000;

create table product(
    idProduct INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idBusiness INT(10) NOT NULL,
    quantity INT(3) NOT NULL,
    price FLOAT(5) NOT NULL,
    description VARCHAR(500) NOT NULL,
    CONSTRAINT fk_business FOREIGN KEY (idBusiness) REFERENCES business(idBusiness)
);
ALTER TABLE product AUTO_INCREMENT = 100000;

create table sale(
    idSale INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idClient INT(10) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cost FLOAT(5) NOT NULL,
    CONSTRAINT fk_client FOREIGN KEY (idClient) REFERENCES client(idClient)
);
ALTER TABLE sale AUTO_INCREMENT = 200000;

create table detail(
    idDetail INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idProduct INT(10) NOT NULL,
    idSale INT(10) NOT NULL,
    lot INT(3) NOT NULL,
    CONSTRAINT fk_product FOREIGN KEY (idProduct) REFERENCES product(idProduct),
    CONSTRAINT fk_sale FOREIGN KEY (idSale) REFERENCES sale(idSale)
);
ALTER TABLE detail AUTO_INCREMENT = 1000000;

create table orden(
    idOrden INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idDeliver INT(10) NOT NULL,
    idSale INT(10) NOT NULL,
    status VARCHAR(1) NOT NULL,
    CONSTRAINT fk_deliver FOREIGN KEY (idDeliver) REFERENCES deliver(idDeliver),
    CONSTRAINT fk_orden FOREIGN KEY (idSale) REFERENCES sale(idSale)
);
ALTER TABLE orden AUTO_INCREMENT = 2000000;

create table request(
    idRequest INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    owner VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    mail VARCHAR(50) NOT NULL,
    phone INT(10) NOT NULL
);
ALTER TABLE request AUTO_INCREMENT = 3000000;