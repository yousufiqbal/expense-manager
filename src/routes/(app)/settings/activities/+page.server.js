import { db } from '$lib/server/db';
import dayjs from 'dayjs';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals, url }) => {

  let start = url.searchParams.get('start') || dayjs().startOf('month').format('YYYY-MM-DD')
  let end = url.searchParams.get('end') || dayjs().endOf('month').format('YYYY-MM-DD')
  
  const activities = await db.selectFrom('activities')
    .where('activities.userId', '=', locals.userId)
    .where('activities.created', '>=', start)
    .where('activities.created', '<=', end)
    .orderBy('activities.created', 'desc')
    .selectAll().execute()

  return { activities }

};