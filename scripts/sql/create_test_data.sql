-- MySQL 5.7 data dump
-- Populates limbo_test databases

USE limbo_test;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
INSERT INTO `users` (id, first_name, last_name, email) VALUES ("114964471729942294128", "Ray", "Fang", "123@holbertonschool.com"), ("114964471729942294123", "Sulin", "Wu", "321@holbertonschool.com"), ("114964471729942294124", "Joan", "Hang", "213@holbertonschool.com");
UNLOCK TABLES;

--
-- Dumping data for table `connections`
--

LOCK TABLES `connections` WRITE;
INSERT INTO `connections` (user_id, f_id) VALUES ("114964471729942294128", "114964471729942294123"), ("114964471729942294128", "114964471729942294124"), ("114964471729942294123", "114964471729942294128"), ("114964471729942294123", "114964471729942294124"), ("114964471729942294124", "114964471729942294128"), ("114964471729942294124", "114964471729942294123");
UNLOCK TABLES;

--
-- Dumping data for table `bookmarks`
--

LOCK TABLES `bookmarks` WRITE;
INSERT INTO `bookmarks` (user_id, item_id) VALUES ("114964471729942294128", "123456"), ("114964471729942294128", "123457"), ("114964471729942294128", "123458"), ("114964471729942294128", "123459"), ("114964471729942294128", "123459"), ("114964471729942294128", "123460"), ("114964471729942294128", "123461"), ("114964471729942294128", "123462"), ("114964471729942294128", "123463"), ("114964471729942294123", "123459"), ("114964471729942294123", "123460"), ("114964471729942294123", "123461"), ("114964471729942294123", "123462"), ("114964471729942294123", "123463"), ("114964471729942294124", "123463");
UNLOCK TABLES;

--
-- Dumping data for table `items`
--

LOCK TABLE `items` WRITE;
INSERT INTO `items` (id) VALUES ("123456"), ("123457"), ("123458"), ("123459"), ("123460"), ("123461"), ("123462"), ("123463");
UNLOCK TABLES;

--
-- Dumping data for table `comments`
--

LOCK TABLE `comments` WRITE;
INSERT INTO `comments` (id, text, creator, item_id) VALUES ("1233", "Sample data", "114964471729942294123", "123456");
UNLOCK TABLES;

--
-- Dumping data for table `subcomments`
--

LOCK TABLE `subcomments` WRITE;
INSERT INTO `subcomments` (id, text, creator, comment_id) VALUES ("12333", "Sample sub comment", "114964471729942294128", "1233");
UNLOCK TABLES;
