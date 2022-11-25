import { db } from '$lib/server/db';
import { sql } from 'kysely';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {

  const accounts = await db.selectFrom('accounts')
    .where('accounts.userId', '=', locals.userId)
    .leftJoin('incomes', 'incomes.accountId', 'accounts.accountId')
    .leftJoin('expenses', 'expenses.accountId', 'accounts.accountId')
    .leftJoin('transfers as te', 'te.fromAccountId', 'accounts.accountId')
    .leftJoin('transfers as ti', 'ti.toAccountId', 'accounts.accountId')
    .groupBy('accounts.accountId')
    .select(['accounts.accountId', 'accounts.name', sql`(COALESCE(SUM(incomes.amount), 0) + COALESCE(SUM(ti.amount), 0)) - (COALESCE(SUM(expenses.amount), 0) + COALESCE(SUM(te.amount), 0))`.as('balance')])
    .execute()

  return { accounts }
}