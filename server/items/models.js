module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    pollenprice: DataTypes.INTEGER,
    borrowed: DataTypes.BOOLEAN
  });
}
