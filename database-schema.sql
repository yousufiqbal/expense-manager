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
  `userId` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`accountId`),
  UNIQUE KEY `name` (`name`),
  KEY `FK_accounts_users` (`userId`),
  CONSTRAINT `FK_accounts_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.accounts: ~0 rows (approximately)
INSERT INTO `accounts` (`accountId`, `userId`, `name`, `created`) VALUES
	(6, 11, 'Papa', '2022-11-24 16:51:57'),
	(7, 11, 'Shoaib', '2022-11-24 16:52:07'),
	(8, 13, 'Home', '2022-11-25 02:31:05'),
	(9, 13, 'Office', '2022-11-25 02:31:12');

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

-- Dumping structure for table expense-manager.expenses
CREATE TABLE IF NOT EXISTS `expenses` (
  `expenseId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userId` int NOT NULL DEFAULT '0',
  `date` date NOT NULL,
  `time` time NOT NULL,
  `accountId` int NOT NULL,
  `expenseCategoryId` int NOT NULL,
  `amount` decimal(13,0) NOT NULL DEFAULT '0',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`expenseId`) USING BTREE,
  KEY `FK_incomes_accounts` (`accountId`) USING BTREE,
  KEY `FK_expenses_users` (`userId`),
  KEY `FK_incomes_categories` (`expenseCategoryId`) USING BTREE,
  CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`accountId`),
  CONSTRAINT `FK_expenses_expense_categories` FOREIGN KEY (`expenseCategoryId`) REFERENCES `expense_categories` (`expenseCategoryId`),
  CONSTRAINT `FK_expenses_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- Dumping data for table expense-manager.expenses: ~0 rows (approximately)
INSERT INTO `expenses` (`expenseId`, `title`, `userId`, `date`, `time`, `accountId`, `expenseCategoryId`, `amount`, `description`, `created`) VALUES
	(1, 'Eggs 12', 11, '2022-11-24', '21:55:00', 6, 8, 420, NULL, '2022-11-24 16:56:00'),
	(3, 'Eggs 240', 13, '2022-11-25', '08:52:00', 8, 16, 20000, NULL, '2022-11-25 03:53:53'),
	(4, 'Diamicron', 13, '2022-11-25', '09:07:00', 8, 18, 450, NULL, '2022-11-25 04:07:49'),
	(5, 'Diamicron', 13, '2022-11-25', '08:30:00', 8, 18, 4501, NULL, '2022-11-25 04:48:58'),
	(6, 'Pleetal', 13, '2022-11-25', '09:51:00', 8, 18, 1200, NULL, '2022-11-25 04:51:57');

-- Dumping structure for table expense-manager.expense_categories
CREATE TABLE IF NOT EXISTS `expense_categories` (
  `expenseCategoryId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`expenseCategoryId`) USING BTREE,
  UNIQUE KEY `userId_name` (`userId`,`name`),
  KEY `FK_categories_users` (`userId`) USING BTREE,
  CONSTRAINT `expense_categories_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- Dumping data for table expense-manager.expense_categories: ~0 rows (approximately)
INSERT INTO `expense_categories` (`expenseCategoryId`, `userId`, `name`, `created`) VALUES
	(8, 11, 'Grocery', '2022-11-24 15:44:08'),
	(9, 11, 'Restaurants', '2022-11-24 15:44:21'),
	(10, 11, 'Health', '2022-11-24 15:44:28'),
	(11, 11, 'Transport', '2022-11-24 15:44:40'),
	(12, 11, 'Monthly', '2022-11-24 15:44:48'),
	(13, 11, 'Software', '2022-11-24 16:44:26'),
	(14, 11, 'Books', '2022-11-24 16:46:41'),
	(16, 13, 'Grocery', '2022-11-25 02:17:15'),
	(17, 13, 'Restaurant', '2022-11-25 02:17:32'),
	(18, 13, 'Health', '2022-11-25 02:18:25');

-- Dumping structure for table expense-manager.incomes
CREATE TABLE IF NOT EXISTS `incomes` (
  `incomeId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userId` int NOT NULL DEFAULT '0',
  `date` date NOT NULL,
  `time` time NOT NULL,
  `accountId` int NOT NULL,
  `incomeCategoryId` int NOT NULL,
  `amount` decimal(13,0) NOT NULL DEFAULT '0',
  `description` text,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`incomeId`),
  KEY `FK_incomes_accounts` (`accountId`),
  KEY `FK_incomes_users` (`userId`),
  KEY `FK_incomes_categories` (`incomeCategoryId`) USING BTREE,
  CONSTRAINT `FK_incomes_accounts` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`accountId`),
  CONSTRAINT `FK_incomes_categories` FOREIGN KEY (`incomeCategoryId`) REFERENCES `income_categories` (`incomeCategoryId`),
  CONSTRAINT `FK_incomes_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.incomes: ~0 rows (approximately)
INSERT INTO `incomes` (`incomeId`, `title`, `userId`, `date`, `time`, `accountId`, `incomeCategoryId`, `amount`, `description`, `created`) VALUES
	(6, 'asdasd', 13, '2022-11-25', '07:43:00', 9, 12, 450, NULL, '2022-11-25 02:44:30'),
	(7, 'Yousuf Money', 13, '2022-11-25', '08:52:00', 8, 12, 20000, NULL, '2022-11-25 03:53:07'),
	(8, 'Diamicron', 13, '2022-11-25', '08:30:00', 8, 12, 4500, NULL, '2022-11-25 04:50:55');

-- Dumping structure for table expense-manager.income_categories
CREATE TABLE IF NOT EXISTS `income_categories` (
  `incomeCategoryId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`incomeCategoryId`) USING BTREE,
  UNIQUE KEY `userId_name` (`userId`,`name`),
  KEY `FK_categories_users` (`userId`),
  CONSTRAINT `FK_categories_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.income_categories: ~0 rows (approximately)
INSERT INTO `income_categories` (`incomeCategoryId`, `userId`, `name`, `created`) VALUES
	(8, 11, 'Salary', '2022-11-24 15:44:58'),
	(9, 11, 'Bonus', '2022-11-24 15:45:46'),
	(10, 11, 'Others', '2022-11-24 15:45:53'),
	(12, 13, 'Salary', '2022-11-25 02:18:56'),
	(13, 13, 'Bonus', '2022-11-25 02:19:02'),
	(14, 13, 'Others', '2022-11-25 02:19:32'),
	(15, 13, 'Allowance', '2022-11-25 02:19:45'),
	(16, 13, 'asdfsdf', '2022-11-25 02:21:34'),
	(19, 13, 'asdfsdf22', '2022-11-25 02:21:59'),
	(20, 13, 'asdfsf', '2022-11-25 02:22:43'),
	(21, 13, 'asdfasf', '2022-11-25 02:22:52'),
	(22, 13, 'asdf', '2022-11-25 02:23:09'),
	(23, 13, 'asdfasdf', '2022-11-25 02:23:51'),
	(25, 13, 'asdf11', '2022-11-25 02:24:34'),
	(26, 13, '12121212', '2022-11-25 02:24:46'),
	(27, 13, 'asd', '2022-11-25 02:25:11'),
	(28, 13, '1212', '2022-11-25 02:25:23');

-- Dumping structure for table expense-manager.transfers
CREATE TABLE IF NOT EXISTS `transfers` (
  `transferId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userId` int NOT NULL,
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
  KEY `FK_transfers_users` (`userId`),
  CONSTRAINT `FK_transfers_accounts` FOREIGN KEY (`fromAccountId`) REFERENCES `accounts` (`accountId`),
  CONSTRAINT `FK_transfers_accounts_2` FOREIGN KEY (`toAccountId`) REFERENCES `accounts` (`accountId`),
  CONSTRAINT `FK_transfers_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- Dumping data for table expense-manager.transfers: ~0 rows (approximately)
INSERT INTO `transfers` (`transferId`, `title`, `userId`, `date`, `time`, `fromAccountId`, `toAccountId`, `amount`, `description`, `created`) VALUES
	(1, 'ASDFASDf', 13, '2022-11-25', '07:51:00', 8, 9, 450, NULL, '2022-11-25 02:53:59'),
	(2, 'Needed Transfer', 13, '2022-11-25', '08:52:00', 8, 9, 20000, NULL, '2022-11-25 03:53:34');

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.users: ~3 rows (approximately)
INSERT INTO `users` (`userId`, `name`, `email`, `password`, `isVerified`, `otp`, `token`, `currency`, `created`) VALUES
	(11, 'Yousuf Iqbal Dadda 2', 'yousufiqbal@gmail.com', '$2a$10$W4XA3PWYwdeaWBKHOkokMODjRX0wd.zqMiUfZ8cX3W6lTQFEeNq4W', 1, NULL, '793d0863f835afa0a6eac3c6f3a786079fae63b55c997dc112e34a76d6ae', 'Rs.', '2022-11-23 11:47:10'),
	(12, 'Saeed Ahmed', 'saeedahmed@gmail.com', '$2a$10$89c6q5lXV0.ANEQbGELFheQZ1K2CRJHkeNizWwRClLEyR1frLYUHi', 0, NULL, '2b9886d50d8b586e74337488ad10e0604248f515befc09151dc46bf80bbb', 'Rs.', '2022-11-24 08:17:04'),
	(13, 'Shoaib Iqbal', 'shoaibiqbal@gmail.com', '$2a$10$ufJFd61yvOutJ7SCH2L/buon9t5e88D9KsHVTlluO74C.efChifGm', 0, NULL, '25f270e876c292c480f1af2cdab06c0f9150dfe0f1433ddd23f58b6b021d', 'Rs.', '2022-11-24 08:19:37');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
