<script lang="ts">
    let {dateData, onYearChange, onMonthChange} = $props()


    function handleYearChange(e:Event){
        onYearChange?.(Number((e.target as HTMLSelectElement).value))  // method CALLBACK FN
    }

    function handleMonthChange(e: Event) {
        onMonthChange?.(Number((e.target as HTMLSelectElement).value)); // method CALLBACK FN
    }
</script>


<div class=" flex justify-end items-center gap-3 mb-2 mr-3">
    <!-- YEAR -->
     <label for="" class=" dark:text-gray-300 text-gray-600">ឆ្នាំ:</label>
	<select name="" id="" class=" dark:bg-stone-700 bg-gray-300 rounded-md" onchange={handleYearChange}>
        <option disabled selected class="text-md">Year</option>
        {#each dateData.years as year (year)}
             <option value={year}>{year}</option>
        {/each}
       <option class="text-md" value="All">All</option>
        
    </select>

    <!-- MONTHS -->
    <label for="" class=" dark:text-gray-300 text-gray-600">ខែ:</label>
     <select name="" id="" class=" dark:bg-stone-700 bg-gray-300 rounded-md" onchange={handleMonthChange}>
        <option disabled selected>Month</option>
        {#each dateData.months as months (months) }
            <option value={months}>{months}</option>
        {/each}
        <option class="text-md" value="All">All</option>
    </select>
</div>
