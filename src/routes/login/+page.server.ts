import { db } from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';
import bcrypt from 'bcrypt';
import { generateToken } from '$lib/server/session';
import type { User } from '$lib/server/interfaces';
import { redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	// register: async ({ request }) => {
	// 	const data = await request.formData();
	// 	const username = data.get('username') as string;
	// 	const password = data.get('password') as string;

	// 	const hash = await bcrypt.hash(password, 10);

	// 	await db.collection('users').insertOne({
	// 		username,
	// 		password: hash
	// 	});
	// },
	login: async ({ request, cookies, locals }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;

		const userDb: User = (await db.collection('users').findOne({ username })) as User;

		if (!userDb) {
			return {
				status: 404,
				error: 'User not found'
			};
		}

		const passwordMatch = await bcrypt.compare(password, userDb.password);

		if (!passwordMatch) {
			return {
				status: 401,
				error: 'Invalid password'
			};
		}

		const sessionToken = generateToken();

		// max age of 1 day
		const maxAge = 1000 * 60 * 60 * 24;
		const expires = new Date(Date.now() + maxAge * 1000);

		// store session in db where user id is the same as the user id in the user collection
		await db.collection('sessions').updateOne(
			{ userId: userDb._id },
			{
				$set: {
					token: sessionToken,
					createdAt: new Date(),
					expiresAt: expires
				}
			},
			{ upsert: true }
		);

		// store in cookies
		cookies.set('session', sessionToken, {
			httpOnly: true,
			secure: true, // set to true if using HTTPS
			sameSite: 'strict',
			expires: expires
		});

		locals.user = {
			_id: userDb._id,
			username: userDb.username,
			password: userDb.password
		};

		throw redirect(301, '/');
	},
	logout: async ({ cookies, locals }) => {
		console.log('logout');
		
		const session = cookies.get('session');
		await db
			.collection('sessions')
			.deleteOne({ token: session, userId: new ObjectId(locals.user?._id) });

		cookies.delete('session');
		locals.user = null;
	}
} satisfies Actions;
