<script lang="ts">
    import type { PageProps } from './$types';
    import SearchBar from '$lib/component/SearchBar.svelte';
    import Card from '$lib/component/Card.svelte';
    import CardHeader from '$lib/component/CardHeader.svelte';
    import Filter from '$lib/component/FilterIcon.svelte';
    import FilterOption from '$lib/component/FilterOption.svelte';
    import { filterCustomerByDate } from '$lib/utile/utities';
    import { pagination } from '$lib/utile/pagination';
    import { sortCustomers } from '$lib/utile/utities';
    import type { CustomerList } from '$lib/types'; // Import your CustomerList type
    import { onMount, onDestroy } from 'svelte';
	import type { CustomerPaginatedResult } from '$lib/server/models/customer.model';

    let { data }: PageProps = $props();
   
    // MARK: - BASE DATA from database
    let origalData: CustomerList[] = $state(data.customerData)

        
    // MARK: - SEARCH STATE
    let isSearching = $state(false)
    let isLoading = $state(false)
    let searchResults: CustomerList[] = $state([]);

    // MARK: - SORT STATE
    let sortOrder = $state<1 | -1 | null>(null);
    let sortBy = $state<'name' | 'phone'>('name');

    // MARK: -FILTER STATE 
    let isShowFilter = $state(false)
    let selectedYear: number | null = $state(null);
    let selectedMonth: number | null = $state(null);

    // MARK: - PAGINATION STATE
    let curentPage = $state(1);
    let pageSize = 10;
    let loadMoreTrigger: HTMLDivElement;
    let observer: IntersectionObserver;
    let hasMount = $state(false)
    let isFetching = $state(false)

    // MARK: - DATA FLOW (ទិន្នន័យដំណើរការជាជំហានៗ)
    
    // Step 1: Search Data (ប្រសិនបើកំពុងស្វែងរក)
    let searchedData = $derived.by(()=>{
        if (isSearching){
            return searchResults
        }
        return origalData
    })
       

    // Step 2: Filter Data (ត្រងតាមកាលបរិច្ឆេទ)
    let filteredData = $derived.by(()=>{
        if(isShowFilter && (selectedYear !== null || selectedMonth !==null)){
            return filterCustomerByDate(
                [...searchedData],
                selectedYear,
                selectedMonth
            )
        }
        return searchedData
    })


    // Step 3: Sort Data (តម្រៀប)
    let sortedData = $derived.by(()=>{
        if(sortOrder === null){
            return  filteredData
        }
        return sortCustomers(
            [...filteredData],
            sortBy,
            sortOrder
        )
    })

    // Step 4: Pagination (បែងចែកជាទំព័រ)
    let paginatedData = $derived.by(()=>{
        const result = pagination(sortedData, curentPage, pageSize)
        return result.data
    })

    // let totalPages = $derived(()=>Math.ceil(sortedData.length / pageSize))

    // MARK: - EVENT HANDLERS
     function handleSearchResults(results: any[]) {
        isSearching = true
        isLoading = false
        searchResults = [...results];
        curentPage = 1
    }

    function resetToAllCustomers() {
        isSearching = false
        isLoading = false
        searchResults = []
        curentPage = 1
    }

    function handleSearching(searching: boolean){
        isLoading = searching
        if(!searching) return 
        isLoading = true
        
    }


    function handleSort(order: 1 | -1 | null, sortByField: 'name' | 'phone') {
        sortOrder = order;
        sortBy = sortByField;
    }

    function handleShowFilter(){
        isShowFilter = !isShowFilter
        if(!isShowFilter){
            // Clear filters when hiding
            selectedYear = null;
            selectedMonth = null;
        }
        curentPage = 1
    }

    function handleYearChange(year: number){
        selectedYear = year
        curentPage = 1    
    
    }
    function handleMonthChange(month: number){
        selectedMonth = month
        curentPage = 1  
    }

    // Auto scroll
    onMount(()=>{
        observer = new IntersectionObserver((entries)=>{
            const entry = entries[0]
            
            // កុំឲ្យ run ដំបូង
            if(!hasMount){
                hasMount = true
                return
            }

            if(entry.isIntersecting){
                loadMores()
            }

        },{
            threshold: 0.1
            //0.1 មិនចាំបាច់ scroll ដល់ bottom ពេញ 100% ទេ
            // 1 scroll ដល់ bottom ពេញ 100%
        })

        if(loadMoreTrigger){
            observer.observe(loadMoreTrigger)
        }

        
    })
    onDestroy(() => {
        if (observer && loadMoreTrigger) {
            observer.unobserve(loadMoreTrigger);
        }
    });

    function loadMores(){
        // 🚫 បើកំពុង load → មិនធ្វើអ្វីទេ
        if(isFetching) return

        // កុំអោយ load លើស data ឬអស់ហើយ
        if (paginatedData.length >= sortedData.length) return;
        isFetching = true // lock
        curentPage++;

        setTimeout(()=>{
            isFetching = false // unclock
        },300)
    }
    
</script>

<div class="mx-2 md:mx-0 overflow-scroll">
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
    <Card customers={paginatedData} isLoading = {isLoading}/>

    <div bind:this={loadMoreTrigger}></div>

</div>


