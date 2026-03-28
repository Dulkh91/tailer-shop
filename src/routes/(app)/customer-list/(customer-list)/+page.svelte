<script lang="ts">
    import type { PageProps } from './$types';
    import SearchBar from '$lib/component/SearchBar.svelte';
    import Card from '$lib/component/Card.svelte';
    import CardHeader from '$lib/component/CardHeader.svelte';

    let { data }: PageProps = $props();
    
</script>
<div>
    <SearchBar/>
    <CardHeader />
    <Card customers={data.customerData}/>
</div>