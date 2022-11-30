import bcryptjs from 'bcryptjs'
import { registerSchema } from '$lib/others/schema'
import { db } from '$lib/server/db'
import { error, json } from '@sveltejs/kit'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { JWT_KEY, PWD } from '$env/static/private'
// import nodemailer from 'nodemailer'
// import { dev } from '$app/environment'

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
  const token = crypto.randomBytes(30).toString('hex')
  await db.insertInto('users')
    .values({
      ...form,
      password: await bcryptjs.hash(form.password, 10),
      token,
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

  // // Sending verification email
  // let transporter = nodemailer.createTransport({
  //   service: 'Outlook365',
  //   auth: {
  //     user: 'yousufiqbalhashim@outlook.com',
  //     pass: PWD,
  //   },
  // });

  // try {
  //   let info = await transporter.sendMail({
  //     from: { name: 'Expense Manager', address: 'yousufiqbalhashim@outlook.com' },
  //     to: form.email,
  //     // replyTo: client.email,
  //     subject: `Complete Your Verification`,
  //     // text: client.message,
  //     html: `
  //       <h1>Complete Your Verification</h1>
  //       <h2>Expense Manager</h2>
  //       <p>Click on the following link to verify your email</p>
  //       <br>
  //       <a href="https://em.yousufiqbal.dev/verify-email?email=${form.email}&token=${token}">Verify Email</a>
  //     `,
  //   });
  
  //   if (dev) console.log("Message sent: %s", info.messageId);
    
  // } catch (error) {
  //   console.log(error)
  // }

  
  // Preparing Payload..
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
    summary: 'Joined',
    detail: JSON.stringify({}),
    operation: 'other',
  }).execute()
  
  return json({
    message: 'Registered'
  })

}