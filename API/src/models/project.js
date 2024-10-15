const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Customer = require('../models/customer');

const Project = sequelize.define('Project', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Project.belongsTo(Customer, { foreignKey: 'customerId' });
Customer.hasMany(Project, { foreignKey: 'customerId' });

module.exports = Project;