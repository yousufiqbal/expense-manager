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

  // Logging..
  await db.insertInto('activities').values({
    userId: locals.userId,
    summary: 'Added expense category',
    detail: JSON.stringify(category),
    operation: 'create',
  }).execute()
  
  return json({
    message: 'Expense Category added'
  })
}

/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, url, locals }) => {

  const categoryId = url.searchParams.get('category-id')
  const body = await request.json()
  const category = await categorySchema.validate(body, { abortEarly: false })

  // Getting category for logging..
  const previousCategory = await db.selectFrom('expense_categories')
    .where('expense_categories.expenseCategoryId', '=', categoryId)
    .where('expense_categories.userId', '=', locals.userId)
    .selectAll().executeTakeFirst()

  // Updating..
  await db.updateTable('expense_categories')
    .where('expense_categories.expenseCategoryId', '=', categoryId)
    .where('expense_categories.userId', '=', locals.userId)
    .set(category).execute()

  // Logging..
  await db.insertInto('activities').values({
    userId: locals.userId,
    summary: 'Updated expense category',
    detail: `From ${JSON.stringify(previousCategory)}, To ${JSON.stringify(category)}`,
    operation: 'update',
  }).execute()
  
  return json({
    message: 'Expense Category updated'
  })
}