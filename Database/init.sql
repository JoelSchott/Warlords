DROP DATABASE IF EXISTS warlords;
CREATE DATABASE warlords;
USE warlords;

CREATE TABLE Players (
    username VARCHAR(80) PRIMARY KEY,
    rating INTEGER NOT NULL,
    passwordHash CHAR(44) NOT NULL,
    passwordSalt CHAR(24) NOT NULL
);