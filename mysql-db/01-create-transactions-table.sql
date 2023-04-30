USE DOCKERIZED;
CREATE TABLE transactions(
   id INT AUTO_INCREMENT,
   type_sale VARCHAR(1) NOT NULL,
   date_sale VARCHAR(25)  NOT NULL,
   product VARCHAR(30) NOT NULL,
   value_sale VARCHAR(10) NOT NULL,
   seller VARCHAR(20) NOT NULL,
   PRIMARY KEY(id)
);