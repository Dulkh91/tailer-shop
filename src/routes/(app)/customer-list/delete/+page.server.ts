import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { deleteCustomer } from '$lib/server/customer';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions:Actions = {
    default: async({request, locals})=>{
         const data = await request.formData()
         const itemId = data.get('customerId')?.toString()

        if(!locals.user){
            throw redirect(303,"/login")
        }

        if(!itemId){
            throw fail(400,{error: 'មិនមានលេខសម្គាល់កិច្ចការ'} )
        }
       try {
        const result =  await deleteCustomer(locals.db, itemId, locals.user.userId )
            if(!result){
               return fail(400, { 
                    error: 'មិនអាចលុបទិន្ន័យបានទេ'
                }); 
            }

       } catch (error) {
            console.error("Error delete a customer",error)
            return fail(500, { error: 'មានបញ្ហាក្នុងការលុបកិច្ចការ' })
       }

       throw redirect(303, '/customer-list')
        
    }
}