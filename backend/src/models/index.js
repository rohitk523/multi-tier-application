const { sequelize } = require('../config/database');
const User = require('./User');
const Product = require('./Product');

// Define associations here if needed
// User.hasMany(Order);
// Order.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Product
};
