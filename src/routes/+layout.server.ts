import { serializeUser } from '$lib/utils/serialize';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const user = locals.user;

	if (user) {
		const serialized = serializeUser(user);
		return { user: serialized };
	}

	return {};
}) satisfies LayoutServerLoad;
