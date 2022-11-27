import { coalesce, db } from '$lib/server/db';
import dayjs from 'dayjs';
import { sql } from 'kysely';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals, url }) => {

  const { sum } = db.fn

  const accountIds = url.searchParams.get('accounts')?.split('-') || []
  const tab = url.searchParams.get('tab')

  let start = url.searchParams.get('start') || dayjs().startOf('month').format('YYYY-MM-DD')
  let end = url.searchParams.get('end') || dayjs().endOf('month').format('YYYY-MM-DD');

  const transfers = db.selectFrom('transfers as t')
    .select([sql`'Transfer' as name`, coalesce(sum('t.amount'), 0).as('total')])
    .where('t.userId', '=', locals.userId)
    .where('t.date', '>=', start)
    .where('t.date', '<=', end)
    .if(accountIds.length != 0, qb => qb.where('t.fromAccountId', 'in', accountIds))

  const expenses = db.selectFrom('expenses as e')
    .select(['e.expenseCategoryId', sum('e.amount').as('total')])
    .where('e.userId', '=', locals.userId)
    .where('e.date', '>=', start)
    .where('e.date', '<=', end)
    .if(accountIds.length != 0, qb => qb.where('e.accountId', 'in', accountIds))
    .groupBy('e.expenseCategoryId')


  const result = await db.selectFrom('expense_categories as ec')
    .leftJoin(expenses.as('r'), 'r.expenseCategoryId', 'ec.expenseCategoryId')
    .select(['ec.name', sql`COALESCE(r.total, 0) as total`])
    .unionAll(transfers)
    .execute()

  const allTotal = result.map(s => s.total).reduce((a, b) => +a + +b, 0)

  const stats = result.map(s => {
    return {
      name: s.name,
      total: s.total,
      percentage: ((s.total / allTotal) * 100).toFixed(0)
    }
  })

  const accounts = await db.selectFrom('accounts')
    .where('accounts.userId', '=', locals.userId)
    .selectAll().execute()

  return { accounts, stats }

}