import { db } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {

  const accounts = await db.selectFrom('accounts')
    .where('accounts.userId', '=', locals.userId)
    .selectAll().execute()

  const expenseCategories = await db.selectFrom('expense_categories as ec')
    .where('ec.userId', '=', locals.userId)
    .selectAll().execute()

  const incomeCategories = await db.selectFrom('income_categories as ic')
    .where('ic.userId', '=', locals.userId)
    .selectAll().execute()

  return { accounts, expenseCategories, incomeCategories }
    // return {};
};