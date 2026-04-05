<script lang="ts">
    import Icon from "@iconify/svelte";
    import {enhance} from '$app/forms'
    import { page } from '$app/stores';

    let keyQuery = $state('')
    
    let {onSeachComplete, resetSearch, onSeachingChange} = $props()

    let timer: any;
    
  function autoSearch(event: Event) {

    const input = (event.target as HTMLInputElement)
    const searching = input.value;

    if(timer){
      clearTimeout(timer);
    }

    if(!searching.trim()){
      onSeachingChange?.(false)
      resetSearch()
      return
    }

    onSeachingChange?.(true)

    timer = setTimeout( () => {
      const form = input.form
      if (form) {
        form.requestSubmit()
        }
    }, 500);
  }

   $effect(() => {
		if ($page.form?.cusomerSearch) {
			keyQuery = $page.form.currentCustomers;
		}
	});

  function handleClearSearch(){
    resetSearch()
    keyQuery = ''
    onSeachingChange?.(false)
    
  }


</script>

<form 
class=" w-full"
action="/customer-list/search" method="POST" use:enhance={({formData})=>{
    return async ({ result }) => {
          onSeachingChange?.(false)

        if(onSeachComplete && result.data.customerSearch){
            onSeachComplete(result.data.customerSearch);
        }
		};}}>
    <div class=" flex items-center border rounded-md bg-gray-300 my-5">
        <Icon icon="ic:baseline-search" width="24px" height="24px" class="w-10 dark:text-gray-500"/>
        <input type="text"
            name="keyQuery"
            placeholder="ស្វែងរកតាមឈ្មោះ ឬលេខទូរស័ព្ទ..."
            bind:value={keyQuery}
            oninput={autoSearch}
            class=" border-0 focus:border-0 focus:bg-gray-200 bg-gray-200 w-full py-2 rounded-r-md dark:text-gray-600 ">

            {#if keyQuery}
                <button 
                    type="submit" 
                    onclick={()=> handleClearSearch()}
                    class="p-3 text-gray-400 hover:text-gray-600"
                >
                <Icon icon="mdi:close-circle" width="20" />
            </button>
        {/if}
    </div>
</form>
    




	

