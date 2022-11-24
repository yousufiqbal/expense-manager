import { categorySchema } from '$lib/others/schema'
import { db } from '$lib/server/db'
import { json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals }) => {

  const body = await request.json()
  const category = await categorySchema.validate(body, { abortEarly: false })

  await db.insertInto('expense_categories')
    .values({
      ...category,
      userId: locals.userId
    })
    .execute()
  
  return json({
    message: 'Expense Category added'
  })
}

/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, url, locals }) => {

  const categoryId = url.searchParams.get('category-id')
  const body = await request.json()
  const category = await categorySchema.validate(body, { abortEarly: false })

  await db.updateTable('expense_categories')
    .where('expense_categories.expenseCategoryId', '=', categoryId)
    .where('expense_categories.userId', '=', locals.userId)
    .set(category).execute()
  
  return json({
    message: 'Expense Category updated'
  })
}