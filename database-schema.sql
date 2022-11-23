-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.26 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for expense-manager
CREATE DATABASE IF NOT EXISTS `expense-manager` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `expense-manager`;

-- Dumping structure for table expense-manager.accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `accountId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`accountId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.accounts: ~0 rows (approximately)
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;

-- Dumping structure for table expense-manager.activities
CREATE TABLE IF NOT EXISTS `activities` (
  `activityId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `detail` varchar(500) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`activityId`),
  KEY `FK_activities_users` (`userId`),
  CONSTRAINT `FK_activities_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.activities: ~0 rows (approximately)
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;

-- Dumping structure for table expense-manager.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `belongsTo` enum('income','expense') NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.categories: ~0 rows (approximately)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Dumping structure for table expense-manager.expenses
CREATE TABLE IF NOT EXISTS `expenses` (
  `expenseId` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `accountId` int NOT NULL,
  `categoryId` int NOT NULL,
  `amount` decimal(13,0) NOT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`expenseId`) USING BTREE,
  KEY `FK_incomes_accounts` (`accountId`) USING BTREE,
  KEY `FK_incomes_categories` (`categoryId`) USING BTREE,
  CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`accountId`),
  CONSTRAINT `expenses_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- Dumping data for table expense-manager.expenses: ~0 rows (approximately)
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;

-- Dumping structure for table expense-manager.incomes
CREATE TABLE IF NOT EXISTS `incomes` (
  `incomeId` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `accountId` int NOT NULL,
  `categoryId` int NOT NULL,
  `amount` decimal(13,0) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`incomeId`),
  KEY `FK_incomes_accounts` (`accountId`),
  KEY `FK_incomes_categories` (`categoryId`),
  CONSTRAINT `FK_incomes_accounts` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`accountId`),
  CONSTRAINT `FK_incomes_categories` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.incomes: ~0 rows (approximately)
/*!40000 ALTER TABLE `incomes` DISABLE KEYS */;
/*!40000 ALTER TABLE `incomes` ENABLE KEYS */;

-- Dumping structure for table expense-manager.transfers
CREATE TABLE IF NOT EXISTS `transfers` (
  `transferId` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `fromAccountId` int NOT NULL,
  `toAccountId` int NOT NULL,
  `amount` decimal(13,0) NOT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transferId`) USING BTREE,
  UNIQUE KEY `fromAccountId_toAccountId` (`fromAccountId`,`toAccountId`),
  KEY `FK_incomes_accounts` (`fromAccountId`) USING BTREE,
  KEY `FK_transfers_accounts` (`toAccountId`),
  CONSTRAINT `FK_transfers_accounts` FOREIGN KEY (`toAccountId`) REFERENCES `accounts` (`accountId`),
  CONSTRAINT `transfers_ibfk_1` FOREIGN KEY (`fromAccountId`) REFERENCES `accounts` (`accountId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- Dumping data for table expense-manager.transfers: ~0 rows (approximately)
/*!40000 ALTER TABLE `transfers` DISABLE KEYS */;
/*!40000 ALTER TABLE `transfers` ENABLE KEYS */;

-- Dumping structure for table expense-manager.users
CREATE TABLE IF NOT EXISTS `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` char(60) NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `otp` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `token` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `currency` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Rs.',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.users: ~1 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`userId`, `name`, `email`, `password`, `isVerified`, `otp`, `token`, `currency`, `created`) VALUES
	(9, 'asdfasdf', 'babajani@baba.com', '$2a$10$q7IjyliA7b2aVRP/R8BGV.p0.hIg3lGBqtK3eMA4WPnsnSGqTyn/K', 0, NULL, 'd7ea653f117970549ce7b97c7ed71a7abf2c350dd67a5f7f4626f5c2df71', 'Rs.', '2022-11-23 15:48:28'),
	(10, 'Yousuf Iqbal', 'yousufiqbal@gmail.com', '$2a$10$xKWawC4VhthggOX0omAH.OmcKKAd1fKSVd7vNOGaecddTEVT7XUPO', 0, NULL, '1b628f00619dfe8dcb64d3fca0c657b156aee58e3f99e17629e1261df7dd', 'Rs.', '2022-11-23 15:49:48');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
