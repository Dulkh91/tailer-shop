<script lang="ts">
    import formatKhmerDate from "$lib/utile/utities";
    import {resolve} from '$app/paths'
    import {page} from '$app/stores'
    import Skeleton from "./Skeleton.svelte";
    let {customers ,isSearching} = $props()
    
</script>


{#if isSearching}
    <Skeleton/>
{:else}
    {#each customers as customer (customer._id)}
    {@const khDate = formatKhmerDate(customer.createdAt)}
    <div class=" mb-1 min-h-full rounded-md bg-stone-700  p-2 px-2 shadow-ls">
        <a href={resolve(`/customer-list/${customer._id}`)} class=" group flex justify-between items-center" >
            <div>
				<h1 class= "text-lg" >
                    {customer.name}
                </h1>
				<p class=" text-gray-400 text-sm">
                    <span>{khDate?.dayName}</span>
                    <span>{khDate?.month}</span>
                    <span>{khDate?.year}</span>
                </p>
			</div>
			<p class=" text-center text-md">{customer.phone}</p>   
        </a>   
	</div>
{/each}
    
{/if}




