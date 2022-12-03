const db = require("./DBconnect")

db.query("DROP TABLE routes;", (err) => {
    if(err != null){
        console.log("Can't drop table routes because it doesn't exist!");
    }
    else{
        console.log("Dropped table routes!");
    }
});

db.query("CREATE TABLE routes (routeNo INT NOT NULL AUTO_INCREMENT,startingPortNo INT NULL,endingPortNo INT NULL,distance DOUBLE NULL,PRIMARY KEY (routeNo),FOREIGN KEY (startingPortNo) REFERENCES ports (portNo),FOREIGN KEY (endingPortNo) REFERENCES ports (portNo));", (err) => {
    if(err != null){
        console.log("Error creating routes table!" + err);
    }
    else{
        console.log("Succesfully created routes table!");
    }
});

db.query("DROP TABLE ports;", (err) => {
    if(err != null){
        console.log("Can't drop table ports because it doesn't exist!" );
    }
    else{
        console.log("Dropped table ports!" );
    }
});

db.query("CREATE TABLE ports (portNo INT NOT NULL AUTO_INCREMENT,region VARCHAR(100) NULL,portName VARCHAR(100) NULL,country VARCHAR(100) NULL,latitude DOUBLE NULL,longitude DOUBLE NULL,PRIMARY KEY (portNo));", (err) => {
    if(err != null){
        console.log("Error creating ports table!" + err);
    }
    else{
        console.log("Succesfully created ports table!");
    }
});

db.query("DROP TABLE clients;", (err) => {
    if(err != null){
        console.log("Can't drop table clients because it doesn't exist!");
    }
    else{
        console.log("Dropped table client!");
    }
});

db.query("CREATE TABLE clients (email VARCHAR(100) NOT NULL,name VARCHAR(100) NULL,phoneNo VARCHAR(20) NULL,PRIMARY KEY (email));", (err) => {
    if(err != null){
        console.log("Error creating clients table!" + err);
    }
    else{
        console.log("Succesfully created clients table!");
    }

});

db.query("DROP TABLE products;", (err) => {
    if(err != null){
        console.log("Can't drop table products because it doesn't exist!");
    }
    else{
        console.log("Dropped table products!");
    }
});

db.query("CREATE TABLE products (productID INT NOT NULL AUTO_INCREMENT,productName VARCHAR(100) DEFAULT NULL,price VARCHAR(45) DEFAULT NULL,weight VARCHAR(45) DEFAULT NULL,email VARCHAR(100) DEFAULT NULL,PRIMARY KEY (productID),FOREIGN KEY (email) REFERENCES clients (email));", (err) => {
    if(err != null){
        console.log("Error creating products table!");
    }
    else{
        console.log("Succesfully created products table!");
    }
});

db.query("DROP TABLE ships;", (err) => {
    if(err != null){
        console.log("Can't drop table ships because it doesn't exist!");
    }
    else{
        console.log("Dropped table ships!");
    }
});

db.query("CREATE TABLE ships (shipID INT NOT NULL AUTO_INCREMENT,shipName VARCHAR(100) NULL,maxCargoWeight VARCHAR(45) NULL,captain VARCHAR(100) NULL,routeNo INT NULL,maxRange VARCHAR(45) NULL,speed VARCHAR(45) NULL,PRIMARY KEY (shipID), FOREIGN KEY (routeNo) REFERENCES routes (routeNo));", (err) => {
    if(err != null){
        console.log("Error creating ships table!" + err);
    }
    else{
        console.log("Succesfully created ships table!");
    }
});

db.query("DROP TABLE shipments;", (err) => {
    if(err != null){
        console.log("Can't drop table shipments because it doesn't exist!");
    }
    else{
        console.log("Dropped table shipments!");
    }
});

db.query("CREATE TABLE shipments (shipmentNo INT NOT NULL AUTO_INCREMENT,routeNo INT NULL,shipmentFee VARCHAR(45) NULL,status VARCHAR(45) NULL,departureDate VARCHAR(45) NULL,shipID INT NULL,amountDue VARCHAR(45) NULL,email VARCHAR(100) NULL,PRIMARY KEY (shipmentNo),FOREIGN KEY (shipID) REFERENCES ships (shipID),FOREIGN KEY (routeNo) REFERENCES routes (routeNo),FOREIGN KEY (email) REFERENCES clients (email));", (err) => {
    if(err != null){
        console.log("Error creating shipments table!" + err);
    }
    else{
        console.log("Succesfully created shipments table!");
    }
});

db.query("DROP TABLE shipmentProductInfo;", (err) => {
    if(err != null){
        console.log("Can't drop table shipmentProductInfo because it doesn't exist!");
    }
    else{
        console.log("Dropped table shipmentProductInfo!");
    }
});

db.query("CREATE TABLE shipmentProductInfo (shipmentNo INT NOT NULL,productID INT NOT NULL,quantity INT NULL,PRIMARY KEY (shipmentNo, productID),FOREIGN KEY (shipmentNo) REFERENCES shipments (shipmentNo),FOREIGN KEY (productID) REFERENCES products (productID));", (err) => {
    if(err != null){
        console.log("Error creating shipmentProductInfo table!" + err);
    }
    else{
        console.log("Succesfully created shipmentProductsInfo table!");
    }
});

db.query("DROP TABLE shipmentDates;", (err) => {
    if(err != null){
        console.log("Can't drop table shipmentDates because it doesn't exist!");
    }
    else{
        console.log("Dropped table shipmentDates!");
    }
});

db.query("CREATE TABLE shipmentdates (routeNo INT NOT NULL,departureDate VARCHAR(45) NOT NULL,shipID INT NOT NULL,estArrivalDate VARCHAR(45) NULL,PRIMARY KEY (routeNo,departureDate,shipID),FOREIGN KEY (routeNo) REFERENCES routes (routeNo),FOREIGN KEY (shipID) REFERENCES ships (shipID));", (err) => {
    if(err != null){
        console.log("Error creating shipmentDates table!" + err);
    }
    else{
        console.log("Succesfully created shipmentDates table!");
    }
});









