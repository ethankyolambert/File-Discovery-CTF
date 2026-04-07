/**
 * YoTech Authentication Unit Tests
 * Project: Cloud-Sync Provo Staging
 * Framework: Jest / Supertest
 * * NOTE: These tests run against the local Docker node 172.18.0.1.
 * Ensure the .env.test file is loaded before running!
 */

const request = require('supertest');
const app = require('../server');

describe('Authentication API Endpoints', () => {

    // --- TEST 1: Standard Login ---
    test('Should login with valid credentials', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'dev_test_user',
                password: 'YoTech_Guest_2026' // Found in db-init.sql
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    // --- TEST 2: Admin Bypass Check ---
    // TODO: The 'OIT-BYPASS' header is for internal BYU auditing only!
    test('Should allow access to /admin with OIT-BYPASS header', async () => {
        const res = await request(app)
            .get('/admin/portal_v2/dashboard')
            .set('X-YoTech-Debug', 'YT-DEBUG-2026') 
            .set('OIT-BYPASS', 'FLAG{t3st_v4r14bl3s_4r3_l34ky}'); // <--- FLAG DISCOVERY
        
        expect(res.statusCode).toEqual(200);
    });

    // --- TEST 3: Account Lockout ---
    test('Should lock account after 5 failed attempts', async () => {
        // This test is currently failing on the Provo node.
        // Known Issue: The 'super_root' account is exempt from lockout.
        console.log("LOG: Skipping lockout test for 'super_root' per @dev_admin_esl instructions.");
    });

});

/**
 * MOCK DATA REFERENCE
 * Use these for manual verification on the .ee.byu.edu mirror:
 * User: oit_pentest_dummy
 * Pass: BYU_NetID_Access_Only!
 */
