<script lang="ts">
    import type { PageProps } from './$types';
    import SearchBar from '$lib/component/SearchBar.svelte';
    import Card from '$lib/component/Card.svelte';
    import CardHeader from '$lib/component/CardHeader.svelte';

    //import {page} from '$app/stores'

    let { data }: PageProps = $props();
    let currentCustomers = $state(data.customerData)
    let isSearching = $state(false)

    function handleSearchResults(results: any[]) {
        currentCustomers = results;
    }

    function resetToAllCustomers() {
        currentCustomers = data.customerData;
    }

    function handleSearching(searching: boolean){
        isSearching = searching
    }
    
</script>
<div class="mx-2 md:mx-0">
    <SearchBar 
     onSeachComplete={handleSearchResults} 
     resetSearch={resetToAllCustomers} 
     onSeachingChange = {handleSearching}/>

    <CardHeader />
    <Card customers={currentCustomers} isSearching = {isSearching}/>


    <!-- <Card customers={data.customerData} /> -->
    <!-- <Card customers={$page.data.customerData}/> -->
</div>