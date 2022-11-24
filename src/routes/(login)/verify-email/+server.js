import { db } from '$lib/server/db';
import { json, redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ url }) => {

  const token = url.searchParams.get('token')
  const email = url.searchParams.get('email')

  // Checking if email and tokens match
  const user = await db.selectFrom('users')
    .where('users.token', '=', token)
    .where('users.email', '=', email)
    .select(['userId', 'isVerified']).executeTakeFirst()

  // If no-user or no-user is verified..
  if (!user || user.isVerified) {
    // Silent redirect, not telling user that this token is invalid
    throw redirect('/')
  }

  await db.updateTable('users')
    .where('users.userId', '=', user.userId)
    .set({ isVerified: true }).execute()

  return json({
    message: 'Email Verified!'
  })

};