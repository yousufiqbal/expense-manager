import { coalesce, db } from '$lib/server/db';
import dayjs from 'dayjs';
import { sql } from 'kysely';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals, url }) => {

  const accountIds = url.searchParams.get('accounts')?.split('-') || []
  const tab = url.searchParams.get('tab')

  let start = url.searchParams.get('start') || dayjs().startOf('month').format('YYYY-MM-DD')
  let end = url.searchParams.get('end') || dayjs().endOf('month').format('YYYY-MM-DD');

  let stats = [];

  // ${accountIds.length != 0 ? 'AND e.accountId IN' + sql.join(accountIds) : ''}
  // console.log(accountIds)

  let query = `
    WITH result AS (
      SELECT *
      FROM expenses e
      WHERE e.userId = ${locals.userId}
      AND e.date BETWEEN ${start} AND ${end}
      GROUP BY e.expenseCategoryId
      )
      
      SELECT ec.name, COALESCE(result.amount, 0) AS total
      FROM expense_categories ec
    LEFT JOIN result ON result.expenseCategoryId = ec.expenseCategoryId
    
    UNION ALL 
    
    SELECT 'Transfer' NAME, COALESCE(t.amount, 0) AS total
    FROM transfers t
    WHERE t.userId = ${locals.userId}
    AND t.date BETWEEN ${start} AND ${end}
    GROUP BY t.transferId
  `

  const result = (await sql(query).execute(db)).rows

  console.log(result)

  const accounts = await db.selectFrom('accounts')
    .where('accounts.userId', '=', locals.userId)
    .selectAll().execute()

  return { accounts, stats }

}