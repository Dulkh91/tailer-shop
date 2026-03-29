<script lang="ts">
    import Icon from "@iconify/svelte";
	import {resolve} from '$app/paths'
</script>

<a href={resolve('/new-customer')} class=" group bg-sky-600/20 w-14 h-14 rounded-full flex justify-center items-center" type="button" >
    <div class=" bg-sky-600/40 w-12 h-12 rounded-full flex justify-center items-center">
        <div class=" bg-sky-600 w-10 h-10 rounded-full flex justify-center items-center">
            <Icon icon="material-symbols:add-rounded" width="30" class=" text-white"/>
        </div>
    </div>
</a>