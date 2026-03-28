<script lang="ts">
    import type { PageProps } from '../$types';

    let { data }: PageProps = $props();
</script>
<div class=" bg-amber-400">
    {#if (data.customerFromDb?.length ?? 0) < 1}
        <h1 class="text-center">No Data</h1>
    {/if}
    
</div>