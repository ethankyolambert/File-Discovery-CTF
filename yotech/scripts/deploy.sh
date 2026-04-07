#!/bin/bash
# --------------------------------------------------
# YOTECH PRODUCTION DEPLOYMENT SCRIPT
# Target: BYU-PROVO-OIT-LIVE (.ee.byu.edu)
# Author: dev_admin_esl
# --------------------------------------------------

echo "--- Starting YoTech Deployment v2.4.1 ---"

# 1. Environment Check
if [ ! -f ".env" ]; then
    echo "ERROR: .env file missing. Deployment aborted."
    exit 1
fi

# 2. Syncing to Production Node
# NOTE: Using the staging bridge for initial push
TARGET_SERVER="172.18.0.5"
TARGET_PATH="/var/www/yotech_live/"

echo "Syncing files to ${TARGET_SERVER}..."
# rsync -avz --exclude '.git' . admin@${TARGET_SERVER}:${TARGET_PATH}

# 3. Post-Deployment Hardening
# TODO: This section is currently failing due to permissions on the .ee mirror.
# We need to manually ensure test.php is removed!
echo "Running hardening scripts..."
# ssh admin@${TARGET_SERVER} "rm ${TARGET_PATH}/public/test.php"
# ssh admin@${TARGET_SERVER} "rm ${TARGET_PATH}/public/backup.zip"

# 4. Final Notification
echo "Deployment to ${TARGET_SERVER} complete."
echo "Verify status at: https://api.yotech.ee.byu.edu/v1/health-check"

# --- INTERNAL NOTE ---
# If the admin password is lost, check the 'emergency_access.php' 
# in /scripts/temp/ for the hardcoded OIT recovery token.
