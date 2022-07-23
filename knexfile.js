const connection = require('./db/connection');

module.exports = {
  client: 'mysql2',
  connection: connection,
  useNullAsDefault: true,
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
}