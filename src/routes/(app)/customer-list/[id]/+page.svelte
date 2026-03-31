<script lang="ts">
    import type { PageProps } from './$types';
    import formatKhmerDate from '$lib/utile/utities';
    import type{GarmentOrder} from '$lib/server/models/customer.model'
    import ClothDetail from '$lib/component/ClothDetail.svelte';
    import PantDetail from '$lib/component/PantDetail.svelte';
    import Icon from '@iconify/svelte';
    import ModalDelete from '$lib/component/ModalDelete.svelte';

    let { data }: PageProps = $props();
    let showModal = $state(false)

    const customer= data.customer
    
    const clothOrders: GarmentOrder[] = customer?.order.filter((o:GarmentOrder)=> o.type === 'Cloth')?? [];
    const pantOrders: GarmentOrder[] = customer?.order.filter((o:GarmentOrder)=> o.type === 'Pant')?? []

    
</script>
<div class="mx-2 p-2 py-2">
    <section class=" bg-slate-700 p-4 rounded-lg shadow-lg">
        <p class=" text-gray-300">
            អតិថិជន: 
            <span class=" font-bold text-gray-100">
                {customer?.name? customer.name: customer?.phone}
            </span>
        </p>

        {#if customer?.createdAt}
            {@const dateKh = formatKhmerDate(customer.createdAt)}
            <div class=" text-gray-400 flex justify-between">
                <p class=" text-sm">
                ថ្ងៃ{dateKh?.dayName}
                ទី{dateKh?.date}
                ខែ{dateKh?.month}
                ឆ្នាំ{dateKh?.year}
                </p>
                <p class=" text-gray-400 text-sm">{dateKh?.time}</p>
            </div>
        {/if}
    </section>
    

    {#if clothOrders.length > 0}
        <ClothDetail clothOrders={clothOrders}/>
    {/if}
        
        
    {#if pantOrders.length > 0 }
        <PantDetail pantOrders={pantOrders}/>
    {/if}
        
    
    <div class=" flex justify-end mt-4 mr-5 relative">
        <button onclick={()=> showModal = true}>
            <Icon icon="mingcute:settings-2-line" width="26" height="26"/>
        </button>
    </div>     

    <ModalDelete isOpen={showModal} onClose={()=> showModal = false}/>

</div>

