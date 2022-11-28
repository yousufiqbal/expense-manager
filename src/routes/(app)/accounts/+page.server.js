import { db } from '$lib/server/db';
import { sql } from 'kysely';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {

  const query = `
    WITH totalExpenses AS (
      SELECT e.accountId, COALESCE(SUM(e.amount), 0) AS total
      FROM expenses e
      WHERE e.userId = ${locals.userId}
      GROUP BY e.accountId
    ),
    
    totalIncomes AS (
      SELECT i.accountId, COALESCE(SUM(i.amount), 0) AS total
      FROM incomes i
      WHERE i.userId = ${locals.userId}
      GROUP BY i.accountId
    ),
    
    totalTransferExpenses AS (
      SELECT te.fromAccountId, COALESCE(SUM(te.amount), 0) AS total
      FROM transfers te
      WHERE te.userId = ${locals.userId}
      GROUP BY te.fromAccountId
    ),
    
    totalTransferIncomes AS (
      SELECT ti.toAccountId, COALESCE(SUM(ti.amount), 0) AS total
      FROM transfers ti
      WHERE ti.userId = ${locals.userId}
      GROUP BY ti.toAccountId
    )
    
    SELECT a.accountId, a.name,
    COALESCE(i.total, 0) + COALESCE(ti.total, 0) - 
    COALESCE(e.total, 0) + COALESCE(te.total, 0) balance
    
    FROM accounts a
    
    LEFT JOIN totalExpenses e ON e.accountId = a.accountId
    LEFT JOIN totalTransferExpenses te ON te.fromAccountId = a.accountId
    LEFT JOIN totalIncomes i ON i.accountId = a.accountId
    LEFT JOIN totalTransferIncomes ti ON ti.toAccountId = a.accountId
    
    WHERE a.userId = ${locals.userId}
  `

  const accounts = (await sql(query).execute(db)).rows

  return { accounts }
}