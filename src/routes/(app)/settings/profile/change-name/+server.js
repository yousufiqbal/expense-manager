import { profileNameSchema } from '$lib/others/schema';
import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals }) => {

  const body = await request.json()
  const user = await profileNameSchema.validate(body, { abortEarly: false })

  // Getting current name for logging..
  const previousUser = await db.selectFrom('users')
    .where('users.userId', '=', locals.userId)
    .select(['name'])
    .executeTakeFirst()

  await db.updateTable('users')
    .set({ name: user.name })
    .where('users.userId', '=', locals.userId)
    .execute()

  // Logging..
  await db.insertInto('activities').values({
    userId: locals.userId,
    summary: `Change name from ${previousUser.name} to ${user.name}`,
    detail: JSON.stringify({}),
    operation: 'create',
  }).execute()
  
  return json({
    message: 'Name Updated'
  })

};