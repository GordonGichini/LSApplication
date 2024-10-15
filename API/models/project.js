const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Customers',
            key: 'id',
        },
    },
});

Project.associate = function(models) {
    Project.belongsTo(models.Customer, { foreignKey: 'customerId', as: 'customer' });
};

module.exports = Project;
