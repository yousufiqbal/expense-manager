import { db } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({params}) => {
  const account = await db.selectFrom('accounts')
    .where('accounts.accountId', '=', params.id)
    .selectAll().executeTakeFirst()
  return { account }
};