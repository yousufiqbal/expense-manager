-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
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
  PRIMARY KEY (`accountId`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.accounts: ~2 rows (approximately)
INSERT INTO `accounts` (`accountId`, `name`, `created`) VALUES
	(1, 'Papa', '2022-11-23 12:21:41'),
	(3, 'Yousuf', '2022-11-23 12:23:18'),
	(4, 'Ayesha', '2022-11-24 04:04:14'),
	(5, 'Ayesha Yousuf 2', '2022-11-24 04:06:25');

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

-- Dumping structure for table expense-manager.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `belongsTo` enum('income','expense') NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`categoryId`),
  UNIQUE KEY `name_belongsTo` (`name`,`belongsTo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.categories: ~3 rows (approximately)
INSERT INTO `categories` (`categoryId`, `name`, `belongsTo`, `created`) VALUES
	(1, 'Transfers', 'income', '2022-11-23 12:17:35'),
	(2, 'Transfers', 'expense', '2022-11-23 12:17:43'),
	(3, 'Grocery2', 'expense', '2022-11-23 12:20:09'),
	(4, 'Salary', 'income', '2022-11-23 12:20:34'),
	(5, 'Restaurant', 'expense', '2022-11-24 02:44:20'),
	(6, 'Health is wealth', 'expense', '2022-11-24 02:45:37'),
	(7, 'Bonus', 'income', '2022-11-24 03:10:15');

-- Dumping structure for table expense-manager.expenses
CREATE TABLE IF NOT EXISTS `expenses` (
  `expenseId` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `accountId` int NOT NULL,
  `categoryId` int NOT NULL,
  `amount` decimal(13,0) NOT NULL DEFAULT '0',
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

-- Dumping structure for table expense-manager.incomes
CREATE TABLE IF NOT EXISTS `incomes` (
  `incomeId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `accountId` int NOT NULL,
  `categoryId` int NOT NULL,
  `amount` decimal(13,0) NOT NULL DEFAULT '0',
  `description` text,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`incomeId`),
  KEY `FK_incomes_accounts` (`accountId`),
  KEY `FK_incomes_categories` (`categoryId`),
  CONSTRAINT `FK_incomes_accounts` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`accountId`),
  CONSTRAINT `FK_incomes_categories` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.incomes: ~2 rows (approximately)
INSERT INTO `incomes` (`incomeId`, `title`, `date`, `time`, `accountId`, `categoryId`, `amount`, `description`, `created`) VALUES
	(1, 'Starting Balance', '2022-11-23', '17:21:00', 1, 1, 15000, NULL, '2022-11-23 12:21:41'),
	(3, 'Starting Balance', '2022-11-23', '17:23:00', 3, 1, 30000, NULL, '2022-11-23 12:23:18'),
	(4, 'Starting Balance', '2022-11-24', '09:04:00', 4, 1, 0, NULL, '2022-11-24 04:04:14'),
	(5, 'Starting Balance', '2022-11-24', '09:06:00', 5, 1, 0, NULL, '2022-11-24 04:06:25');

-- Dumping structure for table expense-manager.transfers
CREATE TABLE IF NOT EXISTS `transfers` (
  `transferId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `fromAccountId` int NOT NULL,
  `toAccountId` int NOT NULL,
  `amount` decimal(13,0) NOT NULL DEFAULT '0',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transferId`) USING BTREE,
  KEY `FK_transfers_accounts` (`fromAccountId`),
  KEY `FK_transfers_accounts_2` (`toAccountId`),
  CONSTRAINT `FK_transfers_accounts` FOREIGN KEY (`fromAccountId`) REFERENCES `accounts` (`accountId`),
  CONSTRAINT `FK_transfers_accounts_2` FOREIGN KEY (`toAccountId`) REFERENCES `accounts` (`accountId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- Dumping data for table expense-manager.transfers: ~0 rows (approximately)

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.users: ~1 rows (approximately)
INSERT INTO `users` (`userId`, `name`, `email`, `password`, `isVerified`, `otp`, `token`, `currency`, `created`) VALUES
	(11, 'Yousuf Iqbal Dadda 2', 'yousufiqbal@gmail.com', '$2a$10$W4XA3PWYwdeaWBKHOkokMODjRX0wd.zqMiUfZ8cX3W6lTQFEeNq4W', 1, NULL, '793d0863f835afa0a6eac3c6f3a786079fae63b55c997dc112e34a76d6ae', 'Rs.', '2022-11-23 11:47:10');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
