var path = require('path');

if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize');
  var sequelize = null;

  // application executed on local machine
  sequelize = new Sequelize('LenderBee', 'root', '', {
    dialect: 'mysql',
    port: 3306
  });

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: sequelize.import(path.join(__dirname, '../users/models.js')),
    Item: sequelize.import(path.join(__dirname, '../items/models.js')),
    Message: sequelize.import(path.join(__dirname, '../messages/models.js'))
  };

  global.db.User.hasMany(global.db.Item, {foreignKey: 'borrower_id'});
  global.db.User.hasMany(global.db.Item, {foreignKey: 'lender_id'});
  global.db.User.hasMany(global.db.Message, {foreignKey: 'borrower_id'});
  global.db.User.hasMany(global.db.Message, {foreignKey: 'lender_id'});

}

module.exports = global.db;
