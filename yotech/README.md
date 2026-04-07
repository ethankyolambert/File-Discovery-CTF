# YoTech Cloud-Sync (Provo Staging)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-2.4.1--alpha-blue)

## Project Overview
YoTech Cloud-Sync is the enterprise-grade synchronization engine currently being prepared for the **BYU .ee infrastructure** migration. This repository contains the staging environment for the Provo OIT nodes.

**Lead Engineer:** Ethan Seankyosung Lambert (@dev_admin_esl)  
**Status:** Alpha - Migration in Progress (DO NOT DEPLOY TO PRODUCTION)

## Architecture
The system is built on a Node.js/Express backend with a MariaDB storage layer, all orchestrated via Docker. 

- **Frontend:** HTML5/CSS/JavaScript (Solarized Theme)
- **Backend:** Node.js v14+
- **Database:** MariaDB 10.5
- **Internal Network:** `172.18.0.0/24`

## Local Setup
1. Clone the repository to your BYU OIT workstation.
2. Run `npm install` to grab dependencies (see `package.json`).
3. Ensure your local `.env` is configured (copy from `backup.zip` if needed).
4. Launch the stack: `docker-compose up -d`.

## Known Issues (Sprint 4)
- [ ] Implement CAPEC-497 mitigations for directory listing in `/scripts/temp/`.
- [ ] Rotate the default staging credentials found in `db-init.sql`.
- [ ] Restrict access to `docs/api_spec.yaml` from public-facing IPs.
- [ ] **URGENT:** Verify that the `v1_backup.tar.gz` is not being indexed by search crawlers.

## Security & Compliance
This repository is subject to BYU OIT security audits. All developers must ensure that sensitive keys are kept out of the `public/` folder. Please refer to the `.gitignore` for a list of restricted file types.

---
*© 2026 YoTech Enterprise Security - "Syncing Provo to the World."*
