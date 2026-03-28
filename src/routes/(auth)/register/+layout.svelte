<script lang="ts">
    import type { LayoutProps } from './$types';

    let { data, children }: LayoutProps = $props();
</script>


<div class=" container mx-auto flex justify-center items-center h-screen overflow-hidden">
    {@render children()}
</div>