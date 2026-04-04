<script lang="ts">
    import type { LayoutProps } from './$types';

    let { data, children }: LayoutProps = $props();
</script>

<div class=" flex items-center mt-4 ">
    <div class=" container  mx-auto mb-10 md:mb-20">
        {@render children()}
    </div>
</div>
