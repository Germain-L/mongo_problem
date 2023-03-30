import type { User } from '$lib/server/interfaces';

export const serializeUser = (user: User): Record<string, unknown> => {
	const serializedData: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(user)) {
		if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			// recursively serialize nested objects
			serializedData[key] = serializeUser(value);
		} else if (typeof value === 'function' || typeof value === 'symbol') {
			// skip functions and symbols
			continue;
		} else if (value instanceof Date) {
			// convert dates to ISO strings
			serializedData[key] = value.toISOString();
		} else if (typeof value === 'bigint') {
			// convert bigints to strings
			serializedData[key] = value.toString();
		} else {
			// copy all other values
			serializedData[key] = value;
		}
	}

	return serializedData;
};
