import { JWT_KEY } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken'

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => { 

  console.log(event.request.method, event.url.pathname)

  const allowedUrls = ['/login', '/login/register', '/forgot-password', '/forgot-password/reset-password']

  if (allowedUrls.includes(event.url.pathname)) {
    return await resolve(event);
  }
  
  const fact = event.cookies.get('fact')
  
  if (fact && jwt.verify(fact, JWT_KEY)) {
    event.locals = jwt.decode(fact)
    return await resolve(event);
  }

  throw redirect(301, '/login')

}