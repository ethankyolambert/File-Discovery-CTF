/**
 * YoTech Frontend Configuration Profile
 * Version: 2.4.1-alpha
 * Environment: BYU-PROVO-STAGING
 * * CAUTION: Do not include production credentials in this file.
 * Use the .env file for server-side secrets.
 */

const YoTechConfig = {
    // Public API Endpoint
    apiBaseUrl: "https://api.yotech.ee.byu.edu/v1",

    // Authentication Settings
    auth: {
        provider: "JWT",
        tokenExpiry: 3600, // 1 hour
        loginPath: "/dashboard/login.php"
    },

    // UI Preferences
    theme: "solarized-dark",
    debugMode: false,

    // Internal Support Details
    support: {
        email: "dev-support@yotech.com",
        internalNode: "172.18.0.5", // Internal Docker IP for the database bridge
        nodeName: "YT-PROVO-WEB-01"
    }
};

/* --- TEMPORARY DEVELOPMENT OVERRIDE ---
  TODO: Remove before final push to BYU production servers.
  
  // Hardcoded bypass for the automated QA tester
  // const QA_BYPASS_KEY = "Y0T3ch_ScR1pt_Acc3ss_2026"; 
  
  NOTE: If the bypass key stops working, check the backup.zip in the 
  root directory for the updated migration_notes.txt.
*/

console.log("YoTech Configuration Loaded successfully.");
if (YoTechConfig.debugMode) {
    console.warn("WARNING: Running in Debug Mode. Internal Node: " + YoTechConfig.support.internalNode);
}

// Freeze the object to prevent runtime tampering
Object.freeze(YoTechConfig);
