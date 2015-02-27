var path = require('path');

if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize');
  var sequelize = null;

  // application executed on local machine
  sequelize = new Sequelize('LenderBee', 'root', '', {
    dialect: 'mysql',
    port: 3306,
    logging: false
  });

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: sequelize.import(path.join(__dirname, '../users/models.js')),
    Item: sequelize.import(path.join(__dirname, '../items/models.js')),
    Message: sequelize.import(path.join(__dirname, '../messages/models.js')),
    Notification: sequelize.import(path.join(__dirname, '../notifications/models.js')),
    Review: sequelize.import(path.join(__dirname, '../reviews/models.js'))
  };

  var User = global.db.User;
  var Item = global.db.Item;
  var Message = global.db.Message;
  var Notification = global.db.Notification;
  var Review = global.db.Review;

  // User.instanceMethods.associates = function() {
  //    User.hasMany(Review, {

  //    });
  //  };

  //  Review.instanceMethods.associates = function() {
  //    Review.belongsTo(User, {
  //        foreignKey: userId
  //    });
  //  };

  User.hasMany(Item, {foreignKey: 'borrower_id'});
  User.hasMany(Item, {foreignKey: 'lender_id'});
  User.hasMany(Message, {foreignKey: 'to_id'});
  User.hasMany(Message, {foreignKey: 'from_id'});
  
  // User.belongsToMany(Item, {foreignKey: 'userreq_id', through: Notification});
  // Item.belongsToMany(User, {foreignKey: 'itemreq_id', through: Notification});

  // User.hasMany(Review, {foreignKey: 'reviewee_id'});
  Review.belongsTo(User, {as: 'reviewee', foreignKey: 'reviewee_id'});
  // User.hasMany(Review, {foreignKey: 'reviewer_id'});
  Review.belongsTo(User, {as: 'reviewer', foreignKey: 'reviewer_id'});
  Review.belongsTo(Item, {as: 'item', foreignKey: 'item_id'});

  // Item.hasMany(Review, {foreignKey: 'item_id'});
  
  // add foreign key for user -> review (rater)
  // add foreign key for user -> review (ratee)
  Object.keys(global.db).forEach(function(modelName) {
    if ('associate' in global.db[modelName]) {
      global.db[modelName].associate(global.db);
    }
  });
}

module.exports = global.db;
