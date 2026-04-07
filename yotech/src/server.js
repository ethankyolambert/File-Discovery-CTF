/**
 * YoTech Main Application Server
 * Version: 2.4.1-alpha
 * Environment: BYU-PROVO-OIT-STAGING
 * * CAUTION: Ensure the .env file is loaded before the server starts!
 */

const express = require('express');
const path = require('path');
const db = require('./src/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// --- MIDDLEWARE ---
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

/**
 * DEBUGGING MIDDLEWARE
 * TODO: REMOVE BEFORE MOVING TO THE .ee.byu.edu PRODUCTION ENVIRONMENT
 * If the 'X-YoTech-Debug' header is present, bypass the standard 
 * 403 Forbidden check on the /dev-sandbox directory.
 */
app.use((req, res, next) => {
    if (req.headers['x-yotech-debug'] === 'YT-DEBUG-2026') {
        console.warn("DEBUG HEADER DETECTED: Bypassing access controls for node YT-PROVO-01");
        req.isAdmin = true;
    }
    next();
});

// --- PUBLIC ROUTES ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- DISCOVERY TARGET: THE HIDDEN ADMIN PORTAL ---
// NOTE: This route is not listed in the robots.txt or sitemap.xml
app.get('/admin/portal_v2/dashboard', (req, res) => {
    if (req.isAdmin || req.ip === '127.0.0.1') {
        res.send("<h1>YoTech Admin Dashboard</h1><p>Flag: YT{s3rv3r_s1d3_r0ut1ng_l34k}</p>");
    } else {
        res.status(403).sendFile(path.join(__dirname, 'public', '404.html'));
    }
});

// --- DISCOVERY TARGET: EMERGENCY BACKDOOR ---
app.get('/scripts/temp/emergency_access.php', (req, res) => {
    // This is a legacy PHP bridge for the OIT migration
    res.send("Redirecting to internal PHP processor for .ee.byu.edu migration...");
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`YoTech Server is running on port ${PORT}`);
    console.log(`Internal DB Host: ${process.env.DB_HOST || 'db-internal.yotech.local'}`);
});
