const { Pool } = require("pg");
const config = require("../secrets/databaseConfig");

const pool = new Pool(config);

module.exports = pool;
