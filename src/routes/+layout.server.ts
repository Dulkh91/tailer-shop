import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getProfile } from '$lib/server/authenticate';

const publicRoutes = ['/login', '/register'];

export const load: LayoutServerLoad = async ({ locals, url }) => {
    const isPublic = publicRoutes.includes(url.pathname);

    // ❌ មិនមាន user ហើយមិនមែន public route → redirect
    if (!locals.user && !isPublic) {
        throw redirect(303, '/login');
    }

    // ❌ មិនមាន user → return null
    if (!locals.user) {
        return { user_profile: null };
    }

    // ✅ មាន user → fetch profile
    try {
        const user_profile = await getProfile(
            locals.db,
            locals.user.userId
        );

        return { user_profile };
    } catch (error) {
        console.error('getProfile error:', error);
        return { user_profile: null };
    }
};