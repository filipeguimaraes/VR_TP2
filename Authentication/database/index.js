async function connect() {
    const config = require('../config/database');
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });
    global.connection = connection;
    return connection;
}


async function selectUser(username) {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM users where username="' + username + '"');
    if (!rows[0]) return({id: '-1'});
    return rows[0];
}

module.exports = {selectUser};