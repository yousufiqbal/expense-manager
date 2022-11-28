-- Active: 1669550278024@@127.0.0.1@3306@expense-manager
WITH totalExpenses AS (
  SELECT e.accountId, COALESCE(SUM(e.amount), 0) AS total
  FROM expenses e
  WHERE e.userId = 15
  GROUP BY e.accountId
),

totalIncomes AS (
  SELECT i.accountId, COALESCE(SUM(i.amount), 0) AS total
  FROM incomes i
  WHERE i.userId = 15
  GROUP BY i.accountId
),

totalTransferExpenses AS (
  SELECT te.fromAccountId, COALESCE(SUM(te.amount), 0) AS total
  FROM transfers te
  WHERE te.userId = 15
  GROUP BY te.fromAccountId
),

totalTransferIncomes AS (
  SELECT ti.toAccountId, COALESCE(SUM(ti.amount), 0) AS total
  FROM transfers ti
  WHERE ti.userId = 15
  GROUP BY ti.toAccountId
)

SELECT a.accountId, a.name,
(e.total + te.total) totalExpense,
(i.total + ti.total) totalIncome

FROM accounts a

LEFT JOIN totalExpenses e ON e.accountId = a.accountId
LEFT JOIN totalIncomes i ON i.accountId = a.accountId
LEFT JOIN totalTransferExpenses te ON te.fromAccountId = a.accountId
LEFT JOIN totalTransferIncomes ti ON ti.toAccountId = a.accountId

WHERE a.userId = 15