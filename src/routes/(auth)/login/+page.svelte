<script lang="ts">
    import type { PageProps } from './$types';
      
    import FormAuth from '$lib/component/FormAuth.svelte';
	import { resolve } from '$app/paths';
    let { data }: PageProps = $props();
    import {page} from '$app/stores'
</script>

<div class=" max-h-screen overflow-auto mb-52">
 <h1 class=" mb-5 text-center text-blue-600 text-xl font-bold">ចូលប្រើប្រាស់</h1>
     <!-- formmm -->
      <FormAuth form={$page.form} type="login"/>
    <p class=" mt-3 text-center">
        មិនទាន់មានគណនីទេ?
        <a href={resolve('/register')} class=" text-blue-600 hover:underline no-underline">ចុះឈ្មោះ</a>
    </p>
    
</div>

