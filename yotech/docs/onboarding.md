# Welcome to the YoTech DevOps Team!
**Subject:** Internal Onboarding & Infrastructure Overview
**Target Environment:** BYU-PROVO-STAGING
**Lead Engineer:** @dev_admin_esl

Welcome aboard! As we migrate our core services to the **BYU .ee infrastructure**, please follow these guidelines to get your environment synced.

## 1. Accessing the Internal Network
Most of our development happens inside a Dockerized environment. 
- **Main Gateway:** `172.18.0.1`
- **Database Node:** `172.18.0.5` (Port 3306)
- **Monitoring Node:** `172.18.0.12` (Port 8080)

> **IMPORTANT:** If you are working from the Provo OIT office, you do not need the VPN to access the `dev-sandbox/` directory.

## 2. Tools & Credentials
To keep our workflow consistent, we use a shared `.env` file for the staging tier.
- **Local Dev Login:** Use your BYU NetID.
- **Shared Secrets:** Check the `backup.zip` in the root folder for the `v1_creds.txt` if you need to access the legacy API.

## 3. Deployment Workflow
1. Pull the latest from the GitHub repo.
2. Ensure your local `config.js` points to the staging API: `https://api.yotech.ee.byu.edu/v1`.
3. **DO NOT** commit your `id_rsa` or `.env` files. (Verify your `.gitignore` before pushing!)

## 4. Troubleshooting
If the web server hangs, check the logs at `/dev-sandbox/logs/`. 
If you find a file named `emergency_access.php` in the `scripts/temp/` folder, **DO NOT DELETE IT.** This is our backdoor for when the LDAP server at BYU goes down.

---
*YoTech Enterprise - "Securing the Future, One Sync at a Time."*
