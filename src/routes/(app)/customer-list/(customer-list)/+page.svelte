<script lang="ts">
    import type { PageProps } from './$types';
    import SearchBar from '$lib/component/SearchBar.svelte';
    import Card from '$lib/component/Card.svelte';
    import CardHeader from '$lib/component/CardHeader.svelte';
    
    import { sortCustomers } from '$lib/utile/utities';
    import type { CustomerList } from '$lib/types'; // Import your CustomerList type

    //import {page} from '$app/stores'

    let { data }: PageProps = $props();
    let currentCustomers: CustomerList[] = $state(data.customerData)
    let origalData: CustomerList[] = $state(data.customerData)
    let isSearching = $state(false)

    function handleSearchResults(results: any[]) {
        currentCustomers = results;
    }

    function resetToAllCustomers() {
        //currentCustomers = data.customerData;
        currentCustomers = origalData
    }

    function handleSearching(searching: boolean){
        isSearching = searching
    }

    // function សម្រាប់តម្រៀប (ប្រើ sortCustomers)
    function handleSort(order: 1 | -1 | null, sortBy: 'name' | 'phone') { 
        if(order === null){
            currentCustomers = [...origalData]
        }else{
            currentCustomers = sortCustomers([...origalData],sortBy, order)
        }      
    }

</script>
<div class="mx-2 md:mx-0">
    <SearchBar 
     onSeachComplete={handleSearchResults} 
     resetSearch={resetToAllCustomers} 
     onSeachingChange = {handleSearching}/>

    <CardHeader onChange = {handleSort}/>
    <Card customers={currentCustomers} isSearching = {isSearching}/>


    <!-- <Card customers={data.customerData} /> -->
    <!-- <Card customers={$page.data.customerData}/> -->
</div>