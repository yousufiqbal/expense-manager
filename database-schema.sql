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
  PRIMARY KEY (`accountId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.accounts: ~0 rows (approximately)

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
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.categories: ~0 rows (approximately)

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

-- Dumping structure for table expense-manager.users
CREATE TABLE IF NOT EXISTS `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `subId` int NOT NULL,
  `name` varchar(300) NOT NULL,
  `email` varchar(300) NOT NULL,
  `loginMethod` enum('google') NOT NULL,
  `currency` varchar(10) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `subId` (`subId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.users: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
