import { db } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {

  const accounts = await db.selectFrom('accounts')
    .where('accounts.userId', '=', locals.userId)
    .orderBy('accounts.name', 'asc')
    .selectAll().execute()
    
  const expenseCategories = await db.selectFrom('categories')
    .where('categories.userId', '=', locals.userId)
    .where('categories.belongsTo', '=', 'expense')
    .orderBy('categories.name', 'asc')
    .selectAll().execute()
    
  const incomeCategories = await db.selectFrom('categories')
    .where('categories.userId', '=', locals.userId)
    .where('categories.belongsTo', '=', 'income')
    .orderBy('categories.name', 'asc')
    .selectAll().execute()
  
  return { accounts, expenseCategories, incomeCategories }
};