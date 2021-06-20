var jwt = require('jsonwebtoken');
const fs = require('fs');
const selectUser = require('../database/index').selectUser;

module.exports = async function createJWT(username,password) {
    return selectUser(username).then((dbuser) => {
        if(dbuser.id === '-1' ) return res.status(401).send('Invalid username!');
        if (req.body.pwd === dbuser.pass) {
            const id = dbuser.id;
            var privateKey = fs.readFileSync('./private.key', 'utf8');
            var token = jwt.sign(
                { id , role:dbuser.permission},
                privateKey,
                {
                    expiresIn: 300, // 5min 
                    algorithm: "RS256" //SHA-256 hash signature
                }
            );

            return { auth: true, token: token };
        }
        return {auth : false, token: null};
    }
    );
}

