CREATE DATABASE IF NOT EXISTS practice;

USE practice;

CREATE TABLE IF NOT EXISTS profiles (
    id                  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name          VARCHAR(255) DEFAULT NULL,
    last_name           VARCHAR(255) DEFAULT NULL,
    email               VARCHAR(255) DEFAULT NULL,
    password            VARCHAR(255) DEFAULT NULL,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_EMAIL UNIQUE (email)
)