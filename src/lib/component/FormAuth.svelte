<script lang="ts"> 
 import Icon from '@iconify/svelte'  
 let { form = null, type = 'login'} = $props()
</script>

<div class=" rounded-lg bg-gray-100 p-12">
	<form  method="POST" class=" space-y-5">
        
        {#if type === 'register'}
            <div class=" flex items-center gap-2 rounded-lg border border-gray-300">
                <Icon icon="icon-park-solid:edit-name" width="24" height="24" class="ml-2"/>
                <input
                    type="text"
                    placeholder="បញ្ចូលឈ្មោះពេញ"
                    class=" rounded-r-lg border-0 bg-gray-200 w-full"
                    name="fullname"
                    id="fullname"
                    value={form?.fullname || ''}
                    required
                />
		    </div>
        {/if}

        <div class=" flex items-center gap-2 rounded-lg border border-gray-300">
			<Icon icon="mi:user" width="24" height="24" class="ml-2"/>
			<input
				type="text"
				placeholder="បញ្ចូល User Name"
				class=" rounded-r-lg border-0 bg-gray-200 w-full"
                name="username"
                id="username"
                value={form?.username || ''}
                required
			/>
		</div>
        
        <div class=" flex items-center gap-2 rounded-lg border border-gray-300">
			<Icon icon="solar:lock-password-linear" width="24" height="24" class="ml-2"/>
			<input
				type="password"
				placeholder="បញ្ចូលលេខកូដសម្ងាត់"
				class=" rounded-r-lg border-0 bg-gray-200 w-full"
                name="password"
                id="password"
                required
			/>
		</div>

        {#if type === 'register'}
            <div class=" flex items-center gap-2 rounded-lg border border-gray-300">
			<Icon icon="solar:lock-password-linear" width="24" height="24" class="ml-2"/>
			<input
				type="password"
				placeholder="បញ្ជាក់លេខកូដ"
				class=" rounded-r-lg border-0 bg-gray-200 w-full"
                name="confirmPassword"
                id="confirmPassword"
               
			/>
		</div>
        {/if}
        
        <!-- Error -->
        {#if form?.error}
            <div class=" text-red-700 text-sm text-center bg-red-200 p-2 rounded-lg">{form.error}</div>
        {/if}
        
		<button type="submit" class=" w-full rounded-md bg-blue-600 py-1.5 text-white">
            {type === 'login'? 'ចូលប្រើ':'ចុះឈ្មោះ'}
        </button>
	</form>
</div>
