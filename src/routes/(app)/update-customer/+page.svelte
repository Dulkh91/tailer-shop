<script lang="ts">
    import type { PageProps } from './$types';
    import CustomerInfor from '$lib/component/CustomerInfor.svelte';
    import PantUpdate from './component/PantUpdate.svelte';
    import ShirtUpdate from './component/ShirtUpdate.svelte';
    import ShirtMeasurement from '$lib/component/ShirtMeasurement.svelte';
    import PantMeasurement from '$lib/component/PantMeasurement.svelte';

    import {page} from '$app/stores'


    const datas = $page.data.customer
    
    const customerId = datas._id

    const shirtOrder = datas.order.filter(t=> t.type === 'Cloth')?? []
    const pantOrder = datas.order.filter(t=> t.type === 'Pant')?? []

    let onShowCloth: boolean = $state(false)
    let onShowPant: boolean = $state(false)

    function handleShowingCloth(){
        onShowCloth = !onShowCloth
    }
    function handleShowingPant(){
        onShowPant = !onShowPant
    }

</script>

<div class=" max-h-screen overflow-y-auto no-scrollbar">
    <h1 class=" text-center text-xl mb-4 mt-4">កែប្រែព័ត៏មានរបស់អតិថិជន</h1>
    <!-- Form -->
    <!-- <UpdateCustomerForm/> -->

    <div class="mx-1">
        <form action="" method="post">
            <CustomerInfor form/>
            <input type="hidden" name="customerId" value={customerId}>

            {#if shirtOrder.length > 0}
                <section class=" flex justify-center gap-4 mt-4">
                    <button type="button"  class=" bg-orange-500 px-8 p-2 rounded-t-lg "  >
                        កាត់អាវ
                    </button>
                </section>
                <ShirtUpdate {shirtOrder}/>

                <!-- ADD Pant by button -->
                  <div class=" mt-3 flex justify-center">
                    <button type="button" onclick={()=>handleShowingPant()} class=" mb-2 rounded-md border-2  p-1.5 px-6 font-bold border-green-400 text-green-500">
                      បន្ថែមកាត់ខោ?
                    </button>
	            </div>

                <!-- Show Card of Pant measurement -->

                {#if onShowPant}
                    <PantMeasurement/>
                {/if}

            {/if}

            {#if pantOrder.length > 0}
                <section class=" flex justify-center gap-4 mt-4">
                    <button type="button"  class=" bg-green-500 px-8 p-2 rounded-t-lg "  >
                        កាត់ខោ
                    </button>
                </section>
                <PantUpdate {pantOrder}/>

                <!-- ADD Cloth by button -->
                <div class=" mt-3 flex justify-center">
                    <button type="button" onclick={()=>handleShowingCloth()} class="rounded-md border-2  p-1.5 px-6 font-bold border-orange-500 text-orange-500">
                        បន្ថែមកាត់អាវ?
                    </button>
	            </div>
               
            {/if}
            
            <!-- Show Card of Cloth measurement -->
            {#if shirtOrder.length < 1 && pantOrder.length <1}
                <ShirtMeasurement/>

            {/if}
            <div class=" flex justify-center">
                    <button type="submit" class=" bg-linear-to-r from-indigo-400 to-cyan-400 md:w-3/6 w-full p-2 mt-3 rounded-md text-white font-bold"> 
                            កែប្រែ
                    </button>
                </div>
        </form>
    </div>
    

</div>