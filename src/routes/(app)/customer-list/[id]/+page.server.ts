import { redirect ,fail,error} from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { customerDetail } from '$lib/server/customer';


export const load = (async ({params,locals}) => {
    if(!locals.user){
        throw redirect(303,'/login')
    }
    const id = params.id
    
    try {
        const result = await customerDetail(locals.db, id, locals.user.userId)
        if(!result || (result.ok === false)){
            throw error(404,{
                message: 'រកមិនឃើញអតិថិជនដែលអ្នកកំពុងស្វែងរកទេ'
            })
        }
        const customer = {
            ...result,
            _id: result._id.toString(),
            createdAt: result.createdAt.toISOString() ?? result.createdAt
        }

        return {customer}

    } catch (err:any) {
        if (err.status) throw err;
        console.error("Error loading customer detail:", err);
        throw error(500, "មានបញ្ហាបច្ចេកទេសក្នុងទាញយកទិន្នន័យ");
    }


    return {};
}) satisfies PageServerLoad;