module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    message: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        models.Message.belongsTo(models.User, {as: 'to', foreignKey: 'to_id'});
        models.Message.belongsTo(models.User, {as: 'from', foreignKey: 'from_id'});
      }
    }
  });
}
