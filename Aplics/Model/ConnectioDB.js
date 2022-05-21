const { Pool } = require('pg');
    const poolConexao = new Pool({
    user: process.env.USERDB,
    host:process.env.HOSTDB,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
    port:process.env.PORTDB,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 4000,
    max: 100000000000,
    max_connections:30000
});

module.exports =  poolConexao ;