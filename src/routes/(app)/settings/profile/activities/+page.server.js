import { db } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
  
  const activities = await db.selectFrom('activities')
    .where('activities.userId', '=', locals.userId)
    .orderBy('activities.created', 'desc')
    .selectAll().execute()

  return { activities }

};