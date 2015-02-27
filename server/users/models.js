module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    reputation: DataTypes.INTEGER,
    beebucks: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    street: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.User.belongsToMany(models.Item, {
          through: models.Notification
        });
      }
    }
  });
};
