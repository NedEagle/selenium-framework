const { Builder, By } = require('selenium-webdriver');
const { describe, it, after, before } = require('mocha');
const assert = require('chai').assert;
const LoginPage = require('../../pages/saucedemoPages/loginPage');
const { expect } = require('chai');

let driver;
let loginPage;

before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    loginPage = new LoginPage(driver);
});

after(() => {
    if (driver) {
        return driver.quit();
    }
});

describe('Sample Test on saucedemo.com homepage', () => {

    before(async () => {
        await driver.get('https://www.saucedemo.com/');
    });

    // Test#1- Load saucedemo.com once at the beginning of the test sequence and verify title
    it('should open saucedemo and verify title', async () => {
        const title = await driver.getTitle();
        assert.strictEqual(title, 'Swag Labs');
    });

    // Test#2- attempt login with incorrect username and incorrect password and verify behavior
    it('should attempt login with inccorect login and incorrect password and verify behavior', async () => {
        
        await driver.navigate().refresh();
        await loginPage.enterIncorrectUsername();
        await loginPage.enterIncorrectPassword();
        await loginPage.clickLogin();
        
        // verify that the user is still in the current page
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/');

        // verify that the error message is displayed
        const errorMessage = await driver.findElement(By.css("h3:nth-child(1)")).getText();
        expect(errorMessage).to.equal('Epic sadface: Username and password do not match any user in this service');
    });

    // Test#3- attempt login with incorrect username and no password and verify behavior
    it('should attempt login with incorrect username and no password and verify behavior', async () => {
        
        await driver.navigate().refresh();
        await loginPage.enterIncorrectUsername();
        await loginPage.clickLogin();
        
        // verify that the user is still in the current page
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/');

        // verify that the error message is displayed
        const errorMessage = await driver.findElement(By.css("h3:nth-child(1)")).getText();
        expect(errorMessage).to.equal('Epic sadface: Password is required');
    });

    // Test#4- attempt login with incorrect username and correct password and verify behavior
    it('should attempt login with incorrect username and correct password and verify behavior', async () => {
        
        await driver.navigate().refresh();
        await loginPage.enterIncorrectUsername();
        await loginPage.enterCorrectPassword();
        await loginPage.clickLogin();
        
        // verify that the user is still in the current page
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/');

        // verify that the error message is displayed
        const errorMessage = await driver.findElement(By.css("h3:nth-child(1)")).getText();
        expect(errorMessage).to.equal('Epic sadface: Username and password do not match any user in this service');
    });

    // Test#5- attempt login with no username and incorrect password and verify behavior
    it('should attempt login with no username and incorrect password and verify behavior', async () => {
        
        await driver.navigate().refresh();
        await loginPage.enterIncorrectPassword();
        await loginPage.clickLogin();
        
        // verify that the user is still in the current page
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/');

        // verify that the error message is displayed
        const errorMessage = await driver.findElement(By.css("h3:nth-child(1)")).getText();
        expect(errorMessage).to.equal('Epic sadface: Username is required');
    });

    // Test#6- attempt login with no username and no password and verify behavior
    it('should attempt login with no username and no password and verify behavior', async () => {
        
        await driver.navigate().refresh();
        await loginPage.clickLogin();
        
        // verify that the user is still in the current page
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/');

        // verify that the error message is displayed
        const errorMessage = await driver.findElement(By.css("h3:nth-child(1)")).getText();
        expect(errorMessage).to.equal('Epic sadface: Username is required');
    });

    // Test#7- attempt login with no username and correct password and verify behavior
    it('should attempt login with no username and correct password and verify behavior', async () => {
        
        await driver.navigate().refresh();
        await loginPage.enterCorrectPassword();
        await loginPage.clickLogin();
        
        // verify that the user is still in the current page
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/');

        // verify that the error message is displayed
        const errorMessage = await driver.findElement(By.css("h3:nth-child(1)")).getText();
        expect(errorMessage).to.equal('Epic sadface: Username is required');
    });

    // Test#8- attempt login with correct username and incorrect password and verify behavior
    it('should attempt login with correct username and incorrect password and verify behavior', async () => {
        
        await driver.navigate().refresh();
        await loginPage.enterCorrectUsername();
        await loginPage.enterIncorrectPassword();
        await loginPage.clickLogin();
        
        // verify that the user is still in the current page
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/');

        // verify that the error message is displayed
        const errorMessage = await driver.findElement(By.css("h3:nth-child(1)")).getText();
        expect(errorMessage).to.equal('Epic sadface: Username and password do not match any user in this service');
    });

    // Test#9- attempt login with correct username and no password and verify behavior
    it('should attempt login with correct username and no password and verify behavior', async () => {
        
        await driver.navigate().refresh();
        await loginPage.enterCorrectUsername();
        await loginPage.clickLogin();
        
        // verify that the user is still in the current page
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/');

        // verify that the error message is displayed
        const errorMessage = await driver.findElement(By.css("h3:nth-child(1)")).getText();
        expect(errorMessage).to.equal('Epic sadface: Password is required');
    });

    // Test#10- attempt login with correct username and password and verify behavior
    it('should attempt login with correct username and correct password and verify behavior', async () => {

        await driver.navigate().refresh();
        await loginPage.enterCorrectUsername();
        await loginPage.enterCorrectPassword();
        await loginPage.clickLogin();
        
        // verify that the user is redirected to the inventory page w/succesful login
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/inventory.html');
    });


});