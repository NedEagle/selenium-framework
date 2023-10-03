const { Builder } = require('selenium-webdriver');
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

describe('Sample Test', () => {
    it('should open google and verify title', async () => {
        await driver.get('https://www.google.com');
        const title = await driver.getTitle();
        assert.strictEqual(title, 'Google');
    });
});

