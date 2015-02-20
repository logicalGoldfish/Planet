module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Notification', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  });
}
