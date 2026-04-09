<script lang="ts">
    import type { PageProps } from './$types';
    import CustomerForm from '$lib/component/CustomerForm.svelte';
    import {page} from '$app/stores'
    let { data }: PageProps = $props();
    
    
</script>

<div class=" no-scrollbar ">
    <h1 class=" text-center text-xl mb-4 mt-4">បញ្ចូលព័ត៏មានរបស់អតិថិជន</h1>
    <!-- Form -->
     <CustomerForm form={$page.form} typeTailer="cloth"/>
</div>
