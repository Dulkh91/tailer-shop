<script lang="ts">
    import Icon from "@iconify/svelte";
    let {showFilter, isShowFilter} = $props()

</script>

<button 
    type="button"
    onclick={()=> showFilter()}
    class=" p-2 ml-2 {isShowFilter? 'bg-stone-400 text-gray-50':' bg-gray-300  text-gray-400'}">
    <Icon icon="gridicons:filter"  width="24" height="24"/>
</button>