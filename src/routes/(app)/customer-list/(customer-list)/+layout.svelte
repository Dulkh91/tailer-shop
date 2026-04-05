<script lang="ts">
    import type { LayoutProps } from '../$types';
    import AddButton from '$lib/component/AddButton.svelte';

    let { data, children }: LayoutProps = $props();
</script>
<div class=" container mx-auto">
   <div class=" min-h-screen ">
         {@render children()}

         <div class=" fixed md:bottom-10  md:right-50 bottom-5 right-1/2 translate-x-1/2">
            <AddButton/>
         </div>
   </div>
   
</div>