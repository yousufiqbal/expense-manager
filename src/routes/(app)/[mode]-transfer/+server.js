import { generateTransferSchema } from '$lib/others/schema';
import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals }) => {

  const body = await request.json()

  // Validating..
  const accounts = await db.selectFrom('accounts')
    .where('accounts.userId', '=', locals.userId)
    .selectAll().execute()


  const transferSchema = generateTransferSchema(accounts.map(a => String(a.accountId)))
  const transfer = await transferSchema.validate(body, { abortEarly: false })

  // Adding transfer..
  await db.insertInto('transfers')
    .values({
      date: transfer.date, 
      time: transfer.time,
      fromAccountId: transfer.fromAccountId,
      toAccountId: transfer.toAccountId,
      title: transfer.title,
      amount: transfer.amount,
      description: transfer.description || null,
      userId: locals.userId
    }).execute()

  // Responding..
  return json({
    message: 'Transfer added'
  })


};