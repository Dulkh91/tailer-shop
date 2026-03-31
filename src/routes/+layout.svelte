<script lang="ts">
	
	import favicon from '$lib/assets/favicon.svg';
	import {BProgress} from '@bprogress/core'
	import '@bprogress/core/css'
	import './layout.css';
	import {beforeNavigate,afterNavigate} from '$app/navigation'
	import {resolve} from '$app/paths'

	
	BProgress.configure({showSpinner: false})

	let { children } = $props();

	beforeNavigate(()=>{
		BProgress.start()
	})
	afterNavigate(()=>{
		BProgress.done()
	})
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>


<div class=" min-h-screen">
	<div class=" bg-cyan-700">
		<nav class=" container mx-auto flex justify-between">
			<a href={resolve('/customer-list')}  class=" p-4 hover:bg-cyan-800 text-gray-100">
				ហាងកាត់ដេ
			</a>

			<form action="/logout" method="POST">
				<button class=" p-4 hover:bg-cyan-800 text-gray-100">ចាក់ចេញ</button>
			</form>
		</nav>
	</div>

	{@render children()}
	<footer>
		Ros Dul
	</footer>
</div>
