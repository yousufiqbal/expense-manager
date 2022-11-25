import { db } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {

  const profile = await db.selectFrom('users')
    .where('users.userId', '=', locals.userId)
    .select(['users.name', 'users.email', 'users.created', 'users.isVerified'])
    .executeTakeFirst()

  return { profile }

};