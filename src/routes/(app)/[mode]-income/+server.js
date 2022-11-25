import { generateIncomeSchema } from '$lib/others/schema';
import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals }) => {

  const body = await request.json()

  // Validating..
  const accounts = await db.selectFrom('accounts')
    .where('accounts.userId', '=', locals.userId)
    .selectAll().execute()
  
  const incomeCategories = await db.selectFrom('income_categories')
    .where('income_categories.userId', '=', locals.userId)
    .selectAll().execute()

  const incomeSchema = generateIncomeSchema(accounts.map(a => String(a.accountId)), incomeCategories.map(a => String(a.incomeCategoryId)))
  const income = await incomeSchema.validate(body, { abortEarly: false })

  // Adding income..
  await db.insertInto('incomes')
    .values({
      accountId: income.accountId,
      incomeCategoryId: income.incomeCategoryId,
      date: income.date, 
      time: income.time,
      title: income.title,
      amount: income.amount,
      description: income.description || null,
      userId: locals.userId
    }).execute()

  // Responding..
  return json({
    message: 'Income added'
  })


};