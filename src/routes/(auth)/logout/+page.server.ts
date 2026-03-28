import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    throw redirect(303,'/')
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async({cookies})=>{
        cookies.delete('auth-token',{path: '/'})
        throw redirect(303, '/login')
    }
}