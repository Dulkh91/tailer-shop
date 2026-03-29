<script lang="ts">
    import type { LayoutProps } from './$types';

    let { data, children }: LayoutProps = $props();
</script>

<div class=" flex items-center mt-4 ">
    <div class=" container  mx-auto">
        {@render children()}
    </div>
</div>
