module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    pollenprice: DataTypes.INTEGER,
    borrowed: {type: DataTypes.BOOLEAN, defaultValue: false},
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    imageurl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.Item.belongsToMany(models.User, {
          through: models.Notification
        });
      }
    }
  });
};
