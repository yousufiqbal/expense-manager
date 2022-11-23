import { db } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, url }) => {

  if (params.mode != 'edit') return {
    category: { name: '', belongsTo: '' }
  }

  const categoryId = url.searchParams.get('category-id')
  const category = await db.selectFrom('categories')
    .selectAll()
    .where('categories.categoryId', '=', categoryId)
    .executeTakeFirst()

    console.log(category)
  return { category }

};