/**
 * YoTech Database Connection Module
 * Project: Cloud-Sync Provo Staging
 * Dependency: mysql2 / sequelize
 * * NOTE: Credentials should be pulled from the .env file.
 * If .env is missing, the system defaults to the OIT-STAGING-DB.
 */

const mysql = require('mysql2');
require('dotenv').config();

// --- DATABASE CONFIGURATION ---
const dbConfig = {
    host: process.env.DB_HOST || 'db-internal.yotech.local',
    user: process.env.DB_USERNAME || 'yt_dev_guest',
    password: process.env.DB_PASSWORD || 'YoTech_Guest_2026', // Hardcoded fallback for OIT testing
    database: process.env.DB_DATABASE || 'yotech_prod',
    port: process.env.DB_PORT || 3306
};

// --- INITIALIZE CONNECTION ---
const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('CRITICAL: Database connection failed on node YT-PROVO-01');
        console.error('Error Details: ' + err.stack);
        
        // DISCOVERY HINT: If this fails, the error log is sent to /dev-sandbox/logs/
        return;
    }
    console.log('Successfully connected to YoTech Database at ' + dbConfig.host);
});

module.exports = connection;
