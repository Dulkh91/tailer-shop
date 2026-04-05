<script lang="ts">
	
	import favicon from '$lib/assets/favicon.svg';
	import {BProgress} from '@bprogress/core'
	import '@bprogress/core/css'
	import './layout.css';
	import {beforeNavigate,afterNavigate} from '$app/navigation'
	import {resolve} from '$app/paths'
	
	import {page} from '$app/stores'
	import Icon from '@iconify/svelte';

	

	BProgress.configure({showSpinner: false})

	let { children } = $props();

	beforeNavigate(()=>{
		BProgress.start()
	})
	afterNavigate(()=>{
		BProgress.done()
	})

	let userProfile =  $page.data.user_profile
	
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>


<div class="min-h-screen">
	<div class=" bg-cyan-700">
		<nav class=" container max-w-4xl mx-auto flex justify-between">
			<a href={resolve('/customer-list')}  class=" p-4 hover:bg-cyan-800 text-gray-100">
				ហាងកាត់ដេ {#if userProfile}
						{userProfile.userName}
				{/if}
			</a>


			{#if userProfile}
				<form action="/logout" method="POST">
					<button class=" p-4 hover:bg-cyan-800 text-gray-100">
						<Icon icon='mdi:exit-run' width='32'/>
					</button>
				</form>
			{/if}
			
		</nav>
	</div>

	<div class=" max-w-4xl mx-auto mb-16">
		{@render children()}
	</div>
	<footer class=" fixed bottom-0 bg-gray-700/40 w-full">
		<div class=" container max-w-4xl mx-auto py-2">
			Ros Dul
		</div>
	</footer>
</div>
