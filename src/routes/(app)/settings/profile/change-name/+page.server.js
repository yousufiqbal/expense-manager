import { db } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {
  const user = await db.selectFrom('users')
    .where('users.userId', '=', locals.userId)
    .select('users.name').executeTakeFirst()
  return { user }
};