<script lang="ts">
	export let isLoggedIn: boolean;
</script>

<nav>
	<ul>
		<li>
			<a href="/">Home</a>
		</li>
		{#if isLoggedIn}
			<form action="/login?/logout" method="POST">
				<button type="submit">Logout</button>
			</form>
		{:else}
			<li>
				<a href="/login">Login</a>
			</li>
		{/if}
	</ul>
</nav>
