<script lang="ts">
    import Icon from "@iconify/svelte";
	
    let {form} = $props()
</script>

<section class=" mx-2 space-y-3 rounded-md dark:bg-stone-700 p-4">
	<div class="flex w-full items-center rounded-md border md:w-3/4">
		<Icon icon="icon-park-outline:edit-name" width="24px" height="24px" class="m-2" />
		<input type="text" name="name" value={form.name?? ''} placeholder="បញ្ចូលឈ្មោះអតិថិជន" class=" w-full rounded-r-md border-0  dark:text-gray-600" />
	</div>

	<div class=" flex w-full items-center rounded-md border md:w-3/4">
		<Icon icon="mdi-light:phone" width="24px" height="24px" class="m-2" />
		<input type="tel" name="phone" value={form.phone ?? ''} placeholder="បញ្ចូលលេខទូរស័ព្ទ" class=" w-full rounded-r-md border-0 p-2  dark:text-gray-600" />
	</div>
</section>
