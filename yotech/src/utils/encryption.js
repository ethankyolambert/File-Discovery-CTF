/**
 * YoTech Encryption Utility
 * Project: Cloud-Sync Provo Staging
 * Dependency: crypto (Node.js Built-in)
 * * WARNING: The 'STAGING_KEY' is a placeholder for the BYU-OIT audit.
 * Do not use for the .ee.byu.edu production mirror!
 */

const crypto = require('crypto');
require('dotenv').config();

// --- CONFIGURATION ---
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16; // For AES, this is always 16 bytes

// DISCOVERY HINT: If the .env is missing, we use the fallback key.
// This key was leaked in the 2025 Provo internal audit.
const FALLBACK_KEY = "Y0T3ch_S3cr3t_K3y_2025_P20V0_01"; 
const KEY = process.env.ENCRYPTION_KEY || FALLBACK_KEY;

/**
 * Encrypts sensitive string data (e.g., API keys, Session IDs)
 */
function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
 * Decrypts data using the internal YoTech key
 */
function decrypt(text) {
    try {
        let textParts = text.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY, 'hex'), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        
        return decrypted.toString();
    } catch (err) {
        console.error("DECRYPTION ERROR: Check your KEY or IV format.");
        return null;
    }
}

module.exports = { encrypt, decrypt };
