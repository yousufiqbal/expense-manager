import { loginSchema } from '$lib/others/schema'
import { db } from '$lib/server/db'
import { error, json, redirect } from '@sveltejs/kit'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_KEY } from '$env/static/private'

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, cookies }) => {

  const body = await request.json()
  const credentials = await loginSchema.validate(body, { abortEarly: false })

  // Checking email..
  const user = await db.selectFrom('users')
    .where('users.email', '=', credentials.email)
    .selectAll().executeTakeFirst()

  if (!user) {
    throw error(400, 'Incorrect email or password')
  }
  
  // Checking password..
  if (!await bcryptjs.compare(credentials.password, user.password)) {
    throw error(400, 'Incorrect email or password')
  }

  // Generating payload
  const payload = {
    name: user.name,
    userId: user.userId,
    email: user.email,
    currency: user.currency,
    isVerified: user.isVerified
  }
  const fact = jwt.sign(payload, JWT_KEY, { expiresIn: 7 * 86400,  })
  
  // Setting cookie
  cookies.set('fact', fact, { maxAge: 7 * 86400, path: '/', secure: false })
  
  return json({
    message: 'Logged In'
  })

}