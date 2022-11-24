import { db } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({params, locals}) => {
  const account = await db.selectFrom('accounts')
    .where('accounts.accountId', '=', params.id)
    .where('accounts.userId', '=', locals.userId)
    .selectAll().executeTakeFirst()
  return { account }
};