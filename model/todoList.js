const Sequelize = require('sequelize');
const sequelize = require('../conections/database');

// Define the User model
const TodoList = sequelize.define('TodoList',{
    // Make the id property the primary key, auto-incrementing and not nullable
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
     name: Sequelize.STRING,
     description: Sequelize.STRING,
});
// Export the User model for other modules to use
module.exports = TodoList;
