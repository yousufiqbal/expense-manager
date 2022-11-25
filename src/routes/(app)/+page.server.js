import { db } from '$lib/server/db';
import dayjs from 'dayjs'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals, url }) => {

  let start = url.searchParams.get('start') || dayjs().startOf('month').format('YYYY-MM-DD')
  let end = url.searchParams.get('end') || dayjs().endOf('month').format('YYYY-MM-DD')

  console.log(start, end)

  const transactions = await db.selectFrom('incomes')
    .where('incomes.userId', '=', locals.userId)
    .where('date', '>=', start)
    .where('date', '<=', end)
    .selectAll()
    .unionAll(
      db.selectFrom('expenses')
      .where('expenses.userId', '=', locals.userId)
      .where('date', '>=', start)
      .where('date', '<=', end)
      .selectAll()
      )
      .unionAll(
        db.selectFrom('transfers')
        .where('transfers.userId', '=', locals.userId)
        .where('date', '>=', start)
        .where('date', '<=', end)
        .selectAll()
      )
      .orderBy('date', 'desc')
      .execute()

    console.log(transactions.length)

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