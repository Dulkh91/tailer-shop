<script lang="ts">
    import type { LayoutProps } from '../$types';

    let { data, children }: LayoutProps = $props();
</script>
<div class=" container mx-auto ">
   <div class=" h-screen ">
         {@render children()}
   </div>
</div>