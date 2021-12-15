// import Jwt from 'jsonwebtoken';
const Jwt = require('jsonwebtoken');
const { promisify } = require('util');

export async function issueJwtToken(payload) {
    try {
        const token = await promisify(Jwt.sign)(
            {
                id: payload.id,
                email: payload.email,
                createdAt: payload.createdAt,
                type: payload.type
            },
            'mind',
            { algorithm: 'HS512', expiresIn: '1d' },
        );

        return token;
    } catch (e) {
        return e;
    }
}

// verifies given jwt token.

export function verify(token, callback) {
    try {
        return Jwt.verify(
            token.replace('Bearer ', ''),
            'mind',
            {},
            callback,
        );
    } catch (err) {
        return 'error';
    }
}
