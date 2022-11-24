import { db } from '$lib/server/db';
import { sql } from 'kysely';

let q = `SELECT accounts.accountId, accounts.name,
(COALESCE(SUM(incomes.amount), 0) +
COALESCE(SUM(ti.amount), 0)) -
(COALESCE(SUM(expenses.amount), 0) +
COALESCE(SUM(te.amount), 0))
AS balance
FROM accounts
LEFT JOIN incomes
ON incomes.accountId = accounts.accountId
LEFT JOIN expenses
ON expenses.accountId = accounts.accountId
LEFT JOIN transfers te
ON te.fromAccountId = accounts.accountId
LEFT JOIN transfers ti
ON te.toAccountId = accounts.accountId
GROUP BY accounts.accountId
`

/** @type {import('./$types').PageServerLoad} */
export const load = async ({}) => {
  const accounts = (await sql(q).execute(db)).rows;
  return { accounts }
}