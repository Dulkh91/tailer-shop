<script lang="ts">
    import type { PageProps } from './$types';
      
    import FormAuth from '$lib/component/FormAuth.svelte';
	import { resolve } from '$app/paths';
    import {page} from '$app/stores'

</script>

<div class=" max-h-screen overflow-auto mb-52">
 <h1 class=" mb-5 text-center text-blue-600 text-xl font-bold">ចុះឈ្មោះ</h1>
     <!-- formmm -->
      <FormAuth form={$page.form} type="register"/>
    <p class=" mt-3 text-center">
        មានគណនីរួចហើយ?
        <a href={resolve('/login')} class=" text-blue-600 hover:underline no-underline">ចូលប្រើ</a>
    </p>
    
</div>

