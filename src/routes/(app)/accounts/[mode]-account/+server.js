import { accountSchema } from '$lib/others/schema'
import { db } from '$lib/server/db'
import { error, json } from '@sveltejs/kit'
import dayjs from 'dayjs'

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals }) => {

  const body = await request.json()
  const account = await accountSchema.validate(body, { abortEarly: false })

  let data = {
    userId: locals.userId,
    name: account.name
  }

  // Adding..
  const result = await db.insertInto('accounts').values(data).executeTakeFirst()

  // Logging
  await db.insertInto('activities').values({
    userId: locals.userId,
    summary: 'Added account named ' + data.name,
    detail: JSON.stringify(data),
    operation: 'create',
  }).execute()

  const accountId = Number(result.insertId)
  
  if (account.balance) {

    let incomeCategoryId

  // Check if incomeCategory exist with 'others' name
  const others = await db.selectFrom('income_categories as ic')
    .where('ic.name', '=', 'Others')
    .where('ic.userId', '=', locals.userId)
    .selectAll().executeTakeFirst()

    // If it does use its ID
    if (!others) {

      // If it doens't create it, get its insertId and use it
      const result = await db.insertInto('income_categories')
        .values({
          userId: locals.userId,
          name: 'Others'
        }).executeTakeFirst()

      // Logging
      await db.insertInto('activities').values({
        userId: locals.userId,
        summary: '(AUTO) Added `Others` in income category',
        detail: JSON.stringify({}),
        operation: 'create',
      }).execute()

      incomeCategoryId = Number(result.insertId)
    } else {
      incomeCategoryId = others.incomeCategoryId
    }

    // If has starting balance.. adding income as 'starting balance'
    let data = {
      userId: locals.userId,
      accountId,
      amount: account.balance,
      date: dayjs().format('YYYY-MM-DD'),
      time: dayjs().format('HH:mm'),
      title: 'Starting Balance',
      incomeCategoryId
    }
    
    await db.insertInto('incomes').values(data).execute()

    // Logging..
    await db.insertInto('activities').values({
      userId: locals.userId,
      summary: 'Added starting balance',
      detail: JSON.stringify(data),
      operation: 'create',
    }).execute()
  } 

  return json({
    message: 'Account Added'
  })

}

/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, url, locals }) => {

  const accountId = await url.searchParams.get('account-id')
  const body = await request.json()
  const account = await accountSchema.validate(body, { abortEarly: false })

  // Check Duplicate
  const result = await db.selectFrom('accounts')
    .where('accounts.name', '=', account.name)
    .where('accounts.userId', '=', locals.userId)
    .selectAll().executeTakeFirst()
    
    if (result) throw error(400, 'Account with this name already exist. Use different name.')
    
    let data = { name: account.name }

    // Getting account for logging..
    const previousAccount = await db.selectFrom('accounts')
      .where('accounts.userId', '=', locals.userId)
      .where('accounts.accountId', '=', accountId)
      .selectAll()
      .executeTakeFirst()

    // Adding..
    await db.updateTable('accounts')
      .set(data)
      .where('accounts.accountId', '=', accountId)
      .where('accounts.userId', '=', locals.userId)
      .executeTakeFirst()

    // Logging
    await db.insertInto('activities').values({
      userId: locals.userId,
      summary: 'Updated account',
      detail: `From ${JSON.stringify(previousAccount)}, To ${JSON.stringify(data)}`,
      operation: 'create',
    }).execute()

  return json({
    message: 'Account Updated'
  })

}