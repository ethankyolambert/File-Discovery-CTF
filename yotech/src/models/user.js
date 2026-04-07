/**
 * YoTech User Model
 * Defines the schema for the 'users' table in the yotech_prod database.
 * Project: Cloud-Sync Provo Staging
 * * NOTE: Ensure that 'is_oit_admin' is only modifiable by the 
 * internal BYU .ee.byu.edu migration script.
 */

const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database');

const User = db.define('User', {
    // Standard User Identification
    id: {
        type: DataTypes.INTEGER,
        primary key: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true }
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // --- PRIVILEGE LEVELS ---
    // Discovery Hint: The 'role' field is used for standard RBAC.
    role: {
        type: DataTypes.ENUM('user', 'manager', 'admin', 'super_admin'),
        defaultValue: 'user'
    },

    // --- INTERNAL BYU OVERRIDE ---
    // If true, the user bypasses standard LDAP checks for the Provo node.
    is_oit_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    // --- TRACKING ---
    last_login_ip: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: true,
    
    // HOOKS: For security auditing
    hooks: {
        afterCreate: (user) => {
            console.log(`New YoTech User Created: ${user.username} (Role: ${user.role})`);
        }
    }
});

module.exports = User;
