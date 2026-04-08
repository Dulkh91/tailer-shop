<script lang="ts">
    import Icon from "@iconify/svelte";
    import { clothDirider } from "$lib/utile/cusomterDict";
    import { clothLabels } from "$lib/utile/cusomterDict";

    let {clothOrders = []} = $props()
    let onCard = $state(true)
</script>

<div class=" mt-4">
	<button 
        onclick={()=>onCard = !onCard}
    class=" flex w-26 items-center gap-2 p-1.5 text-end dark:bg-slate-700  bg-slate-700 text-gray-200  {onCard? 'rounded-t-md':'rounded-md'}">
		<Icon icon="ph:shirt-folded-fill" width="24" height="24" />
		កាត់អាវ
    </button>
	{#if onCard}
        {#each clothOrders as order (order)}
            <ul class=" p-2 px-4 py-6 shadow-lg  dark:bg-slate-700 bg-slate-700  rounded-b-lg rounded-tr-lg">
                {#each Object.entries(order.measurements) as [key, value] (key)}
                    <li class=" flex justify-between py-1.5 border-0 border-b md:mx-4">
                        <span class="text-gray-300 ">{clothLabels[key] || key}:</span>
                        {#if clothDirider[key]}
                            <span class="text-gray-500">{Number(value)} ÷ {clothDirider[key]} = </span>
                            <span class=" font-black text-gray-300">{Number(value) / clothDirider[key]}</span>
                        {:else}
                            <span class=" font-black text-gray-300">{Number(value)}</span>
                        {/if}
                    </li>
                {/each}
            </ul>
	    {/each}
    {/if}
</div>
