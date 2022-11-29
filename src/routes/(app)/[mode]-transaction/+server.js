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

    let data = {
      accountId: expense.accountId,
      expenseCategoryId: expense.expenseCategoryId,
      date: expense.date, 
      time: expense.time,
      title: expense.title,
      amount: expense.amount,
      description: expense.description || null,
      userId: locals.userId
    }
    
    // Adding Expense..
    await db.insertInto('expenses').values(data).executeTakeFirst()
    
    // Logging
    await db.insertInto('activities').values({
      userId: locals.userId,
      summary: 'Added expense',
      detail: JSON.stringify(data),
      operation: 'create',
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

    let data = {
      accountId: income.accountId,
      incomeCategoryId: income.incomeCategoryId,
      date: income.date, 
      time: income.time,
      title: income.title,
      amount: income.amount,
      description: income.description || null,
      userId: locals.userId
    }

    // Adding income..
    await db.insertInto('incomes').values(data).execute()

    // Logging
    await db.insertInto('activities').values({
      userId: locals.userId,
      summary: 'Added income',
      detail: JSON.stringify(data),
      operation: 'create',
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

    let data = {
      date: transfer.date, 
      time: transfer.time,
      fromAccountId: transfer.fromAccountId,
      toAccountId: transfer.toAccountId,
      title: transfer.title,
      amount: transfer.amount,
      description: transfer.description || null,
      userId: locals.userId
    }

    // Adding transfer..
    await db.insertInto('transfers').values(data).execute()
    
    // Logging..
    await db.insertInto('activities').values({
      userId: locals.userId,
      summary: 'Added transfer',
      detail: JSON.stringify(data),
      operation: 'create',
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
    
    const previousExpense = await db.selectFrom('expenses')
      .where('expenses.userId', '=', locals.userId)
      .where('expenses.expenseId', '=', id)
      .selectAll().executeTakeFirst()

    let data = {
      accountId: expense.accountId,
      expenseCategoryId: expense.expenseCategoryId,
      date: expense.date, 
      time: expense.time,
      title: expense.title,
      amount: expense.amount,
      description: expense.description || null,
      userId: locals.userId
    }

    // Updating Expense..
    await db.updateTable('expenses')
      .where('expenses.userId', '=', locals.userId)
      .where('expenses.expenseId', '=', id)
      .set(data).execute()

    // Logging
    await db.insertInto('activities').values({
      userId: locals.userId,
      summary: 'Updated Expense',
      detail: `From ${previousExpense}, To ${data}`,
      operation: 'update',
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

      // Getting preivous icome..
      const previousIncome = await db.selectFrom('incomes')
        .where('incomes.userId', '=', locals.userId)
        .where('incomes.incomeId', '=', id)
        .selectAll().executeTakeFirst()

      let data = {
        accountId: income.accountId,
        incomeCategoryId: income.incomeCategoryId,
        date: income.date, 
        time: income.time,
        title: income.title,
        amount: income.amount,
        description: income.description || null,
        userId: locals.userId
      }

      // Updating income..
      await db.updateTable('incomes')
        .where('incomes.userId', '=', locals.userId)
        .where('incomes.incomeId', '=', id)
        .set(data).execute()

      // Logging
      await db.insertInto('activities').values({
        userId: locals.userId,
        summary: 'Updated Income',
        detail: `From ${previousIncome}, To ${data}`,
        operation: 'update',
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

      // Getting preivous transfer..
      const previousTransfer = await db.selectFrom('incomes')
        .where('incomes.userId', '=', locals.userId)
        .where('incomes.incomeId', '=', id)
        .selectAll().executeTakeFirst()

      let data = {
        date: transfer.date, 
        time: transfer.time,
        fromAccountId: transfer.fromAccountId,
        toAccountId: transfer.toAccountId,
        title: transfer.title,
        amount: transfer.amount,
        description: transfer.description || null,
        userId: locals.userId
      }

      // Updating transfer..
      await db.updateTable('transfers')
        .where('transfers.userId', '=', locals.userId)
        .where('transfers.transferId', '=', id)
        .set().execute()

      // Logging..
      await db.insertInto('activities').values({
        userId: locals.userId,
        summary: 'Updated transfer',
        detail: `From ${previousTransfer}, To ${data}`,
        operation: 'update',
      }).execute()

      // Responding..
      return json({
        message: 'Transfer Updated'
      })
    }

  }
  
  // Deleting current if intent and current differs
  if (current != intent) {

    // Getting previous for logging..
    const previous = await db.selectFrom(`${current}s`)
      .where(`${current}s.userId`, `=`, locals.userId)
      .where(`${current}s.${current}Id`, `=`, id)
      .executeTakeFirst()

    // Deleting..
    await db.deleteFrom(`${current}s`)
      .where(`${current}s.userId`, `=`, locals.userId)
      .where(`${current}s.${current}Id`, `=`, id)
      .execute()

    // Logging..
    await db.insertInto(`activities`).values({
      userId: locals.userId,
      summary: `Deleted ${current} for conversion to ${intent}`,
      detail: JSON.stringify(previous),
      operation: 'create',
    }).execute()


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
    
    let data = {
      accountId: expense.accountId,
      expenseCategoryId: expense.expenseCategoryId,
      date: expense.date, 
      time: expense.time,
      title: expense.title,
      amount: expense.amount,
      description: expense.description || null,
      userId: locals.userId
    }

    // Adding Expense..
    await db.insertInto('expenses')
      .values(data).execute()

    // Logging
    await db.insertInto('activities').values({
      userId: locals.userId,
      summary: `Added expense after removing ${current} with id=${id}`,
      detail: JSON.stringify(data),
      operation: 'create',
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

    let data = {
      accountId: income.accountId,
      incomeCategoryId: income.incomeCategoryId,
      date: income.date, 
      time: income.time,
      title: income.title,
      amount: income.amount,
      description: income.description || null,
      userId: locals.userId
    }

    // Adding income..
    await db.insertInto('incomes')
      .values(data).execute()

    // Logging
    await db.insertInto('activities').values({
      userId: locals.userId,
      summary: `Added income after removing ${current} with id=${id}`,
      detail: JSON.stringify(data),
      operation: 'create',
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

    let data = {
      date: transfer.date, 
      time: transfer.time,
      fromAccountId: transfer.fromAccountId,
      toAccountId: transfer.toAccountId,
      title: transfer.title,
      amount: transfer.amount,
      description: transfer.description || null,
      userId: locals.userId
    }

    // Adding transfer..
    await db.insertInto('transfers')
      .values(data).execute()

    // Logging
    await db.insertInto('activities').values({
      userId: locals.userId,
      summary: `Added transfer after removing ${current} with id=${id}`,
      detail: JSON.stringify(data),
      operation: 'create',
    }).execute()

    // Responding..
    return json({
      message: 'Converted To Transfer'
    })

  }}

};

/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ locals, url }) => {

  const tab = url.searchParams.get('tab')
  if (!tab) throw redirect(301, '/')

  if (tab == 'expense') {

    const expenseId = url.searchParams.get('expense-id')
    
    const expense = await db.selectFrom('expenses')
      .where('expenses.expenseId', '=', expenseId)
      .where('expenses.userId', '=', locals.userId)
      .selectAll()
      .executeTakeFirst()

      await db.deleteFrom('expenses')
      .where('expenses.userId', '=', locals.userId)
      .where('expenses.expenseId', '=', expenseId)
      .execute()
    
    // Logging..
    await db.insertInto('activities').values({
      userId: locals.userId,
      summary: 'Removed Expense',
      detail: JSON.stringify(expense),
      operation: 'delete',
    }).execute()
    
    return json({ message: 'Removed ' + tab})
  }

  if (tab == 'income') {
    const incomeId = url.searchParams.get('income-id')

    const income = await db.selectFrom('incomes')
      .where('incomes.incomeId', '=', incomeId)
      .where('incomes.userId', '=', locals.userId)
      .selectAll()
      .executeTakeFirst()
      
      await db.deleteFrom('incomes')
      .where('incomes.userId', '=', locals.userId)
      .where('incomes.incomeId', '=', incomeId)
      .execute()
      
    // Logging..
    await db.insertInto('activities').values({
      userId: locals.userId,
      summary: 'Removed Income',
      detail: JSON.stringify(income),
      operation: 'delete'
    }).execute()
    
    return json({ message: 'Removed ' + tab})
  }
  
  if (tab == 'transfer') {
    
    const transferId = url.searchParams.get('transfer-id')
    
    const transfer = await db.selectFrom('transfers')
      .where('transfers.transferId', '=', transferId)
      .where('transfers.userId', '=', locals.userId)
      .selectAll()
      .executeTakeFirst()    
      
      await db.deleteFrom('transfers')
      .where('transfers.userId', '=', locals.userId)
      .where('transfers.transferId', '=', transferId)
      .execute()

    // Logging..
    await db.insertInto('activities').values({
      userId: locals.userId,
      summary: 'Removed Transfer',
      detail: JSON.stringify(transfer),
      operation: 'delete',
    }).execute()
    
    return json({ message: 'Removed ' + tab })
    
  }

  // If cursor came here.. for some reason
  throw redirect(301, '/')

}