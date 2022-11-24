import { db } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {

  const accounts = await db.selectFrom('accounts')
    .where('accounts.userId', '=', locals.userId)
    .orderBy('accounts.name', 'asc')
    .selectAll().execute()
    
  const expenseCategories = await db.selectFrom('expense_categories')
    .where('expense_categories.userId', '=', locals.userId)
    .orderBy('expense_categories.name', 'asc')
    .selectAll().execute()
    
  const incomeCategories = await db.selectFrom('income_categories')
    .where('income_categories.userId', '=', locals.userId)
    .orderBy('income_categories.name', 'asc')
    .selectAll().execute()
  
  return { accounts, expenseCategories, incomeCategories }
};