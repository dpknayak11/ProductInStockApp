// Import the Sequelize module
const Sequelize = require('sequelize').Sequelize;

// Create a new Sequelize instance with the database configuration
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host: process.env.HOST_NAME,
    dialect: 'mysql'
})

// Export the sequelize instance for other modules to use
module.exports = sequelize;