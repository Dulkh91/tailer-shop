import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createCustomer } from '$lib/server/customer';

export const load = (async ({locals}) => {
    if(!locals.user){
        throw redirect(303,'/login')
    }
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async({request,locals})=>{
        const data = await request.formData() 
        const name = data.get('name')?.toString() || 'មិនស្គាល់ឈ្មោះ'
        const phone = data.get('phone')?.toString() || 'មិនស្គាល់លេខ'

        const shirthForm = data.get('length-body')
        const pantForm = data.get('lengthPant')

        const order: any[] = []

        if(shirthForm){
            const shirthData = {
                lengthBody: Number(data.get('length-body')) ||0,
                shoulder: Number(data.get('shoulder')) || 0,
                sleeveLength: Number(data.get('sleeve_length')) || 0,
                armGirth: Number(data.get('arm_girth')) || 0,
                chest: Number(data.get('chest')) || 0,
                stomach: Number( data.get('stomach')) || 0,
                hipBody:Number(data.get('hip')) || 0
            }

            order.push({type: 'Cloth', measurements: shirthData})
        }

        if(pantForm){
            const pantData = {
                lengthPant: Number(data.get('lengthPant'))|| 0,
                waist: Number(data.get('waist')) || 0,
                hipPant: Number(data.get('hipPant')) || 0,
                bottom: Number( data.get('bottom')) || 0,
                leg: Number(data.get('leg')) || 0
            }
            order.push({type: 'Pant', measurements: pantData})
        }

        
        try {
            await createCustomer(locals.db,locals.user.userId,{
                name: name,
                phone: phone,
                order 
            })
        } catch (error) {
            console.error('Error creating customer:', error);
        }

        throw redirect(303,'/customer-list')
    }
}

