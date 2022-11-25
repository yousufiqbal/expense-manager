import { changePasswordSchema } from '$lib/others/schema';
import { db } from '$lib/server/db';
import { error, json } from '@sveltejs/kit';
import bcryptjs from 'bcryptjs'

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals }) => {

  // Validating..
  const body = await request.json()
  const form = await changePasswordSchema.validate(body, { abortEarly: false})

  // Checking previous password..
  const user = await db.selectFrom('users')
    .where('users.userId', '=', locals.userId)
    .selectAll().executeTakeFirst()

  if (!await bcryptjs.compare(form.currentPassword, user.password)) {
    throw error(400, 'Incorrect password')
  }

  // Updating..
  await db.updateTable('users')
    .where('users.userId', '=', locals.userId)
    .set({
      password: await bcryptjs.hash(form.newPassword, 10)
    }).execute()

  // ..
  return json({
    message: 'Password changed'
  })

};