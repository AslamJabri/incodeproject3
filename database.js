const pgp = require('pg-promise')();

const database = 'mr_coffee'

const connection = 'postgres://aslamali:12345678@localhost:5432/' + database;


const db = pgp(connection);

module.export = db ; 