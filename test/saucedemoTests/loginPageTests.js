const { Builder, By, until, } = require('selenium-webdriver');
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

describe('Sample Test on saucedemo.com login', () => {
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
        
        // Refresh page and login with inputs
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
        
        // Refresh page and login with inputs
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
        
        // Refresh page and login with inputs
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
        
        // Refresh page and login with inputs
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
        
        // Refresh page and login with inputs
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
        
        // Refresh page and login with inputs
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
        
        // Refresh page and login with inputs
        await driver.navigate().refresh();
        await loginPage.enterStandardUser(); 
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
        
        // Refresh page and login with inputs
        await driver.navigate().refresh();
        await loginPage.enterStandardUser();
        await loginPage.clickLogin();
        
        // verify that the user is still in the current page
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/');

        // verify that the error message is displayed
        const errorMessage = await driver.findElement(By.css("h3:nth-child(1)")).getText();
        expect(errorMessage).to.equal('Epic sadface: Password is required');
    });

    // Test#10- attempt login with correct username and password and verify behavior
    it('should attempt login with the first correct username and correct password and verify behavior', async () => {

        // Refresh page and login with inputs
        await driver.navigate().refresh();
        await loginPage.login('standard_user', 'secret_sauce');
        
        // verify that the user is redirected to the inventory page w/succesful login
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/inventory.html');
    });

    // Test#11- attempt login with locked out user and verify behavior
    it('should attempt login with the correct locked out user and correct password and verify behavior', async () => {
        
        // Refresh page and login with inputs
        await driver.get('https://www.saucedemo.com/');
        await loginPage.login('locked_out_user','secret_sauce');
        
        // verify that the error message is displayed
        const errorMessage = await driver.findElement(By.css("h3:nth-child(1)")).getText();
        expect(errorMessage).to.equal('Epic sadface: Sorry, this user has been locked out.');
    });

    // Test#12- attempt login with the problem user and correct password and verify behavior
    it('should attempt login with the problem user username and correct password and verify behavior', async () => {

        // Refresh page and login with inputs
        await driver.get('https://www.saucedemo.com/');
        await loginPage.login('problem_user', 'secret_sauce');
        
        // verify that the user is redirected to the inventory page w/succesful login
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/inventory.html');
    });

    // Test#13- attempt login with the performance glitch user and correct password and verify behavior
    it('should attempt login with the problem user username and correct password and verify behavior', async function() { //this.timeout gets an error when using arrow function, so it was replaced here
        
        /* Default timeout is 2000ms, test needs more time to run since 
        this account has a performance glitch */
        this.timeout(10000);

        // Refresh page and login with inputs
        await driver.get('https://www.saucedemo.com/');
        await loginPage.login('performance_glitch_user', 'secret_sauce');

        // wait till element with the class="inventory_item_img is loaded and check for an item
        const inventoryItemShirt = By.css("#item_1_img_link");
        await driver.wait(until.elementsLocated(inventoryItemShirt), 10000);
        
        
        // verify that the user is redirected to the inventory page w/succesful login
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/inventory.html');
    });

});