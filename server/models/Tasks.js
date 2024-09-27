// models/Tasks.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Users = require('./Users');

const Tasks = sequelize.define('tasks', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: Users,
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'  // automatically delete associated tasks when a user is deleted
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});

// Association
Tasks.belongsTo(Users, { foreignKey: 'userId' });
Users.hasMany(Tasks, { foreignKey: 'userId' });

module.exports = Tasks;
