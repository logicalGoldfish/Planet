module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fbid: DataTypes.STRING,
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    fbprofile: DataTypes.STRING,
    rating: {type: DataTypes.DECIMAL(3, 1), defaultValue: 0},
    beebucks: {type: DataTypes.INTEGER, defaultValue: 20},
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    street: DataTypes.STRING,
    country: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    fbpicture: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.User.belongsToMany(models.Item, {
          through: models.Notification,
          foreignKey: 'userreq_id'
        });
      }
    }
  });
};
