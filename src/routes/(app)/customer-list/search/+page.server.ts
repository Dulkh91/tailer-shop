import type { PageServerLoad } from './$types';
import { customerSearching } from '$lib/server/customer';
import { redirect, type Actions } from '@sveltejs/kit';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async({request, locals})=>{
        const data = await request.formData()
        const query = data.get('keyQuery')?.toString()

        if(!locals.user){
            throw redirect(303,'/login')
        }


        if(!query){
            return{ customerSearch: []}
        }

        try {
            const result = await customerSearching(locals.db,locals.user.userId,query)
            const customerSearch = result.map(customer=>({
                ...customer,
                _id: customer._id.toString(),
                createdAt: customer.createdAt.toISOString()?? customer.createdAt
            }))
            
            return{customerSearch}
        } catch (error) {
            console.error(error);
            return { customerSearch: [] };
        }

    }
}
