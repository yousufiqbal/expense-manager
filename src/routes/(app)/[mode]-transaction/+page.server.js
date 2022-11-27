import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat)

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals, params, url }) => {

  let transaction 
  if (params.mode == 'edit') {
    
    let table, column, id
    if (url.searchParams.has('expense-id')) {
      table = 'expenses'
      column = 'expenseId'
      id = url.searchParams.get('expense-id')
    }
    
    if (url.searchParams.has('income-id')) {
      table = 'incomes'
      column = 'incomeId'
      id = url.searchParams.get('income-id')
    }
    
    if (url.searchParams.has('transfer-id')) {
      table = 'transfers'
      column = 'transferId'
      id = url.searchParams.get('transfer-id')
    }
    
    transaction = await db.selectFrom(table)
      .where(table + '.userId', '=', locals.userId)
      .where(table + '.' + column, '=', +id)
      .selectAll().executeTakeFirst()

    if (!transaction) throw redirect(301, '/')

    // Converting dates for inputs..
    transaction.date = dayjs(transaction.date).format('YYYY-MM-DD')
    transaction.time = dayjs(transaction.time, 'HH:mm:ss').format('HH:mm:ss')

  }


  const accounts = await db.selectFrom('accounts')
    .where('accounts.userId', '=', locals.userId)
    .orderBy('accounts.name', 'asc')
    .selectAll().execute()
    
  const expenseCategories = await db.selectFrom('expense_categories')
    .where('expense_categories.userId', '=', locals.userId)
    .orderBy('expense_categories.name', 'asc')
    .selectAll().execute()
    
  const incomeCategories = await db.selectFrom('income_categories')
    .where('income_categories.userId', '=', locals.userId)
    .orderBy('income_categories.name', 'asc')
    .selectAll().execute()
  
  return { accounts, expenseCategories, incomeCategories, transaction }
};