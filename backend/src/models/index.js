const sequelize = require('../config/database');
const User = require('./User');
const Inventory = require('./Inventory');

// Define Associations
User.hasMany(Inventory, { foreignKey: 'userId', as: 'inventories' });
Inventory.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  sequelize,
  User,
  Inventory
};
