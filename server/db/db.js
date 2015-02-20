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
    Message: sequelize.import(path.join(__dirname, '../messages/models.js')),
    Notification: sequelize.import(path.join(__dirname, '../notifications/models.js'))
  };

  var User = global.db.User;
  var Item = global.db.Item;
  var Message = global.db.Message;
  var Notification = global.db.Notification;

  User.hasMany(Item, {foreignKey: 'borrower_id'});
  User.hasMany(Item, {foreignKey: 'lender_id'});
  User.hasMany(Message, {foreignKey: 'borrower_id'});
  User.hasMany(Message, {foreignKey: 'lender_id'});
  // global.db.Item.hasMany(global.db.User, {foreignKey: 'itemToBorrow_id'});
  // global.db.Item.belongsToMany(global.db.User, {as: ''});
  // global.db.User.belongsToMany(global.db.Item, {as: 'itemtoborrow_id'});
  User.belongsToMany(Item, {foreignKey: 'userreq_id', through: Notification});
  Item.belongsToMany(User, {foreignKey: 'itemreq_id', through: Notification});
}

module.exports = global.db;
