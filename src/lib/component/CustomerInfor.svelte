<script lang="ts">
    import Icon from "@iconify/svelte";
	import {page} from '$app/stores'
	
    const customer = $state($page.data.customer) 
	let name = $state(customer?.name || '') 
	let phone = $state(customer?.phone || '')
</script>

<section class=" mx-2 space-y-3 rounded-md dark:bg-stone-700 p-4">
	<div class="flex w-full items-center rounded-md border md:w-3/4">
		<Icon icon="icon-park-outline:edit-name" width="24px" height="24px" class="m-2" />
		<input type="text" name="name" bind:value={name} placeholder="បញ្ចូលឈ្មោះអតិថិជន" class=" w-full rounded-r-md border-0  dark:text-gray-600" />
	</div>

	<div class=" flex w-full items-center rounded-md border md:w-3/4">
		<Icon icon="mdi-light:phone" width="24px" height="24px" class="m-2" />
		<input type="tel" name="phone" bind:value={phone} placeholder="បញ្ចូលលេខទូរស័ព្ទ" class=" w-full rounded-r-md border-0 p-2  dark:text-gray-600" />
	</div>
</section>
