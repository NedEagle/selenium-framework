const { Builder, By } = require('selenium-webdriver');
const { describe, it, after, before } = require('mocha');
const assert = require('chai').assert;

let driver;

before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
});

after(() => {
    if (driver) {
        return driver.quit();
    }
});

describe('Sample Test on Google Homepage', () => {

    // Load saucedemo.com once at the beginning of the test sequence
    before(async () => {
        await driver.get('https://www.saucedemo.com/');
    });

    // Test#1- check title of saucedemo.com
    it('should open google and verify title', async () => {
        const title = await driver.getTitle();
        assert.strictEqual(title, 'Swag Labs');
    });

    // Test#2- Negative Login Test - No Username or Password - Verify Error Message
    it('should search for "Selenium" and verify title', function(done) {
        
        });
    });