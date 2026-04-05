<script lang="ts">
	
  let sortOrder = $state<1 | -1 | null>(null);  // ← សំខាន់!
    let sortBy = $state<'name' | 'phone'>('name');

  let {onChange}: {onChange: (
    order: 1 | -1 | null, 
    sortBy: 'name'|'phone')=>void
  } = $props()

  function toggleChange(sortByType: 'name'| 'phone'){
    if(sortBy !== sortByType){
      sortBy = sortByType
      sortOrder = 1
      // sortOrder = sortOrder === 1? -1: 1
    }else {
        if(sortOrder === null){
          sortOrder = 1
        }else if(sortOrder === 1){
          sortOrder = -1
        }else{
          sortOrder = null
        }
      // sortOrder = 1
    }
    onChange(sortOrder, sortBy)
  }

  function getSortIcon(column: 'name' | 'phone') {
        if (sortBy !== column) return '';
        if(sortOrder === null) return "";
        if(sortOrder === 1) return '↓';
        return '↑' ;
    }
  
</script>

<div class=" bg-indigo-300 px-2 min-h-full rounded-t-md shadow p-2 mb-1">
   <div class=" flex items-center justify-between text-stone-800 md:mx-3 mx-0">
    
        <button 
          onclick={()=> toggleChange('name')}
          type='button'  
          class=" text-lg font-bold">
          ឈ្មោះអថិជន <span>{getSortIcon('name')}</span> 
        </button>
    
       <button 
        onclick={()=> toggleChange('phone')}
        type="button"
        class=" text-lg font-bold">
          {getSortIcon('phone')} លេខទូរស័ព្ទ 
        </button>
   </div>
</div>
