<script lang="ts">
    import type { PageProps } from './$types';
    import formatKhmerDate from '$lib/utile/utities';
    import { clothLabels, pantLabels } from '$lib/utile/cusomterDict';
    import type{GarmentOrder} from '$lib/server/models/customer.model'
    import Icon from '@iconify/svelte';
     

    let { data }: PageProps = $props();

    const customer = data.customer
    
    const clothOrders: GarmentOrder[] = customer?.order.filter((o:GarmentOrder)=> o.type === 'Cloth')?? [];
    const pantOrders: GarmentOrder[] = customer?.order.filter((o:GarmentOrder)=> o.type === 'Pant')?? []

    // if(customer?.order && customer.order.length> 0){
    //     clothOrders = customer.order.filter((o:GarmentOrder)=> o.type === 'Cloth')
    //     pantOrders = customer.order.filter(o=> o.type === 'Pant')
    // }


</script>
<div class=" bg-gray-50 mx-2 p-2 ">
    <p class=" text-gray-500">
            អតិថិជន: <span class=" font-bold text-gray-600">{customer?.name? customer.name: customer?.phone}</span>
    </p>

    {#if customer?.createdAt}
        {@const dateKh = formatKhmerDate(customer.createdAt)}
        <div class=" flex justify-between">
            <p class=" text-gray-500 text-sm">
            ថ្ងៃ{dateKh?.dayName}
            ទី{dateKh?.date}
            ខែ{dateKh?.month}
            ឆ្នាំ{dateKh?.year}
            </p>
            <p class=" text-gray-500 text-sm">{dateKh?.time}</p>
        </div>
    {/if}

    {#if clothOrders.length > 0}
        <div class=" mt-4">
            <h1 class=" bg-amber-300 w-26 text-end p-1.5 rounded-t-md flex items-center gap-2">
                <Icon icon="ph:shirt-folded-fill" width="24" height="24" />
                កាត់អាវ
            </h1>
            {#each clothOrders as order  (order)}
                <ul class=" bg-amber-300 p-2">
                    {#each Object.entries(order.measurements) as [key,value] (key)}
                        <li>{clothLabels[key] || key}: {value}</li>
                    {/each}
                </ul>
            {/each}
        </div>
    {/if}
        
        
    {#if pantOrders.length > 0 }
       <div class=" mt-4">
        <div class=" flex justify-end">
            <h1 class=" bg-amber-500 w-26 text-center p-1.5 rounded-t-md flex justify-center gap-2">
                <Icon icon="ph:pants" width="24" height="24"/>
                កាត់ខោ
            </h1>
        </div>
        {#each pantOrders as order (order) }
            <ul class=" bg-amber-500 p-2">
                {#each Object.entries(order.measurements) as [key,value] (key) }
                    <li class=" flex justify-between">
                        <span>{pantLabels[key] || key}</span>
                        <span>{value}</span>
                    </li>
                {/each}
            </ul>
        {/each}
       </div>
    {/if}
        
        
</div>