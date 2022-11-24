import { db } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, url, locals }) => {

  if (params.mode == 'edit') {

    const categoryId = url.searchParams.get('category-id')

    const category = await db.selectFrom(`expense_categories`)
      .selectAll()
      .where('expense_categories.expenseCategoryId', '=', categoryId)
      .where('expense_categories.userId', '=', locals.userId)
      .executeTakeFirst()
  
    return { category }
  }


};