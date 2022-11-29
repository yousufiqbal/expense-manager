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
  `userId` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`accountId`),
  UNIQUE KEY `userId_name` (`userId`,`name`),
  KEY `FK_accounts_users` (`userId`),
  CONSTRAINT `FK_accounts_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.accounts: ~28 rows (approximately)
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` (`accountId`, `userId`, `name`, `created`) VALUES
	(10, 15, 'Personal', '2022-11-25 23:59:44'),
	(11, 15, 'Savings', '2022-11-25 23:59:44'),
	(22, 21, 'Personal', '2022-11-29 08:02:51'),
	(23, 21, 'Savings', '2022-11-29 08:02:51'),
	(24, 22, 'Personal', '2022-11-29 08:03:46'),
	(25, 22, 'Savings', '2022-11-29 08:03:46'),
	(26, 23, 'Personal', '2022-11-29 08:04:33'),
	(27, 23, 'Savings', '2022-11-29 08:04:33'),
	(28, 24, 'Personal', '2022-11-29 08:05:27'),
	(29, 24, 'Savings', '2022-11-29 08:05:27'),
	(30, 25, 'Personal', '2022-11-29 08:07:22'),
	(31, 25, 'Savings', '2022-11-29 08:07:22'),
	(32, 26, 'Personal', '2022-11-29 08:07:44'),
	(33, 26, 'Savings', '2022-11-29 08:07:44'),
	(34, 27, 'Personal', '2022-11-29 08:10:24'),
	(35, 27, 'Savings', '2022-11-29 08:10:24'),
	(36, 28, 'Personal', '2022-11-29 08:11:18'),
	(37, 28, 'Savings', '2022-11-29 08:11:18'),
	(38, 15, 'Mamania', '2022-11-29 14:49:14'),
	(39, 15, 'Kakakia', '2022-11-29 14:49:28'),
	(40, 15, 'Farhan Khan', '2022-11-29 15:10:01'),
	(41, 15, 'Tilli ', '2022-11-29 15:11:41'),
	(42, 15, 'MamaPapa', '2022-11-29 15:15:25'),
	(43, 15, 'Nanajani', '2022-11-29 15:16:47'),
	(44, 29, 'Personal', '2022-11-29 15:31:33'),
	(45, 29, 'Savings', '2022-11-29 15:31:33'),
	(46, 30, 'Personal', '2022-11-29 15:32:06'),
	(47, 30, 'Savings', '2022-11-29 15:32:06');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;

-- Dumping structure for table expense-manager.activities
CREATE TABLE IF NOT EXISTS `activities` (
  `activityId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `summary` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `detail` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `operation` enum('create','update','delete','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`activityId`),
  KEY `FK_activities_users` (`userId`),
  CONSTRAINT `FK_activities_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.activities: ~28 rows (approximately)
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` (`activityId`, `userId`, `summary`, `detail`, `operation`, `created`) VALUES
	(2, 15, 'Added expense', '{"accountId":"10","expenseCategoryId":"22","date":"2022-11-29","time":"13:25:54","title":"Real Chips","amount":300,"description":null,"userId":15}', 'create', '2022-11-29 13:26:02'),
	(3, 15, 'Added expense', '{"accountId":"10","expenseCategoryId":"26","date":"2022-11-29","time":"14:15:18","title":"Gas Bill","amount":250,"description":null,"userId":15}', 'create', '2022-11-29 14:15:29'),
	(4, 15, 'Added income', '{"accountId":"10","incomeCategoryId":"32","date":"2022-11-29","time":"14:15:40","title":"Got Bonus!","amount":2500,"description":null,"userId":15}', 'create', '2022-11-29 14:16:09'),
	(5, 15, 'Added transfer', '{"date":"2022-11-29","time":"14:17:54","fromAccountId":"10","toAccountId":"11","title":"Needed","amount":250,"description":null,"userId":15}', 'create', '2022-11-29 14:18:05'),
	(6, 15, 'Removed Transfer', '{"transferId":6,"title":"Needed","userId":15,"date":"2022-11-28T19:00:00.000Z","time":"14:17:54","fromAccountId":10,"toAccountId":11,"amount":"250","description":null,"type":"transfer","created":"2022-11-29T09:18:05.000Z"}', 'delete', '2022-11-29 14:21:53'),
	(7, 15, '{"incomeId":11,"title":"Got Bonus!","userId":15,"date":"2022-11-28T19:00:00.000Z","time":"14:15:40","accountId":10,"incomeCategoryId":32,"amount":"2500","description":null,"type":"income","created":"2022-11-29T09:16:09.000Z"}', 'delete', 'create', '2022-11-29 14:22:06'),
	(8, 15, 'Added income', '{"accountId":"10","incomeCategoryId":"32","date":"2022-11-29","time":"14:22:31","title":"Bonus kya bat hay","amount":250,"description":null,"userId":15}', 'create', '2022-11-29 14:22:48'),
	(9, 15, 'Removed Income', 'delete', 'create', '2022-11-29 14:22:53'),
	(10, 15, 'Added income', '{"accountId":"10","incomeCategoryId":"32","date":"2022-11-29","time":"14:23:46","title":"Wheatable","amount":450,"description":null,"userId":15}', 'create', '2022-11-29 14:24:07'),
	(11, 15, 'Removed Income', '{"incomeId":13,"title":"Wheatable","userId":15,"date":"2022-11-28T19:00:00.000Z","time":"14:23:46","accountId":10,"incomeCategoryId":32,"amount":"450","description":null,"type":"income","created":"2022-11-29T09:24:06.000Z"}', 'delete', '2022-11-29 14:24:12'),
	(12, 15, 'Removed Expense', '{"expenseId":22,"title":"Gas Bill","userId":15,"date":"2022-11-28T19:00:00.000Z","time":"14:15:18","accountId":10,"expenseCategoryId":26,"amount":"250","description":null,"type":"expense","created":"2022-11-29T09:15:29.000Z"}', 'delete', '2022-11-29 14:24:39'),
	(13, 15, 'Added account', '{"userId":15,"name":"Mamania"}', 'create', '2022-11-29 14:49:14'),
	(14, 15, 'Added account', '{"userId":15,"name":"Kakakia"}', 'create', '2022-11-29 14:49:28'),
	(15, 15, 'Added account', '{"userId":15,"name":"Farhan"}', 'create', '2022-11-29 15:10:01'),
	(16, 15, 'Added account named Tilli ', '{"userId":15,"name":"Tilli "}', 'create', '2022-11-29 15:11:41'),
	(17, 15, 'Added starting balance', '{"userId":15,"accountId":41,"amount":1500,"date":"2022-11-29","time":"15:11","title":"Starting Balance","incomeCategoryId":34}', 'create', '2022-11-29 15:11:41'),
	(18, 15, 'Added account named MamaPapa', '{"userId":15,"name":"MamaPapa"}', 'create', '2022-11-29 15:15:25'),
	(19, 15, 'Added account named Nanajani', '{"userId":15,"name":"Nanajani"}', 'create', '2022-11-29 15:16:47'),
	(20, 15, 'AUTO-Added `Others` in income category', '{}', 'create', '2022-11-29 15:16:47'),
	(21, 15, 'Added starting balance', '{"userId":15,"accountId":43,"amount":545,"date":"2022-11-29","time":"15:16","title":"Starting Balance","incomeCategoryId":68}', 'create', '2022-11-29 15:16:47'),
	(22, 15, 'Updated account', 'From undefined, To {"name":"Farhan Khan"}', 'create', '2022-11-29 15:17:39'),
	(23, 15, 'Updated account', 'From undefined, To {"name":"Farhan"}', 'create', '2022-11-29 15:18:44'),
	(24, 15, 'Updated account', 'From {"accountId":40,"userId":15,"name":"Farhan","created":"2022-11-29T10:10:01.000Z"}, To {"name":"Farhan Khan"}', 'create', '2022-11-29 15:19:35'),
	(25, 15, 'Change name from Nabeel to Nabeel Khan', '{}', 'create', '2022-11-29 15:24:35'),
	(26, 15, 'Changed password', '{}', 'create', '2022-11-29 15:26:11'),
	(27, 15, 'Changed password', '{}', 'create', '2022-11-29 15:26:21'),
	(28, 15, 'Logged In', '{}', 'other', '2022-11-29 15:30:50'),
	(29, 30, 'Joined Expense Manager', '{}', 'other', '2022-11-29 15:32:06'),
	(30, 30, 'Changed currency from Rs. to $', '{}', 'create', '2022-11-29 15:42:11'),
	(31, 30, 'Logged out (by clicking logout-button)', '{}', 'other', '2022-11-29 15:43:34'),
	(32, 15, 'Logged In', '{}', 'other', '2022-11-29 15:43:57'),
	(33, 15, 'Added income category', '{"name":"Pillow"}', 'create', '2022-11-29 15:50:05'),
	(34, 15, 'Updated income category', '"From [object Object], To [object Object]"', 'update', '2022-11-29 15:50:22'),
	(35, 15, 'Updated income category', 'From {"incomeCategoryId":33,"userId":15,"name":"Allowance","created":"2022-11-25T18:59:44.000Z"}, To {"name":"Allowance22"}', 'update', '2022-11-29 15:52:07'),
	(36, 15, 'Added expense category', '{"name":"Pills"}', 'create', '2022-11-29 15:54:56'),
	(37, 15, 'Updated expense category', 'From {"expenseCategoryId":88,"userId":15,"name":"Pills","created":"2022-11-29T10:54:56.000Z"}, To {"name":"Kills"}', 'update', '2022-11-29 15:55:07');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;

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
  `type` varchar(50) NOT NULL DEFAULT 'expense',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`expenseId`) USING BTREE,
  KEY `FK_incomes_accounts` (`accountId`) USING BTREE,
  KEY `FK_expenses_users` (`userId`),
  KEY `FK_incomes_categories` (`expenseCategoryId`) USING BTREE,
  CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`accountId`),
  CONSTRAINT `FK_expenses_expense_categories` FOREIGN KEY (`expenseCategoryId`) REFERENCES `expense_categories` (`expenseCategoryId`),
  CONSTRAINT `FK_expenses_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- Dumping data for table expense-manager.expenses: ~12 rows (approximately)
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
INSERT INTO `expenses` (`expenseId`, `title`, `userId`, `date`, `time`, `accountId`, `expenseCategoryId`, `amount`, `description`, `type`, `created`) VALUES
	(10, 'Khaadis Suits x 4', 15, '2022-11-27', '16:38:00', 10, 25, 4500, NULL, 'expense', '2022-11-27 16:38:18'),
	(11, 'Eggs x 24', 15, '2022-11-27', '16:38:00', 10, 22, 450, NULL, 'expense', '2022-11-27 16:38:34'),
	(12, 'Gas Bill', 15, '2022-11-27', '16:38:00', 10, 26, 240, NULL, 'expense', '2022-11-27 16:38:52'),
	(13, 'Panadol x 6 Leafs', 15, '2022-11-27', '16:38:00', 10, 23, 60, NULL, 'expense', '2022-11-27 16:39:12'),
	(14, 'Bykea Ayesha Home', 15, '2022-11-27', '18:07:49', 10, 24, 320, NULL, 'expense', '2022-11-27 18:08:11'),
	(15, 'Bread x 1', 15, '2022-11-26', '18:56:13', 10, 22, 120, NULL, 'expense', '2022-11-27 18:56:29'),
	(16, 'Diamicron', 15, '2022-11-27', '18:56:42', 10, 23, 220, NULL, 'expense', '2022-11-27 18:57:02'),
	(17, 'Huge', 15, '2022-11-28', '09:48:12', 10, 23, 5000, NULL, 'expense', '2022-11-28 09:48:26'),
	(18, 'J. Clothes', 15, '2022-11-29', '13:03:47', 10, 25, 4200, NULL, 'expense', '2022-11-29 13:03:58'),
	(19, 'Dawai', 15, '2022-11-29', '13:05:11', 10, 27, 450, NULL, 'expense', '2022-11-29 13:05:19'),
	(20, 'Books', 15, '2022-11-29', '13:05:49', 10, 27, 440, NULL, 'expense', '2022-11-29 13:06:07'),
	(21, 'Real Chips', 15, '2022-11-29', '13:25:54', 10, 22, 300, NULL, 'expense', '2022-11-29 13:26:02');
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- Dumping data for table expense-manager.expense_categories: ~66 rows (approximately)
/*!40000 ALTER TABLE `expense_categories` DISABLE KEYS */;
INSERT INTO `expense_categories` (`expenseCategoryId`, `userId`, `name`, `created`) VALUES
	(22, 15, 'Grocery', '2022-11-25 23:59:44'),
	(23, 15, 'Health', '2022-11-25 23:59:44'),
	(24, 15, 'Transport', '2022-11-25 23:59:44'),
	(25, 15, 'Clothing', '2022-11-25 23:59:44'),
	(26, 15, 'Bills', '2022-11-25 23:59:44'),
	(27, 15, 'Others', '2022-11-25 23:59:44'),
	(28, 21, 'Grocery', '2022-11-29 08:02:51'),
	(29, 21, 'Health', '2022-11-29 08:02:51'),
	(30, 21, 'Transport', '2022-11-29 08:02:51'),
	(31, 21, 'Clothing', '2022-11-29 08:02:51'),
	(32, 21, 'Bills', '2022-11-29 08:02:51'),
	(33, 21, 'Others', '2022-11-29 08:02:51'),
	(34, 22, 'Grocery', '2022-11-29 08:03:46'),
	(35, 22, 'Health', '2022-11-29 08:03:46'),
	(36, 22, 'Transport', '2022-11-29 08:03:46'),
	(37, 22, 'Clothing', '2022-11-29 08:03:46'),
	(38, 22, 'Bills', '2022-11-29 08:03:46'),
	(39, 22, 'Others', '2022-11-29 08:03:46'),
	(40, 23, 'Grocery', '2022-11-29 08:04:33'),
	(41, 23, 'Health', '2022-11-29 08:04:33'),
	(42, 23, 'Transport', '2022-11-29 08:04:33'),
	(43, 23, 'Clothing', '2022-11-29 08:04:33'),
	(44, 23, 'Bills', '2022-11-29 08:04:33'),
	(45, 23, 'Others', '2022-11-29 08:04:33'),
	(46, 24, 'Grocery', '2022-11-29 08:05:27'),
	(47, 24, 'Health', '2022-11-29 08:05:27'),
	(48, 24, 'Transport', '2022-11-29 08:05:27'),
	(49, 24, 'Clothing', '2022-11-29 08:05:27'),
	(50, 24, 'Bills', '2022-11-29 08:05:27'),
	(51, 24, 'Others', '2022-11-29 08:05:27'),
	(52, 25, 'Grocery', '2022-11-29 08:07:22'),
	(53, 25, 'Health', '2022-11-29 08:07:22'),
	(54, 25, 'Transport', '2022-11-29 08:07:22'),
	(55, 25, 'Clothing', '2022-11-29 08:07:22'),
	(56, 25, 'Bills', '2022-11-29 08:07:22'),
	(57, 25, 'Others', '2022-11-29 08:07:22'),
	(58, 26, 'Grocery', '2022-11-29 08:07:44'),
	(59, 26, 'Health', '2022-11-29 08:07:44'),
	(60, 26, 'Transport', '2022-11-29 08:07:44'),
	(61, 26, 'Clothing', '2022-11-29 08:07:44'),
	(62, 26, 'Bills', '2022-11-29 08:07:44'),
	(63, 26, 'Others', '2022-11-29 08:07:44'),
	(64, 27, 'Grocery', '2022-11-29 08:10:24'),
	(65, 27, 'Health', '2022-11-29 08:10:24'),
	(66, 27, 'Transport', '2022-11-29 08:10:24'),
	(67, 27, 'Clothing', '2022-11-29 08:10:24'),
	(68, 27, 'Bills', '2022-11-29 08:10:24'),
	(69, 27, 'Others', '2022-11-29 08:10:24'),
	(70, 28, 'Grocery', '2022-11-29 08:11:18'),
	(71, 28, 'Health', '2022-11-29 08:11:18'),
	(72, 28, 'Transport', '2022-11-29 08:11:18'),
	(73, 28, 'Clothing', '2022-11-29 08:11:18'),
	(74, 28, 'Bills', '2022-11-29 08:11:18'),
	(75, 28, 'Others', '2022-11-29 08:11:18'),
	(76, 29, 'Grocery', '2022-11-29 15:31:33'),
	(77, 29, 'Health', '2022-11-29 15:31:33'),
	(78, 29, 'Transport', '2022-11-29 15:31:33'),
	(79, 29, 'Clothing', '2022-11-29 15:31:33'),
	(80, 29, 'Bills', '2022-11-29 15:31:33'),
	(81, 29, 'Others', '2022-11-29 15:31:33'),
	(82, 30, 'Grocery', '2022-11-29 15:32:06'),
	(83, 30, 'Health', '2022-11-29 15:32:06'),
	(84, 30, 'Transport', '2022-11-29 15:32:06'),
	(85, 30, 'Clothing', '2022-11-29 15:32:06'),
	(86, 30, 'Bills', '2022-11-29 15:32:06'),
	(87, 30, 'Others', '2022-11-29 15:32:06'),
	(88, 15, 'Kills', '2022-11-29 15:54:56');
/*!40000 ALTER TABLE `expense_categories` ENABLE KEYS */;

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
  `type` varchar(50) NOT NULL DEFAULT 'income',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`incomeId`),
  KEY `FK_incomes_accounts` (`accountId`),
  KEY `FK_incomes_users` (`userId`),
  KEY `FK_incomes_categories` (`incomeCategoryId`) USING BTREE,
  CONSTRAINT `FK_incomes_accounts` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`accountId`),
  CONSTRAINT `FK_incomes_categories` FOREIGN KEY (`incomeCategoryId`) REFERENCES `income_categories` (`incomeCategoryId`),
  CONSTRAINT `FK_incomes_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.incomes: ~3 rows (approximately)
/*!40000 ALTER TABLE `incomes` DISABLE KEYS */;
INSERT INTO `incomes` (`incomeId`, `title`, `userId`, `date`, `time`, `accountId`, `incomeCategoryId`, `amount`, `description`, `type`, `created`) VALUES
	(10, 'November Salary', 15, '2022-11-27', '16:41:00', 10, 31, 50000, NULL, 'income', '2022-11-27 16:41:21'),
	(14, 'Starting Balance', 15, '2022-11-29', '15:11:00', 41, 34, 1500, NULL, 'income', '2022-11-29 15:11:41'),
	(15, 'Starting Balance', 15, '2022-11-29', '15:16:00', 43, 68, 545, NULL, 'income', '2022-11-29 15:16:47');
/*!40000 ALTER TABLE `incomes` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.income_categories: ~46 rows (approximately)
/*!40000 ALTER TABLE `income_categories` DISABLE KEYS */;
INSERT INTO `income_categories` (`incomeCategoryId`, `userId`, `name`, `created`) VALUES
	(31, 15, 'Salary', '2022-11-25 23:59:44'),
	(32, 15, 'Bonus', '2022-11-25 23:59:44'),
	(33, 15, 'Allowance22', '2022-11-25 23:59:44'),
	(34, 15, 'Others2', '2022-11-25 23:59:44'),
	(35, 21, 'Salary', '2022-11-29 08:02:51'),
	(36, 21, 'Bonus', '2022-11-29 08:02:51'),
	(37, 21, 'Allowance', '2022-11-29 08:02:51'),
	(38, 21, 'Others', '2022-11-29 08:02:51'),
	(39, 22, 'Salary', '2022-11-29 08:03:46'),
	(40, 22, 'Bonus', '2022-11-29 08:03:46'),
	(41, 22, 'Allowance', '2022-11-29 08:03:46'),
	(42, 22, 'Others', '2022-11-29 08:03:46'),
	(43, 23, 'Salary', '2022-11-29 08:04:33'),
	(44, 23, 'Bonus', '2022-11-29 08:04:33'),
	(45, 23, 'Allowance', '2022-11-29 08:04:33'),
	(46, 23, 'Others', '2022-11-29 08:04:33'),
	(47, 24, 'Salary', '2022-11-29 08:05:27'),
	(48, 24, 'Bonus', '2022-11-29 08:05:27'),
	(49, 24, 'Allowance', '2022-11-29 08:05:27'),
	(50, 24, 'Others', '2022-11-29 08:05:27'),
	(51, 25, 'Salary', '2022-11-29 08:07:22'),
	(52, 25, 'Bonus', '2022-11-29 08:07:22'),
	(53, 25, 'Allowance', '2022-11-29 08:07:22'),
	(54, 25, 'Others', '2022-11-29 08:07:22'),
	(55, 26, 'Salary', '2022-11-29 08:07:44'),
	(56, 26, 'Bonus', '2022-11-29 08:07:44'),
	(57, 26, 'Allowance', '2022-11-29 08:07:44'),
	(58, 26, 'Others', '2022-11-29 08:07:44'),
	(59, 27, 'Salary', '2022-11-29 08:10:24'),
	(60, 27, 'Bonus', '2022-11-29 08:10:24'),
	(61, 27, 'Allowance', '2022-11-29 08:10:24'),
	(62, 27, 'Others', '2022-11-29 08:10:24'),
	(63, 28, 'Salary', '2022-11-29 08:11:18'),
	(64, 28, 'Bonus', '2022-11-29 08:11:18'),
	(65, 28, 'Allowance', '2022-11-29 08:11:18'),
	(66, 28, 'Others', '2022-11-29 08:11:18'),
	(67, 15, 'Others3', '2022-11-29 15:15:25'),
	(68, 15, 'Others', '2022-11-29 15:16:47'),
	(69, 29, 'Salary', '2022-11-29 15:31:33'),
	(70, 29, 'Bonus', '2022-11-29 15:31:33'),
	(71, 29, 'Allowance', '2022-11-29 15:31:33'),
	(72, 29, 'Others', '2022-11-29 15:31:33'),
	(73, 30, 'Salary', '2022-11-29 15:32:06'),
	(74, 30, 'Bonus', '2022-11-29 15:32:06'),
	(75, 30, 'Allowance', '2022-11-29 15:32:06'),
	(76, 30, 'Others', '2022-11-29 15:32:06'),
	(77, 15, 'Tillow', '2022-11-29 15:50:05');
/*!40000 ALTER TABLE `income_categories` ENABLE KEYS */;

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
  `type` varchar(50) NOT NULL DEFAULT 'transfer',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transferId`) USING BTREE,
  KEY `FK_transfers_accounts` (`fromAccountId`),
  KEY `FK_transfers_accounts_2` (`toAccountId`),
  KEY `FK_transfers_users` (`userId`),
  CONSTRAINT `FK_transfers_accounts` FOREIGN KEY (`fromAccountId`) REFERENCES `accounts` (`accountId`),
  CONSTRAINT `FK_transfers_accounts_2` FOREIGN KEY (`toAccountId`) REFERENCES `accounts` (`accountId`),
  CONSTRAINT `FK_transfers_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- Dumping data for table expense-manager.transfers: ~2 rows (approximately)
/*!40000 ALTER TABLE `transfers` DISABLE KEYS */;
INSERT INTO `transfers` (`transferId`, `title`, `userId`, `date`, `time`, `fromAccountId`, `toAccountId`, `amount`, `description`, `type`, `created`) VALUES
	(4, 'Savings for Kid', 15, '2022-11-27', '16:41:00', 10, 11, 5000, NULL, 'transfer', '2022-11-27 16:42:18'),
	(5, 'Needed', 15, '2022-11-29', '14:16:18', 10, 11, 200, NULL, 'transfer', '2022-11-29 14:17:02');
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense-manager.users: ~14 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`userId`, `name`, `email`, `password`, `isVerified`, `otp`, `token`, `currency`, `created`) VALUES
	(14, 'Danish Saleem', 'yousufiqbal@gmail.com', '$2a$10$mir/B2148h9liWwbAj3wmemB/ul1J.4.Z.5BnN6.YuDMyWyNuwb36', 0, NULL, '76206d68380a151dcbe27c8e2a62cd82ac1f238d334900aeb136e629a1e8', 'Rs', '2022-11-25 23:22:52'),
	(15, 'Nabeel Khan', 'nabeel@gmail.com', '$2a$10$f4/dYx1LEY5jCHL649n9vOeHYqBO9vgldT0VBX9X07S9yG0RMhCLC', 0, NULL, '38f47addfa7902c7448b1b2a72b3f91775185bf33db635bb0bc4df26e2d1', 'Rs', '2022-11-25 23:59:44'),
	(19, 'naa', 'naa@a.com', '$2a$10$vrKTSITsI7n7LLuwcb3H0OLUhcTgfB0gbNO.9W3hf37Y.nqD1HSme', 0, NULL, '4e2788b15c533d976ace63a40f9be45d7a733a1246fc9508a192f3af1821', 'Rs.', '2022-11-29 08:00:59'),
	(20, 'maa', 'maa@m.com', '$2a$10$tl6SaZNfOO3XVkkK7HHmvu5cZmWxSeWJIgfJQL/JySLiuF74O4/.u', 0, NULL, '85162d36fae7dc2dd8492ba14c0c4d292e5a3aeb060b60060f92efbdf5c8', 'Rs.', '2022-11-29 08:01:27'),
	(21, 'Naseem Alam', 'naseemalam@gmail.com', '$2a$10$u7kBWJOvJ4W4NEhjbbBLjeIW11hX6sXlB3invoST0H52IJulOU07W', 0, NULL, 'a5d12ca45cb34945b399d900e3ee16e759045b597f49d0162fc96af62488', 'Rs.', '2022-11-29 08:02:51'),
	(22, 'neelam', 'neelam@gmail.com', '$2a$10$1P.D33rkQkKdfIWV9QICt.eOoD5SxdGyxafeQwQWZdp0wlxFCyL1q', 0, NULL, '042d6b4620c6840c5f234c146ee011eeaa86c033e9666d2b0442e2fcd41c', 'Rs.', '2022-11-29 08:03:46'),
	(23, 'Pilpila', 'pilpila@gmail.com', '$2a$10$4SUkg09UyI5XKkDoBjw6QOkg5ZEpRXPCtUT/71XQF0OxP14BFcKCO', 0, NULL, 'ad2ebaa922371c34b7d598c36532cc5b741708da084a1bc5943a5cb780b0', 'Rs.', '2022-11-29 08:04:33'),
	(24, 'pilpila3', 'pilpila3@gmail.com', '$2a$10$/VBKBaXIJowWVfa9iw0m5uUrymSfUucRV2df6XE0HU3L.6PJ3W3xG', 0, NULL, '1c329f371107efa0b24d921b83bef96b2c857eb5464313e3f852c793bd29', 'Rs.', '2022-11-29 08:05:27'),
	(25, 'pmpmpm', 'pmpmpm@gmail.com', '$2a$10$w9Ke7ZAmarqVYbE23NlgqeEQ1BvpeDrPK/KC91ycPxMtC4E8YyFay', 0, NULL, 'ac4252bf936522b3881510723d8f26a8ac52a781f2da571b08cb1d5a3e90', 'Rs.', '2022-11-29 08:07:22'),
	(26, 'sdsdsd', 'sdsdsd@dfdf.com', '$2a$10$QGZHUClkfg.MfuhiySXow./gGMBkJVyj0L4wJ6TWnuOCa.TntCqtS', 0, NULL, '422676d7587c471d57aefa18cd28ae147c61cb85d1996238b74d9b1f92ec', 'Rs.', '2022-11-29 08:07:44'),
	(27, 'Momin', 'momin@gmail.com', '$2a$10$uMVuWT0n77dQVXA6xkjoI.ikQwQavgW0URL.p9WV5j96ad29ryUDK', 0, NULL, 'b0ad481ca78cec8e32d74bb7482137a5f8074555bf710d0114cc4be4e25b', 'Rs.', '2022-11-29 08:10:24'),
	(28, 'Nasir', 'nasir@gmail.com', '$2a$10$LICnHxQq7UTRQ1xJLVMHJu4nRaEI.gWmj4oUIc.SchppWHyR3NaQi', 0, NULL, '7bb1f3c65c08fba264508964d9715b1f899924d55117361227819aa59571', 'Rs.', '2022-11-29 08:11:18'),
	(29, 'Faheem', 'faheem@gmail.com', '$2a$10$iRsOOY2bAN3nemUczLuZ4.7qztkleqNy0jYJoDZjyqcLW/vaUKPl.', 0, NULL, '9609c255ba67d2c3ea0235d4295417beacde73199663dc1bb75b4b16cba6', 'Rs.', '2022-11-29 15:31:33'),
	(30, 'Umar', 'umar@gmail.com', '$2a$10$T0gwXJ7vQjpUsLZduLIuk.IoKlzwbUkdcUSzuWHhPgAQGy..y1o.W', 0, NULL, '482f4442ea4f64c49fd8cb0da2493331ce4129d4657135eaf189240bbd1d', '$', '2022-11-29 15:32:06');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
