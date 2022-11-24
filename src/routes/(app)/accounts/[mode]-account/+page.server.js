import { db } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, url, locals }) => {

  if (params.mode == 'edit') {

    const accountId = url.searchParams.get('account-id')
    const account = await db.selectFrom('accounts')
      .where('accounts.accountId', '=', accountId)
      .where('accounts.userId', '=', locals.userId)
      .selectAll().executeTakeFirst()

    return { account }

  }
  
};