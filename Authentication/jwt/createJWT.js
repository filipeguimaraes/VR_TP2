var jwt = require('jsonwebtoken');
const fs = require('fs');
const selectUser = require('../database/index').selectUser;

module.exports = async function createJWT(username, password) {
    return selectUser(username).then((dbuser) => {
        if (dbuser.id === '-1') {
            return { auth: false, token: null };
        } else if (password === dbuser.pass) {
            const id = dbuser.id;
            var privateKey = fs.readFileSync('./private.key', 'utf8');
            var token = jwt.sign(
                { id, role: dbuser.permission, username },
                privateKey,
                {
                    expiresIn: '2m',
                    algorithm: "RS256" //SHA-256 hash signature
                }
            );

            return { auth: true, token, role: dbuser.permission };
        } else {
            return { auth: false, token: null };
        }

    }
    );
}

