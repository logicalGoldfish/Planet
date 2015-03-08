module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: DataTypes.INTEGER,
    review: DataTypes.TEXT
  });
}
