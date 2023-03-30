<script lang="ts">
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
</script>

<form action="?/login" method="POST">
	<label for="username">Username:</label>
	<input type="text" id="username" name="username" required />

	<label for="password">Password:</label>
	<input type="password" id="password" name="password" required />

	<button type="submit">Submit</button>

	{#if form?.error}
		<p>{form.error}</p>
	{/if}
</form>
