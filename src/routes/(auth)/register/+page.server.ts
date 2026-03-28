import {  fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createUser,generateToken } from '$lib/server/authenticate';

export const load = (async () => {
   
    return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async({request,cookies,locals})=>{
        const data = await request.formData()
        
        const fullName = data.get('fullname')?.toString()
        const userName = data.get('username')?.toString()
        const password = data.get('password')?.toString()
        const confirmPassword = data.get('confirmPassword')?.toString()

        console.log("my localdb",locals)

        if(!fullName || !userName || !password || !confirmPassword){
            return fail(400, {
                error: 'សូមបំពេញព័ត៌មានទាំងអស់',
                fullName, userName
            })
        }

        if(password !== confirmPassword){
            return fail(400, {
                error: 'ពាក្យសម្ងាត់ទាំងពីរមិនត្រូវគ្នា',
                fullName,userName
            })
        }

        if(password.length < 5){
            return fail(400, {
                error: 'ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៥ តួអក្សរ',
                fullName,userName
            })
        }

        try {
            const newUser = await createUser(locals.db, userName,fullName,password)

            // បង្កើត Token
            const token = generateToken(newUser)

            // កំណត់ Cookie
            cookies.set('auth-token', token,{
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7 // 7 ថ្ងៃ
            })


        } catch (error: any) {
            return fail(400,{
                error: error.message,
                fullName,userName
            })
        }
        
        throw redirect(303, '/customer-list')
    }
}
