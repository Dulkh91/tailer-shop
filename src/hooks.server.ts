import { connectToDatabase } from "$lib/server/db/client";
import { verifyToken } from "$lib/server/authenticate";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve})=>{
    // ភ្ជាប់ទៅ MongoDB
    const db =  await connectToDatabase()
    event.locals.db = db

    // ពិនិត្យមើល Token ពី Cookie
  const token = event.cookies.get('auth-token');
  
  if (token) {
    const user = verifyToken(token);
    if (user) {
      event.locals.user = user;
    } else {
      event.cookies.delete('auth-token', { path: '/' });
    }
  }

  if(event.url.pathname === '/'){
    if(event.locals.user){
        throw redirect(303, '/customer-list')
    }else{
        throw redirect(303, '/login')
    }
  }

  
   if(event.url.pathname.startsWith('/customer-list')){
        if(!event.locals.user){
            throw redirect(303,'/login')
        }
   }

   if((event.url.pathname ==='/login' || event.url.pathname === '/register')&& event.locals.user){
        throw redirect(303, '/customer-list')
   }

  return resolve(event)
}