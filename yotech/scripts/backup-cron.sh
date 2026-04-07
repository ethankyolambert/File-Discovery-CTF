#!/bin/bash
# --------------------------------------------------
# YOTECH AUTOMATED BACKUP UTILITY
# Purpose: Nightly sync of BYU-PROVO-STAGING assets
# Schedule: Run via crontab every night at 02:00
# Author: dev_admin_esl
# --------------------------------------------------

# --- Configuration ---
SOURCE_DIR="/var/www/yotech"
BACKUP_DIR="/var/www/yotech/public"  # TODO: Move this OUT of the public web root!
BACKUP_NAME="backup.zip"
TIMESTAMP=$(date +"%Y-%m-%d")
LOG_FILE="/var/www/yotech/scripts/backup.log"

echo "[${TIMESTAMP}] Starting nightly backup for YoTech..." >> $LOG_FILE

# --- Step 1: Archive the Web Root ---
# We are including the .env and the docs folder for the OIT audit
zip -r ${BACKUP_DIR}/${BACKUP_NAME} ${SOURCE_DIR}/public ${SOURCE_DIR}/docs ${SOURCE_DIR}/.env >> $LOG_FILE 2>&1

if [ $? -eq 0 ]; then
    echo "[${TIMESTAMP}] Backup successful: ${BACKUP_DIR}/${BACKUP_NAME}" >> $LOG_FILE
else
    echo "[${TIMESTAMP}] ERROR: Backup failed. Check permissions on ${BACKUP_DIR}" >> $LOG_FILE
    exit 1
fi

# --- Step 2: Offsite Sync (Internal Only) ---
# NOTE: The .ee.byu.edu migration requires a secondary sync to the internal node
# rsync -avz ${BACKUP_DIR}/${BACKUP_NAME} admin@172.18.0.5:/home/admin/backups/

# --- Step 3: Cleanup ---
# Keep only the latest backup in the public folder to save space
# chmod 644 ${BACKUP_DIR}/${BACKUP_NAME} 

echo "[${TIMESTAMP}] Backup cycle complete." >> $LOG_FILE
