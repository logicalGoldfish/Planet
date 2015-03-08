var path = require('path');

if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize');
  var sequelize = null;

  // application executed on local machine
  sequelize = new Sequelize('mysql://be8b04c15d063f:1239fcaf@us-cdbr-iron-east-02.cleardb.net/heroku_f031b85a60b0717?reconnect=true');

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: sequelize.import(path.join(__dirname, '../users/models.js')),
    Item: sequelize.import(path.join(__dirname, '../items/models.js')),
    Message: sequelize.import(path.join(__dirname, '../messages/models.js')),
    Notification: sequelize.import(path.join(__dirname, '../notifications/models.js')),
    Review: sequelize.import(path.join(__dirname, '../reviews/models.js'))
  };

  var User          = global.db.User;
  var Item          = global.db.Item;
  var Message       = global.db.Message;
  var Notification  = global.db.Notification;
  var Review        = global.db.Review;

  /*===========================================
  =     Define Associations/Relationships     =
  ===========================================*/
  Item.belongsTo(User, {as: 'borrower', foreignKey: 'borrower_id'});
  Item.belongsTo(User, {as: 'lender', foreignKey: 'lender_id'});
  
  Review.belongsTo(User, {as: 'reviewee', foreignKey: 'reviewee_id'});
  Review.belongsTo(User, {as: 'reviewer', foreignKey: 'reviewer_id'});
  Review.belongsTo(Item, {as: 'item', foreignKey: 'item_id'});

  // Notification.belongsTo(User, {as: 'user'});


  
  // add foreign key for user -> review (rater)
  // add foreign key for user -> review (ratee)
  Object.keys(global.db).forEach(function(modelName) {
    if ('associate' in global.db[modelName]) {
      global.db[modelName].associate(global.db);
    }
  });
}

module.exports = global.db;
