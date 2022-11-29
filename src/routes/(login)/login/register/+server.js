import bcryptjs from 'bcryptjs'
import { registerSchema } from '$lib/others/schema'
import { db } from '$lib/server/db'
import { error, json, redirect } from '@sveltejs/kit'
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

  // Geting new user id for default accounts and categories and logging..
  const user = await db.selectFrom('users')
    .where('users.email', '=', form.email)
    .selectAll().executeTakeFirst()
    
    // Preparing accounts and categories for new user..
    await db.insertInto('accounts')
    .values([
      { name: 'Personal', userId: user.userId },
      { name: 'Savings', userId: user.userId },
    ]).execute()
    
    await db.insertInto('expense_categories')
    .values([
      { name: 'Grocery',  userId: user.userId },
      { name: 'Health',  userId: user.userId },
      { name: 'Transport',  userId: user.userId },
      { name: 'Clothing',  userId: user.userId },
      { name: 'Bills',  userId: user.userId },
      { name: 'Others',  userId: user.userId },
    ]).execute()
    
  await db.insertInto('income_categories')
  .values([
    { name: 'Salary',  userId: user.userId },
    { name: 'Bonus',  userId: user.userId },
    { name: 'Allowance',  userId: user.userId },
    { name: 'Others',  userId: user.userId },
  ]).execute()
  
  // Logging In..
  const payload = {
    name: user.name,
    userId: user.userId,
    email: user.email,
    currency: user.currency,
    isVerified: user.isVerified
  }
  const fact = jwt.sign(payload, JWT_KEY, { expiresIn: 7 * 86400 })
  
  // Setting cookie
  cookies.set('fact', fact, { maxAge: 7 * 86400, path: '/' })

  // Logging..
  await db.insertInto('activities').values({
    userId: user.userId,
    summary: 'Joined Expense Manager',
    detail: JSON.stringify({}),
    operation: 'other',
  }).execute()
  
  return json({
    message: 'Registered'
  })

}