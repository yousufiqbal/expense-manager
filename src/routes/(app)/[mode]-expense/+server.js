import { generateExpenseSchema } from '$lib/others/schema';
import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals }) => {

  const body = await request.json()

  // Validating..
  const accounts = await db.selectFrom('accounts')
    .where('accounts.userId', '=', locals.userId)
    .selectAll().execute()
  
  const expenseCategories = await db.selectFrom('categories')
    .where('categories.userId', '=', locals.userId)
    .where('categories.belongsTo', '=', 'expense')
    .selectAll().execute()

  const expenseSchema = generateExpenseSchema(accounts.map(a => String(a.accountId)), expenseCategories.map(a => String(a.categoryId)))
  const expense = await expenseSchema.validate(body, { abortEarly: false })
  
  // Adding expense..
  await db.insertInto('expenses')
    .values({
      accountId: expense.accountId,
      categoryId: expense.expenseCategoryId,
      date: expense.date, 
      time: expense.time,
      title: expense.title,
      amount: expense.amount,
      description: expense.description || null,
      userId: locals.userId
    }).execute()

  // Responding..
  return json({
    message: 'Expense added'
  })


};