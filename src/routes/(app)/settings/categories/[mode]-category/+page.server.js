import { db } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, url, locals }) => {

  if (params.mode != 'edit') return {
    category: { name: '', belongsTo: '' }
  }

  const categoryId = url.searchParams.get('category-id')
  const category = await db.selectFrom('categories')
    .selectAll()
    .where('categories.categoryId', '=', categoryId)
    .where('categories.userId', '=', locals.userId)
    .executeTakeFirst()

    console.log(category)
  return { category }

};