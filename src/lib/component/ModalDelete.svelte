<script lang="ts">

	let {isOpen, onClose} = $props()
	import Icon from "@iconify/svelte";

	let dialogRef: HTMLDialogElement | undefined = $state()
	import {page } from '$app/stores'
	import { resolve } from "$app/paths";

	$effect(()=>{
		if(isOpen){
			dialogRef?.showModal()
		}else{
			dialogRef?.close()
		}
	})
	
    function handleOutsideClick(e: MouseEvent){
       if( e.target === dialogRef){
            // dialogRef?.close()
			onClose()
       } 
    }
	
 	const customerId = $page.data.customer._id

</script>

<dialog
		bind:this={dialogRef}
		onclick={handleOutsideClick}
		onclose ={onClose}
		class=" m-0 left-1/2 top-1/2  -translate-x-1/2 bg-sky-600 h-32 w-56 backdrop:bg-black/50 rounded-lg"
	>
        <div class=" flex flex-col w-full p-5 gap-3">
            <a href={resolve(`/update-customer?id=${customerId}`)} class=" w-full bg-emerald-600 py-1 shadow rounded-xl flex justify-center items-center">
                <Icon icon= "boxicons:edit-filled" width='24' height='24'/>
			</a>
			<form action="/customer-list/delete" method="post" onsubmit={(e) => confirm('តើអ្នកប្រាកដជាចង់លុបកិច្ចការនេះ?') || e.preventDefault()}>
				<button class=" w-full bg-red-700 py-1 shadow rounded-xl flex justify-center items-center" >
					<input type="hidden" name="customerId" value={customerId}/>
					<Icon icon= "fluent:delete-12-regular" width='24' height='24'/>
            	</button>
			</form>
        </div>
</dialog> 






<!-- <div
	class="absolute bottom-full left-0 mb-2 h-28 w-64 translate-y-0 rounded-md shadow-lg dark:bg-slate-800"
>
	<p class=" mt-3 text-center text-lg">តើអ្នកចង់លុបម៉ែនឬទេ?</p>
	<div class=" mt-5 flex items-end justify-around text-lg">
		<button type="button" class=" rounded-md bg-red-700 p-1 px-8"> បាទ </button>
		<button type="button" class=" rounded-md bg-yellow-500 p-1 px-8" onclick={()=> onClose(false) }> ទេ </button>
	</div>
</div> -->
