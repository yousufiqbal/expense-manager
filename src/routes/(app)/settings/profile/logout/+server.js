import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ cookies }) => {
  
  cookies.delete('fact', { path: '/' })
  
  return json({
    message: 'Logged out'
  })

};