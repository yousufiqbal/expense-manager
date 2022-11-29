import { categorySchema } from '$lib/others/schema'
import { db } from '$lib/server/db'
import { json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, locals }) => {

  const body = await request.json()
  const category = await categorySchema.validate(body, { abortEarly: false })

  await db.insertInto('income_categories')
    .values({
      ...category,
      userId: locals.userId
    })
    .execute()
  
  // Logging..
  await db.insertInto('activities').values({
    userId: locals.userId,
    summary: 'Added income category',
    detail: JSON.stringify(category),
    operation: 'create',
  }).execute()

  return json({
    message: 'Income Category added'
  })
}

/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, url, locals }) => {

  // Validating..
  const categoryId = url.searchParams.get('category-id')
  const body = await request.json()
  const category = await categorySchema.validate(body, { abortEarly: false })

  // Getting category for logging..
  const previousCategory = await db.selectFrom('income_categories')
    .where('income_categories.incomeCategoryId', '=', categoryId)
    .where('income_categories.userId', '=', locals.userId)
    .selectAll().executeTakeFirst()

  // Updating category..
  await db.updateTable('income_categories')
    .where('income_categories.incomeCategoryId', '=', categoryId)
    .where('income_categories.userId', '=', locals.userId)
    .set(category).execute()

  // Logging..
  await db.insertInto('activities').values({
    userId: locals.userId,
    summary: 'Updated income category',
    detail: `From ${JSON.stringify(previousCategory)}, To ${JSON.stringify(category)}`,
    operation: 'update',
  }).execute()
  
  // Responding..
  return json({
    message: 'Income Category updated'
  })

}