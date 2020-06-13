// Update with your config settings.

module.exports = {

  development: {
   client: 'sqlite3',
    connection: {
      filename: './src/database/guula.sqlite'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'mysql',
    connection: {
	  host:"sql200.epizy.com",
      database: 'epiz_25956277_guula',
      user:     'epiz_25956277',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/guula.sqlite'
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
