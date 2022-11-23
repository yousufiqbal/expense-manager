import { categorySchema } from '$lib/others/schema'
import { db } from '$lib/server/db'
import { json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {

  const body = await request.json()
  const category = await categorySchema.validate(body, { abortEarly: false })

  await db.insertInto('categories').values(category).execute()
  
  return json({
    message: 'Category added'
  })
}

/** @type {import('./$types').RequestHandler} */
export const PUT = async ({ request, url }) => {

  const categoryId = url.searchParams.get('category-id')
  const body = await request.json()
  const category = await categorySchema.validate(body, { abortEarly: false })

  await db.updateTable('categories')
    .where('categories.categoryId', '=', categoryId)
    .set(category).execute()
  
  return json({
    message: 'Category updated'
  })
}