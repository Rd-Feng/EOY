-- Create all tables for Limbo app

CREATE DATABASE IF NOT EXISTS limbo_test;
use limbo_test;
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) NOT NULL,
  first_name VARCHAR(60) NOT NULL,
  last_name  VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  img_url VARCHAR(128),
  github VARCHAR(128),
  linkedin VARCHAR(128),
  twitter VARCHAR(128)
);
CREATE TABLE IF NOT EXISTS connections (
  id INT AUTO_INCREMENT,
  user_id VARCHAR(36) NOT NULL,
  f_id VARCHAR(36) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS bookmarks (
  id INT AUTO_INCREMENT,
  user_id VARCHAR(36) NOT NULL,
  item_id VARCHAR(256) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS items (
  id VARCHAR(36) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS comments (
  id VARCHAR(36) NOT NULL,
  text VARCHAR(512) NOT NULL,
  creator VARCHAR(36) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  likes INT DEFAULT 0,
  sub_count INT DEFAULT 0,
  item_id VARCHAR(36) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS subcomments (
  id VARCHAR(36) NOT NULL,
  text VARCHAR(512) NOT NULL,
  creator VARCHAR(36) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  likes INT DEFAULT 0,
  comment_id VARCHAR(36) NOT NULL,
  PRIMARY KEY (id)
);
-- TRIGGER CREATE UUID FOR COMMENTS TABLE
CREATE TRIGGER `comments_uuid`
BEFORE INSERT ON `comments` FOR EACH ROW
BEGIN
  IF new.id IS NULL THEN
    SET new.id = uuid();
  END IF;
END;;
-- TRIGGER CREATE UUID FOR SUBCOMMENTS TABLE
CREATE TRIGGER `subcomments_uuid`
BEFORE INSERT ON `subcomments` FOR EACH ROW
BEGIN 
  IF new.id IS NULL THEN
    SET new.id = uuid();
  END IF;
END;;

