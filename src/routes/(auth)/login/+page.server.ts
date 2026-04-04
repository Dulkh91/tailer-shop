import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { logIn,generateToken } from '$lib/server/authenticate';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async({request, cookies, locals})=>{
        
        const data = await request.formData()
        const userName = data.get('username')?.toString()
        const password = data.get('password')?.toString()

        if(!userName || !password){
            return fail(303, {
                error: 'សូមពិនិត្យមើល user name និងពាក្យសម្ងាត់',
                userName
            })
        }

        const user = await logIn(locals.db, userName, password)

        if(!user){
            return fail(400, {
                error: 'User Name ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ',
                userName
            })
        }

        const token = generateToken(user)

        cookies.set('auth-token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 7 ថ្ងៃ
        });

        throw redirect(303,'/customer-list')
        
    }
}