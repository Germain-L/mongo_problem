<script lang="ts">
	import type { LayoutData } from './$types';
	import Navbar from '$lib/component/Navbar.svelte';
	export let data: LayoutData;
</script>

<Navbar isLoggedIn={data.user !== null} />
<slot />