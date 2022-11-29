import { JWT_KEY } from '$env/static/private';
import { db } from '$lib/server/db';
import { error, json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken'

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals, cookies }) => {

  // Validation
  const user = await request.json()
  if (!user.currency || user.currency.length > 4) {
    throw error(400, 'Invalid Data')
  }

  // Updating
  await db.updateTable('users')
    .where('users.userId', '=', locals.userId)
    .set({
      currency: user.currency
    }).execute()
    
  // Logging..
  await db.insertInto('activities').values({
    userId: locals.userId,
    summary: `Changed currency from ${locals.currency} to ${user.currency}`,
    detail: JSON.stringify({}),
    operation: 'create',
  }).execute()

  // Mutating payload..
  const payload = {
    ...locals,
    currency: user.currency,
  }
  const fact = jwt.sign(payload, JWT_KEY)

  // Setting cookie
  cookies.set('fact', fact, { maxAge: 7 * 86400, path: '/', secure: false })

  return json({
    message: 'Currency updated'
  })

};