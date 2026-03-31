<script lang="ts">
import Icon from "@iconify/svelte";
import { pantLabels } from "$lib/utile/cusomterDict";
import { pantDirider } from "$lib/utile/cusomterDict";

let {pantOrders = []} = $props()
let onCard = $state(true)
</script>

<div class=" mt-4">
	<div class=" flex justify-end">
		<button type="button" 
        onclick={()=> onCard = !onCard}
        class=" flex w-26 justify-center gap-2  bg-amber-500 dark:bg-slate-700 p-1.5 text-center {onCard?'rounded-t-md':'rounded-md' }">
			<Icon icon="ph:pants" width="24" height="24" />
			កាត់ខោ
        </button>
	</div>
	{#if onCard}
        {#each pantOrders as order (order)}
            <ul class=" bg-amber-500 dark:bg-slate-700 p-2 px-4 rounded-l-lg  rounded-br-lg py-6">
                {#each Object.entries(order.measurements) as [key, value] (key)}
                    <li class=" flex justify-between py-1.5 border-0 border-b md:mx-4">
                        <span class=" text-gray-300">{pantLabels[key] || key}:</span>
                        {#if pantDirider[key]}
                            <span class="text-gray-500">{Number(value)} ÷ {pantDirider[key]} =</span>
                            <span class=" font-black">{Number(value) / pantDirider[key]}</span>
                        {:else}
                            <span class=" font-black">{Number(value)}</span>
                        {/if}
                    </li>
                {/each}
            </ul>
	    {/each}
    {/if}
</div>
