const knexConfig = require('../knexfile');
const knex = require('knex'); 

const nodeEnv = process.env.NODE_ENV || 'development';
const config = knexConfig[nodeEnv]; 

const db = knex(config);

db.raw('select 1+1 as result')
  .then(() => {
    console.log('[DB] Conexão com o banco OK!');
  })
  .catch(err => {
    console.error('[DB] Erro na conexão com o banco:', err);
  });

module.exports = db;