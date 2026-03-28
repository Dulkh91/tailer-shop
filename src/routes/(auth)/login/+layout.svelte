<script lang="ts">
    import type { LayoutProps } from './$types';

    let { data, children }: LayoutProps = $props();
</script>


<div class=" container mx-auto flex md:mt-32 mt-10 justify-center items-center">
        {@render children()}
</div>