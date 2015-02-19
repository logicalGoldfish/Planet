module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    message: DataTypes.TEXT
  });
}
