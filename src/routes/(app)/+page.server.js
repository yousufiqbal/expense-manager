
import { db } from '$lib/server/db';
import dayjs from 'dayjs'
import { sql } from 'kysely';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals, url }) => {

  let start = url.searchParams.get('start') || dayjs().startOf('month').format('YYYY-MM-DD')
  let end = url.searchParams.get('end') || dayjs().endOf('month').format('YYYY-MM-DD')

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
      sql `null as fromAccountName`,
      sql `null as toAccountName`,
    ])
    .where('e.userId', '=', locals.userId)
    .where('e.date', '>=', start)
    .where('e.date', '<=', end)
    
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
    .where('i.date', '>=', start)
    .where('i.date', '<=', end)
    
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
    .where('t.date', '>=', start)
    .where('t.date', '<=', end)


  const transactions = await db.selectFrom(expenses.unionAll(incomes).unionAll(transfers).as('tr'))
    .orderBy('tr.date', 'desc')
    .orderBy('tr.time', 'desc')
    .selectAll().execute()

  console.log(transactions)

  const uniqueDates = [...new Set(transactions.map(t => +t.date))]

  let transactionGroups = []

  for (const date of uniqueDates) {

    // Filtered transaction 'ft'
    const ft = [...transactions.filter(t => +t.date == date)]

    transactionGroups.push({
      date,
      totalIncome: ft.filter(t => t.type == 'income').map(t => t.amount).reduce((a, b) => +a + +b, 0),
      totalExpense: ft.filter(t => t.type == 'expense').map(t => t.amount).reduce((a, b) => +a + +b, 0) + ft.filter(t => t.type == 'transfer').map(t => t.amount).reduce((a, b) => +a + +b, 0),
      transactions: ft,
    })
  }

  return { transactionGroups }

};