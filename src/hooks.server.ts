import { db } from '$lib/server/db';
import type { Handle } from '@sveltejs/kit';
import cookie from 'cookie';
export const handle = (async ({ event, resolve }) => {
	const headers = event.request.headers;
	const cookiesString = headers.get('cookie');
	const cookies = cookie.parse(cookiesString || '');

	const session = cookies.session;

	// find session in db
	const sessionDb = await db.collection('sessions').findOne({ token: session });
	if (!sessionDb) {
		event.locals.user = null;
		const response = await resolve(event);
		return response;
	}

	const userDb = await db.collection('users').findOne({ _id: sessionDb.userId });
	if (!userDb) {
		event.locals.user = null;
		const response = await resolve(event);
		return response;
	}


	event.locals.user = {
		_id: userDb._id,
		username: userDb.username,
		password: userDb.password
	};


	const response = await resolve(event);
	return response;
}) satisfies Handle;
