import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getCustomers } from '$lib/server/customer';
import console from 'console';

export const load = (async ({locals}) => {
    if(!locals.user){
        throw redirect(303,'/login')
    }
   
    try {
        const rawData = await getCustomers(locals.db, locals.user.userId)
        const customerData = rawData.map(customer=>({
            ...customer,
            _id: customer._id.toString(),
            createdAt: customer.createdAt.toISOString()?? customer.createdAt
        }))
        
        return {customerData}
    } catch (error) {
        console.error("Error loading todo",error)
        return {
            customerData: []
        }
    }
}) satisfies PageServerLoad;

