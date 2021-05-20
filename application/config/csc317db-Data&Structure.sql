-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` mediumtext NOT NULL,
  `fk_authorid` int unsigned NOT NULL,
  `fk_postid` int unsigned NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `key_tousertable` (`fk_authorid`),
  KEY `key_toposttable_idx` (`fk_postid`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (71,'So beatuiful!',12,29,'2021-05-19 15:02:50'),(72,'Fill the comment round 1',12,29,'2021-05-19 15:05:40'),(73,'Fill the comment round 2',12,29,'2021-05-19 15:05:43'),(74,'Fill the comment round 3',12,29,'2021-05-19 15:05:45'),(75,'Fill the comment round 4',12,29,'2021-05-19 15:05:48'),(76,'Fill the comment round 5',12,29,'2021-05-19 15:05:57'),(77,'Fill the comment round 6',12,29,'2021-05-19 15:06:00'),(78,'Fill the comment round 7',12,29,'2021-05-19 15:06:01'),(79,'Fill the comment round 8',12,29,'2021-05-19 15:06:08'),(80,'Fill the comment round 9',12,29,'2021-05-19 15:06:11'),(81,'Fill the comment round 10',12,29,'2021-05-19 15:06:16'),(82,'Fill the comment round 11',12,29,'2021-05-19 15:06:34'),(83,'Fill the comment round 12',12,29,'2021-05-19 15:06:37'),(84,'Fill the comment round 13',12,29,'2021-05-19 15:06:38'),(85,'Fill the comment round 14',12,29,'2021-05-19 15:06:40'),(86,'Fill the comment round 15',12,29,'2021-05-19 15:06:41');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `posts to usres_idx` (`fk_userid`),
  CONSTRAINT `posts to users` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (17,'Doggy','Isn\'t that hat so fit?','public\\images\\uploads\\06e95db894d7a74208a7f88cc26491aaea798bd6a130.jpeg','public/images/uploads/thumbnail-06e95db894d7a74208a7f88cc26491aaea798bd6a130.jpeg',0,'2021-05-19 13:59:35',7),(18,'Pangolin','Look at the skin!','public\\images\\uploads\\30ce23d5876ea7d3544400e54f6e788311626fdc5693.jpeg','public/images/uploads/thumbnail-30ce23d5876ea7d3544400e54f6e788311626fdc5693.jpeg',0,'2021-05-19 14:00:05',7),(19,'Laziest animal','He just wants to sleep!','public\\images\\uploads\\c9882f3d7b3d02a5288d80f3a13b19b0c1f28b8985e6.jpeg','public/images/uploads/thumbnail-c9882f3d7b3d02a5288d80f3a13b19b0c1f28b8985e6.jpeg',0,'2021-05-19 14:00:44',7),(20,'WILD!!!','Long cat?','public\\images\\uploads\\59ba47d2a554959e6e615e1701cfb642e6438139b6b7.jpeg','public/images/uploads/thumbnail-59ba47d2a554959e6e615e1701cfb642e6438139b6b7.jpeg',0,'2021-05-19 14:01:47',7),(21,'Fox?','Who can tell me what is her name?','public\\images\\uploads\\dcda8e96078976ff75ee4437fdcb1325a0ae01eb57a8.jpeg','public/images/uploads/thumbnail-dcda8e96078976ff75ee4437fdcb1325a0ae01eb57a8.jpeg',0,'2021-05-19 14:02:15',7),(22,'Racoooooon','Cutie!','public\\images\\uploads\\2dd9e0677446b2550751888d71de9f16c6761693a1f3.jpeg','public/images/uploads/thumbnail-2dd9e0677446b2550751888d71de9f16c6761693a1f3.jpeg',0,'2021-05-19 14:02:29',7),(23,'Monkey King','WoWoWooo','public\\images\\uploads\\8c59ced0162ba470f4d3b63a4fe34be0a5d5710ee17f.jpeg','public/images/uploads/thumbnail-8c59ced0162ba470f4d3b63a4fe34be0a5d5710ee17f.jpeg',0,'2021-05-19 14:02:51',7),(24,'My favorite animal','Meowwwwww','public\\images\\uploads\\abffb7d8a7ab89c8e5741db4d6d09fe0272fe606187b.jpeg','public/images/uploads/thumbnail-abffb7d8a7ab89c8e5741db4d6d09fe0272fe606187b.jpeg',0,'2021-05-19 14:03:08',7),(29,'Hybird animal','butterfly + elephant','public\\images\\uploads\\201eaca831ff7a56288364a2c80f70b57685a8a30235.jpeg','public/images/uploads/thumbnail-201eaca831ff7a56288364a2c80f70b57685a8a30235.jpeg',0,'2021-05-19 15:00:28',12);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `usertype` int NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,'test','test@mail.com','$2b$05$Bdu2Z4c36wEq0EXxukTheeAey2AgfpqQRsPmTEFJH9V2myCYdDdku',0,0,'2021-05-19 13:57:03'),(12,'sunny','sunny@mail.com','$2b$05$POuE3kMTfkmqt1RawFi32uUbU0lB9FDP3oQpLE34IxTlc81OUiwua',0,0,'2021-05-19 14:58:49');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-19 15:27:55
