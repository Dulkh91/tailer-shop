<script lang="ts">
	let { customers = [] } = $props();
</script>

{#each customers as customer (customer._id)}
	<div class=" mb-1 min-h-full rounded-md bg-white p-2 px-2 shadow">
		<div class=" flex items-center justify-between">
			<div>
				<p class=" text-lg">{customer.name}</p>
				<p class=" text-gray-500">{customer.createdAt}</p>
			</div>
			<p class=" text-center text-lg">{customer.phone}</p>
		</div>
	</div>
{/each}
