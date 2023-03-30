import type { ObjectId } from 'mongodb';

export interface User {
	_id: ObjectId;
	username: string;
	password: string;
}

export interface Session {
	_id: ObjectId;
	userId: ObjectId;
	token: string;
	createdAt: Date;
	expiresAt: Date;
}
