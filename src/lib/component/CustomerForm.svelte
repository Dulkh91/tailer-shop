<script lang="ts">
 import CustomerInfor from "./CustomerInfor.svelte";
 import ShirtMeasurement from "./ShirtMeasurement.svelte";
 import PantMeasurement from "./PantMeasurement.svelte";
 import {page} from '$app/stores'
import { goto } from '$app/navigation';

    //ទទួល props មកពី parent
   let {form = null, typeTailer = null} = $props()
    
   // បង្កើត Derived value ពី URL, បើគ្មានក្នុង URL ទេ ឱ្យយកតាម props typeTailer
    let type = $derived($page.url.searchParams.get('type') || typeTailer)

    let onShowCloth: boolean = $state(false)
    let onShowPant: boolean = $state(false)
    
    function setType(newType: string){
        const url = new URL($page.url)
        url.searchParams.set('type',newType)
        // ប្រើ replaceState: true បើអ្នកមិនចង់ឱ្យវាថយក្រោយ (Back button) ច្រើនដង
        goto(url.href,{keepFocus: true, noScroll: true})
    }

    function handleShowingCloth(){
        onShowCloth = !onShowCloth
    }
    function handleShowingPant(){
        onShowPant = !onShowPant
    }
    
</script>

<div class=" mx-1">
        <form action="" method="POST">
           <!-- Customer infor -->
            <CustomerInfor/>

            <section class=" flex justify-center gap-4 mt-4">
                <button type="button" onclick={()=>setType('cloth')} class=" bg-orange-500 px-8 p-2 rounded-t-lg {type !=='cloth'? 'mb-1 rounded-lg': ''}"  >
                    កាត់អាវ
                </button>

                <button type="button" onclick={()=> setType('pant')} class=" bg-green-500 px-8 p2 rounded-t-lg {type !=='pant'? 'mb-1 rounded-lg': ''}"  >
                    កាត់ខោ
                </button>
            </section>

             {#if type === 'cloth'}
                    <ShirtMeasurement />
                {:else}
                    <PantMeasurement/>
            {/if}

            {#if type === 'cloth'}
                <div class=" mt-3 flex justify-center">
                    <button type="button" onclick={()=>handleShowingCloth()} class="rounded-md border-2  p-1.5 px-6 font-bold border-green-400 text-green-500">
                      បន្ថែមកាត់ខោ?
                    </button>
	            </div>
            {:else}
                <div class=" mt-3 flex justify-center">
                    <button type="button" onclick={()=>handleShowingPant()} class="rounded-md border-2  p-1.5 px-6 font-bold border-orange-500 text-orange-500">
                        បន្ថែមកាត់អាវ?
                    </button>
	            </div>
            {/if}

           {#if onShowCloth && type ==='cloth'}
               <PantMeasurement/> 
            {:else if onShowPant && type === 'pant'}
                <ShirtMeasurement />
           {/if}

           
            <div class=" flex justify-center">
                <button type="submit" class=" bg-linear-to-r from-indigo-400 to-cyan-400 md:w-3/6 w-full p-2 mt-3 rounded-md text-white font-bold"> 
                        រក្សាទុក 
                </button>
            </div>
        </form>
</div>