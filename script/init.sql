CREATE DATABASE livrosdb;
USE livrosdb;

CREATE TABLE books (
  id VARCHAR(36) PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  file TEXT
);
