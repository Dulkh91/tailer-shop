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

	let titleHead = $state('')
	if(userProfile){
		titleHead =	userProfile.fullName
	}
</script>


<svelte:head><link rel="icon" href={favicon} />
	<title>{titleHead? `${titleHead} | tailer shop`: 'tailer shop'}</title>
	<meta 
		property="og:title" 
		content={titleHead? `${titleHead} | tailer shop`: 'tailer shop'} />
</svelte:head>


<div class="min-h-screen ">
	<div class=" bg-cyan-700">
		<nav class=" container max-w-4xl mx-auto flex justify-between">
			<a href={resolve('/customer-list')}  class=" p-4 hover:bg-cyan-800 text-gray-100">
				ហាងកាត់ដេ {#if userProfile}
						{userProfile.fullName}
				{/if}
			</a>


			{#if userProfile}
				<form action="/logout" method="POST">
					<button class=" p-4 hover:bg-cyan-800 text-gray-100">
						<Icon icon='mdi:exit-run' width='30'/>
					</button>
				</form>
			{/if}
			
		</nav>
	</div>

	<div class=" max-w-4xl mx-auto mb-24">
		{@render children()}
	</div>
	<footer class=" fixed bottom-0 bg-gray-700/70 w-full">
		
		<div class=" container max-w-4xl mx-auto py-2  ">
			<div class="flex justify-between items-center mx-5 md:mx-0">
				<p class=" text-sm text-gray-300">&copy; {new Date().getFullYear()} ROS DUL.<br> All rights reserved</p>
			
				<div class=" flex justify-center items-center gap-2">
					<a href="https://t.me/ros_dul_kh" target="_blank">
						<Icon icon="logos:telegram" width="32" />
					</a>
					<a href="https://wa.me/85578555454" target="_blank" >
						<Icon icon="logos:whatsapp-icon" width="32"/>
 					</a>
				</div>
			</div>
			
		</div>
	</footer>
</div>
