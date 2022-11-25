import { generateExpenseSchema } from '$lib/others/schema';
import { generateIncomeSchema } from '$lib/others/schema';
import { generateTransferSchema } from '$lib/others/schema';
import { db } from '$lib/server/db';
import { json, redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals, url }) => {

  const intent = url.searchParams.get('tab')
  if (!intent) throw redirect(301, '/')
  
  if (intent == 'expense') {
    
    // Validating Expense..
    const body = await request.json()
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
  
  if (intent == 'income') {
    
    // Validating..
    const body = await request.json()
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
    
  if (intent == 'transfer') {
      
    // Validating..
    const body = await request.json()
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
export const PUT = async ({ request, locals, url }) => {

  const intent = url.searchParams.get('tab')
  if (!intent) throw redirect(301, '/')

  // Current State..
  let current
  if (url.searchParams.get('expense-id')) current = 'expense'
  if (url.searchParams.get('income-id')) current = 'income'
  if (url.searchParams.get('transfer-id')) current = 'transfer'

  // The ID...
  const id = url.searchParams.get(current+'-id')

  // Updating if current state and intent equals...
  if (current == intent) {

    if (current == 'expense') {

    // Validating Expense..
    const body = await request.json()
    const accounts = await db.selectFrom('accounts')
      .where('accounts.userId', '=', locals.userId)
      .selectAll().execute()
      
    const expenseCategories = await db.selectFrom('expense_categories')
      .where('expense_categories.userId', '=', locals.userId)
      .selectAll().execute()
      
    const expenseSchema = generateExpenseSchema(accounts.map(a => String(a.accountId)), expenseCategories.map(a => String(a.expenseCategoryId)))
    const expense = await expenseSchema.validate(body, { abortEarly: false })
    
    // Adding Expense..
    await db.updateTable('expenses')
      .where('expenses.userId', '=', locals.userId)
      .where('expenses.expenseId', '=', id)
      .set({
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
      message: 'Expense updated'
    })
    }

    if (current == 'income') {

      // Validating..
      const body = await request.json()
      const accounts = await db.selectFrom('accounts')
        .where('accounts.userId', '=', locals.userId)
        .selectAll().execute()

      const incomeCategories = await db.selectFrom('income_categories')
      .where('income_categories.userId', '=', locals.userId)
        .selectAll().execute()

      const incomeSchema = generateIncomeSchema(accounts.map(a => String(a.accountId)), incomeCategories.map(a => String(a.incomeCategoryId)))
      const income = await incomeSchema.validate(body, { abortEarly: false })

      // Adding income..
      await db.updateTable('incomes')
        .where('incomes.userId', '=', locals.userId)
        .where('incomes.incomeId', '=', id)
        .set({
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
          message: 'Income Updated'
        })
  
    }

    if (current == 'transfer') {

      // Validating..
      const body = await request.json()
      const accounts = await db.selectFrom('accounts')
        .where('accounts.userId', '=', locals.userId)
        .selectAll().execute()

      const transferSchema = generateTransferSchema(accounts.map(a => String(a.accountId)))
      const transfer = await transferSchema.validate(body, { abortEarly: false })

      // Adding transfer..
      await db.updateTable('transfers')
        .where('transfers.userId', '=', locals.userId)
        .where('transfers.transferId', '=', id)
        .set({
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
        message: 'Transfer Updated'
      })
    }

  }
  
  // Deleting current if intent and current differs
  if (current != intent) {

    // Deleting...
    if (current == 'expense') {
      await db.deleteFrom('expenses')
        .where('expenses.userId', '=', locals.userId)
        .where('expenses.expenseId', '=', id)
        .executeTakeFirst()
    }
    if (current == 'income') {
      await db.deleteFrom('incomes')
        .where('incomes.userId', '=', locals.userId)
        .where('incomes.incomeId', '=', id)
        .executeTakeFirst()
    }
    if (current == 'transfer') {
      await db.deleteFrom('transfers')
        .where('transfers.userId', '=', locals.userId)
        .where('transfers.transferId', '=', id)
        .executeTakeFirst()
    }

  // AFTER DELETING ADDING NEW...
  // ----------------
  if (intent == 'expense') {
    
    // Validating Expense..
    const body = await request.json()
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
      message: 'Converted To Expense'
    })
  }
  
  if (intent == 'income') {
    
    // Validating..
    const body = await request.json()
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
        message: 'Converted To Income'
      })
      
  }
    
  if (intent == 'transfer') {
      
    // Validating..
    const body = await request.json()
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
      message: 'Converted To Transfer'
    })

  }}

};