import { db } from '$lib/server/db';
import dayjs from 'dayjs';
import { sql } from 'kysely';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals, url }) => {

  const accountIds = url.searchParams.get('accounts')?.split('-') || []
  const tab = url.searchParams.get('tab')

  let start = url.searchParams.get('start') || dayjs().startOf('month').format('YYYY-MM-DD')
  let end = url.searchParams.get('end') || dayjs().endOf('month').format('YYYY-MM-DD');

  let categories = []

  console.log(parseInt(accountIds.join(', ')))

  if (tab == 'expense') {
    categories = (await sql`
      WITH resultSet AS (
        SELECT ec.expenseCategoryId, ec.name, COALESCE(SUM(e.amount), 0) AS total
        FROM expense_categories ec
        LEFT JOIN expenses e ON e.expenseCategoryId = ec.expenseCategoryId
        WHERE ec.userId = ${locals.userId}
        AND e.accountId IN (${sql.join(accountIds)})
        AND e.date BETWEEN ${start} AND ${end}
        GROUP BY ec.expenseCategoryId
      )
      
      SELECT ec.name, coalesce(total, 0) as total
      FROM expense_categories ec
      LEFT JOIN resultSet ON resultSet.expenseCategoryId = ec.expenseCategoryId
      WHERE ec.userId = ${locals.userId}
      ORDER by total desc

    `.execute(db)).rows
    }

  let accounts = await db.selectFrom('accounts')
    .where('accounts.userId', '=', locals.userId)
    .selectAll().execute()
    
  return { accounts, categories }

};