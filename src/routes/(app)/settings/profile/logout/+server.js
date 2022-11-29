import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ cookies, locals }) => {

  // Logging..
  await db.insertInto('activities').values({
    userId: locals.userId,
    summary: 'Logged out (by clicking logout-button)',
    detail: JSON.stringify({}),
    operation: 'other',
  }).execute()
  
  cookies.delete('fact', { path: '/' })
  
  return json({
    message: 'Logged out'
  })

};