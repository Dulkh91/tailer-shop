<script lang="ts">
	import InputForm from "$lib/component/InputForm.svelte";
    import {page} from '$app/stores'


    let {shirtOrder = []} = $props()
    

</script>

<!-- MARK: Update shirt measurement -->
{#each shirtOrder as order (order.order) }
    <section class=" mb-4 space-y-2 border-2 border-orange-500  bg-linear-to-r from-amber-100 to-amber-300 p-3 py-7">
    <InputForm title="សំរុង" name="length-body"   placeholder="លេខសំរុងអាវ" value={order.measurements.lengthBody?? ''}/>
    <InputForm title="ស្មារ" name="shoulder"   placeholder="លេខស្មារ" value={order.measurements.shoulder?? ''}/>
    <InputForm title="សំរុងដៃ" name="sleeve_length"  placeholder="លេខសំរុងដៃ"  value={order.measurements.sleeveLength?? ''}/>
    <InputForm title="កំពួនដៃ" name="arm_girth"  placeholder="លេខកំពួនដៃ" value={order.measurements.armGirth ?? ''}/>
	<InputForm title="ទ្រូង" name="chest"  placeholder="លេខទ្រូង" value={order.measurements.chest?? ''}/>
	<InputForm title="ក្បាលពោះ" name="stomach" placeholder="លេខក្បាលពោះ" value={order.measurements.stomach?? ''}/>
	<InputForm title="ត្រកៀក" name="hip"  placeholder="លេខត្រកៀក" value={order.measurements.hipBody?? ''}/>	
</section>
{/each}

