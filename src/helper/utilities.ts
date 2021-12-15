const Bcrypt = require('bcrypt');

export function verifyPassword(plain_password, hashed_password) {
    return new Promise((resolve, reject) => {
        Bcrypt.compare(plain_password, hashed_password, (err, result) => {
            if (err) {
                reject(false);
            } else if (!result) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
}