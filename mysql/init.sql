CREATE DATABASE IF NOT EXISTS challenge;

USE challenge;

CREATE TABLE IF NOT EXISTS people (id int auto_increment, name varchar(255), PRIMARY KEY (id));

INSERT INTO people(name) VALUES('Hamzah');
INSERT INTO people(name) VALUES('Courtney');
INSERT INTO people(name) VALUES('Theo');
INSERT INTO people(name) VALUES('Eugene');
INSERT INTO people(name) VALUES('Victor');
INSERT INTO people(name) VALUES('Bruce');
INSERT INTO people(name) VALUES('Rafael');
INSERT INTO people(name) VALUES('Barnaby');