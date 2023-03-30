<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.user}
	<p>{data.user.username}</p>
{:else}
	<p>Not logged in</p>
	<a href="/login">Login</a>
{/if}
