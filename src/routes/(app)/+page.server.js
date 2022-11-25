import { db } from '$lib/server/db';
import dayjs from 'dayjs'

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals }) => {

  const transactions = await db.selectFrom('incomes')
    .where('incomes.userId', '=', locals.userId)
    .selectAll()
    .unionAll(
      db.selectFrom('expenses')
        .where('expenses.userId', '=', locals.userId)
        .selectAll()
    )
    .unionAll(
      db.selectFrom('transfers')
        .where('transfers.userId', '=', locals.userId)
        .selectAll()
    )
    .orderBy('date', 'desc')
    .execute()

  const uniqueDates = [...new Set(transactions.map(t => +t.date))]

  let transactionGroups = []

  for (const date of uniqueDates) {
    transactionGroups.push({
      date,
      totalIncome: 0,
      totalExpense: 0,
      transactions: [...transactions.filter(t => +t.date == date)]
    })
  }

  return { transactionGroups }

};