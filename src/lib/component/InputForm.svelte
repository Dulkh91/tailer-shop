<script lang="ts">
    let {title = null ,name = null, placeholder = null, value = null} = $props()
</script>

<div class=" flex w-full items-center rounded-md border border-gray-800">
	<label for={name} class=" ml-1 w-20  dark:text-gray-700">{title}</label>
	<input
		type="number"
		inputmode="numeric"
		enterkeyhint="next"
		placeholder={placeholder}
        name={name}
        id={name}
		value={value}
		class="w-full rounded-r-md border-0 bg-gray-50 focus:border-0 focus:outline-none outline-0  dark:text-gray-600"
	/>
</div>
