'use strict'

const Sequelize = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: env.DATABASE_DIALECT,
  define: {
    underscored: true
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//Models

db.Clientes = require('../models/cliente')(sequelize, Sequelize);


// //Relations
// db.pets.belongsTo(db.owners);

// db.owners.hasMany(db.pets);

module.exports = db;