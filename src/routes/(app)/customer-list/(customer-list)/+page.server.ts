import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getCustomers } from '$lib/server/customer';

export const load = (async ({locals, setHeaders}) => {
    if(!locals.user){
        throw redirect(303,'/login')
    }

    // Option Filter by years and months


   
    try {
        const rawData = await getCustomers(locals.db, locals.user.userId)
        const customerData = rawData.map(customer=>({
            ...customer,
            _id: customer._id.toString(),
            createdAt: customer.createdAt.toISOString()?? customer.createdAt
        }))

        // បង្កើត distinct years និង months
        const years = [...new Set(
            customerData.map(c => new Date(c.createdAt).getFullYear())
        )];
        const months = [...new Set(
            customerData.map(c => new Date(c.createdAt).getMonth() + 1)
        )];

        setHeaders({
            'cache-control': 'private, max-age=60'
        });

        return {
            customerData,
            years,
            months
        }
    } catch (error) {
        console.error("Error loading todo",error)
        return {
            customerData: [],
            years: [],
            months: []
        }
    }
}) satisfies PageServerLoad;

