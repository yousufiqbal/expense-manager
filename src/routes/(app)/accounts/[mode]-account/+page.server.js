import { db } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, url }) => {

  if (params.mode == 'edit') {

    const accountId = url.searchParams.get('account-id')
    const account = await db.selectFrom('accounts')
      .where('accounts.accountId', '=', accountId)
      .selectAll().executeTakeFirst()

    return { account }

  }
  
};