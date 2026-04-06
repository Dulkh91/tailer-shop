<!-- <script lang="ts">
    import { page } from '$app/state';
</script> -->

<h1>{page.status}: {page.error?.message}</h1>


<script lang="ts">
	import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import Icon from '@iconify/svelte';

</script>


<div class="min-h-screen bg-gray-700 flex flex-col items-center justify-center p-6 text-center">
	<!-- <div class="relative mb-8">
		<div class="absolute inset-0 scale-150 blur-3xl opacity-10 bg-indigo-500 rounded-full"></div>
		
		{#if page.status === 404}
			<Icon icon="twemoji:ghost" class="w-32 h-32 relative z-10 animate-bounce" />
		{:else}
			<Icon icon="twemoji:pensive-face" class="w-32 h-32 relative z-10" />
		{/if}
	</div>

	<h1 class="text-9xl font-extrabold  tracking-tighter mb-2">
		{page.status}
	</h1>
	
	<h2 class="text-2xl font-bold mb-4">
		{#if page.status === 404}
			រកមិនឃើញទំព័រដែលអ្នកស្នើសុំទេ
		{:else}
			មានបញ្ហាបច្ចេកទេសបន្តិចបន្តួច
		{/if}
	</h2>
	
	<p class="text-gray-300 max-w-md mb-10 leading-relaxed">
		{#if page.status === 404}
			ទំព័រដែលអ្នកកំពុងស្វែងរកប្រហែលជាត្រូវបានលុប ប្តូរឈ្មោះ ឬមិនទាន់បានបង្កើត។ សូមពិនិត្យមើល URL ឡើងវិញ។
		{:else}
			សុំទោសចំពោះការរំខាន! ម៉ាស៊ីនបម្រើរបស់យើងកំពុងជួបបញ្ហា។ យើងកំពុងធ្វើការយ៉ាងសស្រាក់សស្រាំដើម្បីដោះស្រាយវា។
		{/if}
		
		{#if page.error?.message}
			<span class="block mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg font-mono">
				Error: {page.error.message}
			</span>
		{/if}
	</p>

	<div class="flex flex-col sm:flex-row gap-4">
		<a 
			href={resolve("/")} 
			class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 active:scale-95"
		>
			<Icon icon="heroicons:home-solid" class="w-5 h-5" />
			ត្រឡប់ទៅទំព័រដើម
		</a>
	</div> -->
</div>

