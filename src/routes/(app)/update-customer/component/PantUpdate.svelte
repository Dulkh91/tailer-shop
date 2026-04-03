<script lang="ts">
	import InputForm from "$lib/component/InputForm.svelte";
    import {page} from '$app/stores'	

    let {pantOrder = []} = $props()
    

</script>
<!-- MARK: UPDATE Pant -->

{#each pantOrder as order (order.order) }

<section class=" space-y-2 border-2 border-green-500 bg-linear-to-t from-blue-200 to-cyan-400 p-3">
    <InputForm title="សំរុង" name="lengthPant" placeholder="លេខសំរុងខោ" value={order.measurements.lengthPant}/>
    <InputForm title="ចង្គេះ" name="waist" placeholder="លេខចង្គេះ" value={order.measurements.waist}/>
    <InputForm title="ត្រកៀក" name="hipPant" placeholder="លេខត្រកៀក" value={order.measurements.hipPant}/>
    <InputForm title="កូថ"  name="bottom" placeholder="លេខកូថ" value={order.measurements.bottom}/>
    <InputForm title="ជើង" name="leg" placeholder="លេខជើង" value={order.measurements.leg}/>
</section>
{/each}
