import { accountSchema } from '$lib/others/schema'
import { db } from '$lib/server/db'
import { json } from '@sveltejs/kit'
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