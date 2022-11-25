import { generateExpenseSchema } from '$lib/others/schema';
import { generateIncomeSchema } from '$lib/others/schema';
import { generateTransferSchema } from '$lib/others/schema';
import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals }) => {

  const body = await request.json()

  if (body.intent == 'expense') {

    // Validating Expense..
    const accounts = await db.selectFrom('accounts')
      .where('accounts.userId', '=', locals.userId)
      .selectAll().execute()

    const expenseCategories = await db.selectFrom('expense_categories')
      .where('expense_categories.userId', '=', locals.userId)
      .selectAll().execute()

    const expenseSchema = generateExpenseSchema(accounts.map(a => String(a.accountId)), expenseCategories.map(a => String(a.expenseCategoryId)))
    const expense = await expenseSchema.validate(body, { abortEarly: false })

    // Adding Expense..
    await db.insertInto('expenses')
      .values({
        accountId: expense.accountId,
        expenseCategoryId: expense.expenseCategoryId,
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
  }

  if (body.intent == 'income') {

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

  }

  if (body.intent == 'transfer') {
    
    // Validating..
    const accounts = await db.selectFrom('accounts')
      .where('accounts.userId', '=', locals.userId)
      .selectAll().execute()


    const transferSchema = generateTransferSchema(accounts.map(a => String(a.accountId)))
    const transfer = await transferSchema.validate(body, { abortEarly: false })

    // Adding transfer..
    await db.insertInto('transfers')
      .values({
        date: transfer.date, 
        time: transfer.time,
        fromAccountId: transfer.fromAccountId,
        toAccountId: transfer.toAccountId,
        title: transfer.title,
        amount: transfer.amount,
        description: transfer.description || null,
        userId: locals.userId
      }).execute()

    // Responding..
    return json({
      message: 'Transfer added'
    })

  }

};

/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, locals }) => {

  const body = await request.json()

  if (body.intent == 'expense') {}
  if (body.intent == 'income') {}
  if (body.intent == 'transfer') {}
  
};