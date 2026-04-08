-- --------------------------------------------------
-- YOTECH ENTERPRISE DATABASE INITIALIZATION
-- Target: MariaDB / MySQL
-- Project: Cloud-Sync Provo Staging (OIT)
-- Author: dev_admin_esl
-- --------------------------------------------------

CREATE DATABASE IF NOT EXISTS yotech_prod;
USE yotech_prod;

-- --- 1. USER ACCOUNTS TABLE ---
-- Discovery Hint: Notice the 'role' column for privilege escalation targets.
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'manager', 'admin', 'super_admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --- 2. INITIAL SEED DATA ---
-- TODO: Remove these default accounts before moving to the .ee.byu.edu production mirror!
-- NOTE: The super_admin password below is a temporary placeholder for the OIT audit.

INSERT INTO users (username, email, password_hash, role) VALUES 
('admin_provo', 'admin@yotech.com', '$2y$10$S9..fake_hash_example..', 'admin'),
('dev_test_user', 'dev@yotech.com', 'YoTech_Guest_2026', 'user'),
('super_root', 'root@yotech.local', 'super_admin');

-- --- 3. SYSTEM CONFIGURATION ---
CREATE TABLE IF NOT EXISTS system_settings (
    setting_key VARCHAR(50) PRIMARY KEY,
    setting_value TEXT
);

-- Internal Node Reference
INSERT INTO system_settings (setting_key, setting_value) VALUES 
('internal_api_node', '172.18.0.5'),
('backup_path', '/var/www/yotech/public/backup.zip');

-- --------------------------------------------------
-- END OF INITIALIZATION
-- --------------------------------------------------
