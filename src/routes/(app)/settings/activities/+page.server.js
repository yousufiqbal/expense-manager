import { db } from '$lib/server/db';
import dayjs from 'dayjs';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals, url }) => {

  let start = url.searchParams.get('start') || dayjs().startOf('month').format('YYYY-MM-DD')
  let end = url.searchParams.get('end') || dayjs().endOf('month').format('YYYY-MM-DD')

  console.log(start, end, locals)
  
  const activities = await db.selectFrom('activities')
    .where('activities.userId', '=', locals.userId)
    .where('activities.created', '>=', start + ' 00:00:00')
    .where('activities.created', '<=', end + ' 23:59:59')
    .orderBy('activities.created', 'desc')
    .selectAll().execute()

  console.log(activities)

  return { activities }

};