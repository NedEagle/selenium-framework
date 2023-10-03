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

    // Load Google once at the beginning of the test sequence
    before(async () => {
        await driver.get('https://www.google.com');
    });

    // Test#1- check Google title
    it('should open google and verify title', async () => {
        const title = await driver.getTitle();
        assert.strictEqual(title, 'Google');
    });

    // Test#2- search for "Selenium" and verify title
    it('should search for "Selenium" and verify title', function(done) {
        driver.findElement(By.css('#APjFqb')).then(searchBox => {
            return searchBox.sendKeys('Selenium');
        }).then(() => {
            return driver.findElement(By.css('#APjFqb')).submit();

        // return driver.wait(until.titleIs('Selenium - Google Search'), 8000);    
        }).then(() => {
            return driver.wait(function() {
                return driver.getTitle().then(title => {
                    return title === 'Selenium - Google Search';
                });
            }, 8000);
        
        // now that we have the title, we can assert it
        }).then(() => {
            return driver.getTitle();
        }).then(title => {
            assert.strictEqual(title, 'Selenium - Google Search');
            done(); 
        }).catch(err => {
            done(err); 
        });
    });
}
);

