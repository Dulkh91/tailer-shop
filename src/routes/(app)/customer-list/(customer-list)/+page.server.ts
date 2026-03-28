import type { PageServerLoad } from '../$types';
import { getCustomers } from '$lib/server/customer';
import { redirect } from '@sveltejs/kit';

export const load = (async ({locals}) => {
    if(!locals.user){
        throw redirect(303, '/login')
    }
    try {
        const customerFromDb = await getCustomers(locals.db, locals.user.userId)

        return {customerFromDb}
        

    } catch (error) {
        console.error("Error loading customer: ", error)
        return {
            customerFromDb: []
        }
    }

    return {};
}) satisfies PageServerLoad;