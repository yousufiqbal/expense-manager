import { db } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, url, locals }) => {

  if (params.mode == 'edit') {

    const category = await db.selectFrom(`${url.searchParams.get('type')}_categories`)
      .selectAll()
      .where('categories.categoryId', '=', categoryId)
      .where('categories.userId', '=', locals.userId)
      .executeTakeFirst()
  
    return { category }
  }


};