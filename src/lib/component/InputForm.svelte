<script lang="ts">
    let {title = null ,name = null, placeholder = null} = $props()
</script>

<div class=" flex w-full items-center rounded-md border border-gray-800">
	<label for={name} class=" ml-1 w-20">{title}</label>
	<input
		type="number"
		placeholder={placeholder}
        name={name}
        id={name}
		class="w-full rounded-r-md border-0 bg-gray-50 focus:border-0 focus:outline-none outline-0 "
	/>
</div>
