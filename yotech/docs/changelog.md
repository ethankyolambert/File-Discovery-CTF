# YoTech Cloud-Sync: Internal Changelog
**Project:** Cloud-Sync Migration (BYU-PROVO-OIT)
**Current Version:** 2.4.1-alpha (Build: 2026-04-01)

---

## [2.4.1-alpha] - 2026-04-01
### Added
- Integrated basic JWT authentication for the `/api/v2` endpoints.
- Added `manifest.json` to support PWA installation on Provo field tablets.

### Fixed
- **SECURITY:** Restricted public access to the `.env` file in the root directory via `.htaccess` (Verify this on the BYU .ee.byu.edu mirror).
- Fixed a bug where the `test.php` file was printing the full MySQL root password to the screen. 
- *Note:* The password has been changed, but the old one might still work on the `db-internal.yotech.local` legacy node.

---

## [2.4.0-beta] - 2026-03-15
### Changed
- Moved legacy migration scripts from `/admin/` to `/scripts/temp/` to avoid crawler detection.
- Updated `robots.txt` to disallow the new `/dev-sandbox/` directory.

### Fixed
- Patched a Directory Traversal vulnerability in the `migration_v1_archive.php` script. 
- *Developer Note:* The patch only filters `../`—ensure that absolute paths are also restricted!

---

## [2.3.5] - 2026-02-10
### Added
- Initial setup for the Docker container environment (Bridge: 172.18.0.1).
- Created `backup.zip` containing the V1 filesystem for the OIT audit.

### Security Warning
- **REMAINDER:** Do not leave `id_rsa` keys in the `/scripts/` folder. Several were found during the February sweep and moved to the offline vault.
