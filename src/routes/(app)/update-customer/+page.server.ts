import { error,fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { customerDetail,updateCustomer } from '$lib/server/customer';

export const load = (async ({url, locals}) => {
    const customerId = await url.searchParams.get('id')

    if(!locals.user){
        throw redirect(303,'/login')
    }
    if(!customerId){
        return{
            customer: null,
            error: 'មិនមានលេខសម្គាល់កិច្ចការ'
        }
    }
    
    try {
        const customer = await customerDetail(locals.db, customerId, locals.user.userId)
        if(!customer){
            return{
                result: null,
                error:  'មិនឃើញមានកិច្ចការនេះទេ'
            }
        }
        
        return{
            customer: {
                _id: customer._id.toString(),
                name: customer.name.toString(),
                phone: customer.phone.toString(),
                order: customer.order,
                createdAt: customer.createdAt.toISOString()
            }
        }
    } catch (err:any) {
        if (err.status) throw err;
        console.error("Error loading customer detail:", err);
        throw error(500, "មានបញ្ហាបច្ចេកទេសក្នុងទាញយកទិន្នន័យ");
    }

}) satisfies PageServerLoad;



export const actions: Actions ={
    default: async({request, locals})=>{
         const data = await request.formData() 
        const name = data.get('name')?.toString() || 'មិនស្គាល់ឈ្មោះ'
        const phone = data.get('phone')?.toString() || 'មិនស្គាល់លេខ'

        const shirthForm = data.get('length-body')
        const pantForm = data.get('lengthPant')
        const customerId = data.get("customerId")?.toString()

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
          const resulte =  await updateCustomer(locals.db, customerId,locals.user.userId,{
                name: name,
                phone: phone,
                order
            })

            if (!resulte) {
                return fail(404, { 
                    error: 'មិនឃើញមានកិច្ចការនេះទេ ឬអ្នកគ្មានសិទ្ធិកែប្រែ'
                });
            }

        } catch (error) {
            console.error('Error updating todo:', error);
            return fail(500, { 
                error: 'មានបញ្ហាក្នុងការកែប្រែកិច្ចការ',
                customer: { _id: customerId, name, phone, order}
            });
        }

        throw redirect(303, `/customer-list/${customerId}`)

    }
}