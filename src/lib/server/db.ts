import { DB_NAME, MONGODB_URI } from '$env/static/private';
import { MongoClient } from 'mongodb';

async function connectToDatabase() {
	const client = await MongoClient.connect(MONGODB_URI);
	const db = client.db(DB_NAME);
	return db;
}

export const db = await connectToDatabase();
