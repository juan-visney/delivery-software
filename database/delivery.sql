create database delivery;

use delivery;

create table usuario(
    idUser INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user VARCHAR(100) NOT NULL, --admin, empresa, cliente, repartidor
    pass VARCHAR(255) NOT NULL, --admin, empresa, cliente, repartidor
    name VARCHAR(100) NOT NULL, --admin, empresa, cliente, repartidor
    mail VARCHAR(50), --admin, empresa
    photo VARCHAR(200), --empresa, repartidor
    phone INT(12), --empresa, cliente, repartidor
    address VARCHAR(200), --cliente
    rol VARCHAR(100) NOT NULL --admin,empresa,cliente,repartidor
);
ALTER TABLE usuario AUTO_INCREMENT = 100;

create table producto(
    idProduct INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idBusiness INT(10) NOT NULL,
    quantity INT(3) NOT NULL,
    price FLOAT(5) NOT NULL,
    description VARCHAR(500) NOT NULL,
    CONSTRAINT fk_usuario1 FOREIGN KEY (idBusiness) REFERENCES usuario(idUser)
);
ALTER TABLE producto AUTO_INCREMENT = 100000;
ALTER TABLE producto ADD COLUMN name VARCHAR(100);
ALTER TABLE producto ADD COLUMN photo VARCHAR(200);

create table detalle(
    idDetail INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idProduct INT(10) NOT NULL,
    idSale INT(10) NOT NULL,
    lot INT(3) NOT NULL
);
ALTER TABLE detalle AUTO_INCREMENT = 1;
alter table detalle add CONSTRAINT fk_producto1 FOREIGN KEY (idProduct) REFERENCES producto(idProduct);

create table venta(
    idSale INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idClient INT(10) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cost FLOAT(5) NOT NULL,
    CONSTRAINT fk_usuario FOREIGN KEY (idClient) REFERENCES usuario(idUser)
);
ALTER TABLE venta ADD constraint fk_venta FOREIGN KEY (idSale) REFERENCES detalle(idSale);

create table pedido(
    idRequest INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    owner VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    mail VARCHAR(50) NOT NULL,
    phone INT(10) NOT NULL
);
ALTER TABLE pedido AUTO_INCREMENT = 3000000;


--falta
create table orden(
    idOrden INT(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idDeliver INT(10) NOT NULL,
    idSale INT(10) NOT NULL,
    status VARCHAR(1) NOT NULL,
    CONSTRAINT fk_repartidor FOREIGN KEY (idDeliver) REFERENCES repartidor(idDeliver),
    CONSTRAINT fk_orden FOREIGN KEY (idSale) REFERENCES venta(idSale)
);
ALTER TABLE orden AUTO_INCREMENT = 2000000;