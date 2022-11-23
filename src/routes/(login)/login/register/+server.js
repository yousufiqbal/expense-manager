import bcryptjs from 'bcryptjs'
import { registerSchema } from '$lib/others/schema'
import { db } from '$lib/server/db'
import { error, json } from '@sveltejs/kit'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { JWT_KEY } from '$env/static/private'

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, cookies }) => {

  const body = await request.json()
  const form = await registerSchema.validate(body, { abortEarly: false })

  // Checking email availability..
  const previousUser = await db.selectFrom('users')
    .where('users.email', '=', form.email)
    .selectAll().executeTakeFirst()

  if (previousUser) throw error(400, 'Email already in use. Please use different one.')

  // Registering..
  await db.insertInto('users')
    .values({
      ...form,
      password: await bcryptjs.hash(form.password, 10),
      token: crypto.randomBytes(30).toString('hex')
    }).execute()

  // Get new user id
  const user = await db.selectFrom('users')
    .where('users.email', '=', form.email)
    .selectAll().executeTakeFirst()

  // Logging In..
  const payload = {
    userId: user.userId,
    email: user.email,
    currency: user.currency,
    isVerified: user.isVerified
  }
  const fact = jwt.sign(payload, JWT_KEY, { expiresIn: 7 * 86400 })
    
  // Setting cookie
  cookies.set('fact', fact, { maxAge: 7 * 86400, path: '/' })

  return json({
    message: 'Registered & Logged In'
  })

}