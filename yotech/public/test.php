<?php
/**
 * YOTECH INTERNAL USE ONLY
 * @project: Cloud-Sync Migration
 * @author: dev_admin_esl
 * TODO: REMOVE THIS FILE BEFORE PROD DEPLOYMENT!!!
 */

echo "<html><head><title>YoTech System Check</title></head><body>";
echo "<h1>YoTech Environment Debugger v2.4.1</h1>";
echo "<p>Checking system status for migration to <b>.ee.byu.edu</b> environment...</p>";

// --- 1. Basic Server Connectivity Check ---
echo "<h2>1. Connectivity</h2>";
echo "Server Time: " . date("Y-m-d H:i:s") . "<br>";
echo "Server IP: " . $_SERVER['SERVER_ADDR'] . "<br>";
echo "Gateway: 172.18.0.1 (Docker Bridge)<br>";

// --- 2. Database Connection Test (Simulated) ---
// In a real attack, this might reveal if the DB is reachable or if credentials work
echo "<h2>2. Database Status</h2>";
$db_status = "CONNECTED"; 
echo "Status: <span style='color:green;'>$db_status</span><br>";
echo "Internal DB Host: <b>db-internal.yotech.local</b><br>";

// --- 3. The "Smoking Gun": PHP Configuration ---
// This function outputs several pages of sensitive data including:
// - Loaded PHP modules (vulnerable versions?)
// - Environment variables (Passwords/API Keys?)
// - Absolute file paths on the server
echo "<h2>3. Full System Info</h2>";
echo "<hr>";
phpinfo(); 

echo "</body></html>";
?>
