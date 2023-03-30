import crypto from 'crypto';

// used to generate sessions
export const generateToken = () => {
	const token = crypto.randomBytes(32);
	const digest = crypto.createHash('sha256').update(token).digest('hex');
	return `${token.toString('hex')}.${digest}`;
};
