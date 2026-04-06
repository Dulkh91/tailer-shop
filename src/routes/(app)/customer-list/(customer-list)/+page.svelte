<script lang="ts">
    import type { PageProps } from './$types';
    import SearchBar from '$lib/component/SearchBar.svelte';
    import Card from '$lib/component/Card.svelte';
    import CardHeader from '$lib/component/CardHeader.svelte';
    import Filter from '$lib/component/FilterIcon.svelte';
    import FilterOption from '$lib/component/FilterOption.svelte';
    import { filterCustomerByDate } from '$lib/utile/utities';

    import { sortCustomers } from '$lib/utile/utities';
    import type { CustomerList } from '$lib/types'; // Import your CustomerList type

    //import {page} from '$app/stores'

    let { data }: PageProps = $props();
    let currentCustomers: CustomerList[] = $state(data.customerData)
    let origalData: CustomerList[] = $state(data.customerData)
    let isSearching = $state(false)
    let isShowFilter = $state(false)

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

    // MARK: TOGGLE SHOW FILTER COMPONENT
    function handleShowFilter(){
        isShowFilter = !isShowFilter
    }

    // MARK: FILTER METHOD
    let selectedYear: number | null = $state(null);
    let selectedMonth: number | null = $state(null);
    
    function handleYearChange(year: number){
        selectedYear = year
        filterData()    
    
    }
    function handleMonthChange(month: number){

        selectedMonth = month
        filterData()  
    }

    function filterData() {
        // អាចត្រងតែឆ្នាំ តែខែ ឬទាំងពីរ
        if(isShowFilter){
            currentCustomers = filterCustomerByDate(
                [...origalData], 
                selectedYear, 
                selectedMonth
            );
        }else{
            currentCustomers = origalData
        }
    }
    
    $effect(()=>{
        filterData()
    })
    
</script>
<div class="mx-2 md:mx-0">
    <div class=" flex items-center">
        <SearchBar 
            onSeachComplete={handleSearchResults} 
            resetSearch={resetToAllCustomers} 
            onSeachingChange = {handleSearching}/>

        <Filter showFilter={handleShowFilter} isShowFilter={isShowFilter}/>
    </div>
    
   {#if isShowFilter}
        <FilterOption 
            dateData ={data}
            onYearChange = {handleYearChange}
            onMonthChange = {handleMonthChange}
        />
   {/if}
    
    <CardHeader onChange = {handleSort}/>
    <Card customers={currentCustomers} isSearching = {isSearching}/>


    <!-- <Card customers={data.customerData} /> -->
    <!-- <Card customers={$page.data.customerData}/> -->
</div>