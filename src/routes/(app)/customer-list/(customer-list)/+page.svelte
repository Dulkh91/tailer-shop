<script lang="ts">
    //import type { PageProps } from './$types';
    import SearchBar from '$lib/component/SearchBar.svelte';
    import Card from '$lib/component/Card.svelte';
    import CardHeader from '$lib/component/CardHeader.svelte';
	import AddButton from '$lib/component/AddButton.svelte';
    //import {page} from '$app/stores'

   // let { data }: PageProps = $props();
    
</script>
<div class="mx-2 md:mx-0">
    <SearchBar/>
    <CardHeader />
    <Card />
    <!-- <Card customers={data.customerData} /> -->
    <!-- <Card customers={$page.data.customerData}/> -->
</div>
<AddButton/>