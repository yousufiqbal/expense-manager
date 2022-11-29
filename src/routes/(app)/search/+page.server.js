import { db } from '$lib/server/db';
import { sql } from 'kysely';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals, url }) => {

  const keyword = url.searchParams.get('keyword')
  
  const accounts = await db.selectFrom('accounts')
    .where('accounts.userId', '=', locals.userId)
    .selectAll().execute()

  const expenseCategories = await db.selectFrom('expense_categories as ec')
    .where('ec.userId', '=', locals.userId)
    .selectAll().execute()

  const incomeCategories = await db.selectFrom('income_categories as ic')
    .where('ic.userId', '=', locals.userId)
    .selectAll().execute()

  let results = []

  if (keyword) {

    const expenses = db
      .selectFrom('expenses as e')
      .leftJoin('expense_categories as ec', 'ec.expenseCategoryId', 'e.expenseCategoryId')
      .leftJoin('accounts as a', 'a.accountId', 'e.accountId')
      .select([
        'e.expenseId as id',
        'e.title',
        'e.date',
        'e.time',
        'a.name as accountName',
        'ec.name as categoryName',
        'e.amount',
        'e.description',
        'e.type',
        sql`null as fromAccountName`,
        sql`null as toAccountName`,
      ])
      .where('e.userId', '=', locals.userId)
      .where('e.title', 'like', '%' + keyword + '%')
      
    const incomes = db
      .selectFrom('incomes as i')
      .leftJoin('income_categories as ic', 'ic.incomeCategoryId', 'i.incomeCategoryId')
      .leftJoin('accounts as a', 'a.accountId', 'i.accountId')
      .select([
        'i.incomeId',
        'i.title',
        'i.date',
        'i.time',
        'a.name as accountName',
        'ic.name as categoryName',
        'i.amount',
        'i.description',
        'i.type',
        sql`null as fromAccountName`,
        sql`null as toAccountName`,
      ])
      .where('i.userId', '=', locals.userId)
      .where('i.title', 'like', '%' + keyword + '%')
      
    const transfers = db
      .selectFrom('transfers as t')
      .leftJoin('accounts as af', 'af.accountId', 't.fromAccountId')
      .leftJoin('accounts as at', 'at.accountId', 't.toAccountId')
      .select([
        't.transferId',
        't.title',
        't.date',
        't.time',
        sql`null as accountId`,
        sql`null as categoryId`,
        't.amount',
        't.description',
        't.type',
        'af.name as fromAccountName',
        'at.name as toAccountName',
      ])
      .where('t.userId', '=', locals.userId)
      .where('t.title', 'like', '%' + keyword + '%')
  
  
    results = await db.selectFrom(expenses.unionAll(incomes).unionAll(transfers).as('tr'))
      .orderBy('tr.date', 'desc')
      .orderBy('tr.time', 'desc')
      .selectAll().execute()
    
  }

  return { accounts, expenseCategories, incomeCategories, results }

}