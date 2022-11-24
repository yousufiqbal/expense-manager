import { accountSchema } from '$lib/others/schema'
import { db } from '$lib/server/db'
import { error, json } from '@sveltejs/kit'
import dayjs from 'dayjs'

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, cookies }) => {

  const body = await request.json()
  const account = await accountSchema.validate(body, { abortEarly: false })

  // Adding..
  const result = await db.insertInto('accounts')
    .values({
      name: account.name
    }).executeTakeFirst()

  const accountId = Number(result.insertId)

  // If has starting balance.. adding income as 'starting balance'
  await db.insertInto('incomes')
    .values({
      accountId,
      amount: account.balance,
      date: dayjs().format('YYYY-MM-DD'),
      time: dayjs().format('HH:mm'),
      title: 'Starting Balance',
      categoryId: 1 // Others in income category
    }).execute()

  return json({
    message: 'Account Added'
  })

}

/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, url }) => {

  const accountId = await url.searchParams.get('account-id')
  const body = await request.json()
  const account = await accountSchema.validate(body, { abortEarly: false })

  // Check Duplicate
  const result = await db.selectFrom('accounts')
    .where('accounts.name', '=', account.name)
    .selectAll().executeTakeFirst()
  
  if (result) throw error(400, 'Account with this name already exist. Use different name.')

  // Adding..
  await db.updateTable('accounts')
    .set({
      name: account.name
    })
    .where('accounts.accountId', '=', accountId)
    .executeTakeFirst()

  return json({
    message: 'Account Updated'
  })

}