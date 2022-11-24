import { profileNameSchema } from '$lib/others/schema';
import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals }) => {

  const body = await request.json()
  const user = await profileNameSchema.validate(body, { abortEarly: false })

  await db.updateTable('users')
    .set({ name: user.name })
    .where('users.userId', '=', locals.userId)
    .execute()
  
  return json({
    message: 'Name Updated'
  })

};