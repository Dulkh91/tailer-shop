import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getProfile } from '$lib/server/authenticate';

export const load = (async ({locals,url}) => {
    if (!locals.user && url.pathname !== '/login' && url.pathname !=='/register') {
        throw redirect(303, '/login');
    }

    if(!locals.user){
        return {user_profile: null}
    }
    try {
        const user_profile = await getProfile(locals.db, locals.user.userId)
        return{user_profile}
    } catch (error) {
        console.error(error)
        return {user_profile: null}
    }
    
}) satisfies LayoutServerLoad;