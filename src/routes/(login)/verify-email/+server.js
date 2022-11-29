import { db } from '$lib/server/db';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ url, locals }) => {

  const token = url.searchParams.get('token')
  const email = url.searchParams.get('email')

  // Checking if email and tokens match
  const user = await db.selectFrom('users')
    .where('users.token', '=', token)
    .where('users.email', '=', email)
    .select(['userId', 'isVerified']).executeTakeFirst()

  // If no-user or no-user is already verified..
  if (!user || user.isVerified) {
    // Silent redirect, not telling user that this token is invalid
    throw error(400, 'Nothing')
  }

  await db.updateTable('users')
    .where('users.userId', '=', user.userId)
    .set({ isVerified: true }).execute()

  // Logging
  await db.insertInto('activities').values({
    userId: locals.userId,
    summary: 'Verified email',
    detail: JSON.stringify({}),
    operation: 'other',
  }).execute()

  return json({
    message: 'Congrats! Email Verified'
  })

};