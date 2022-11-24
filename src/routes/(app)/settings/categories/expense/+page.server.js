import { db } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {

  const categories = await db.selectFrom('expense_categories')
    .orderBy('name', 'asc')
    .where('expense_categories.userId', '=', locals.userId)
    .selectAll().execute()

  return { categories }
  
}