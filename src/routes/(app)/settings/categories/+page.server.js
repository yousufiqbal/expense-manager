import { db } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ url, locals }) => {

  const tab = url.searchParams.get('tab')

  const categories = await db.selectFrom('categories')
    .orderBy('name', 'asc')
    .where('categories.belongsTo', '=', tab)
    .where('categories.userId', '=', locals.userId)
    .selectAll().execute()

  return { categories }
  
};