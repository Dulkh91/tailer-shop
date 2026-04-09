<script lang="ts">
    import type { LayoutProps } from './$types';

    let { data, children }: LayoutProps = $props();
</script>

<div class="container mx-auto min-h-screen overflow-y-auto z-10">
    {@render children()}
</div>

