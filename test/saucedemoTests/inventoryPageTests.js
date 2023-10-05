const { Builder, By, until, } = require('selenium-webdriver');
const { describe, it, after, before } = require('mocha');
const assert = require('chai').assert;
const LoginPage = require('../../pages/saucedemoPages/loginPage');
const { expect } = require('chai');
const InventoryPage = require('../../pages/saucedemoPages/inventoryPage');

let driver;
let loginPage;
let inventoryPage;

before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
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

    // Test#1- Load Inventory Page
    it('should open inventory page and url should be correct', async () => {
        
        // login
        await loginPage.justLogin();
        
        // verify that the user is redirected to the inventory page w/succesful login
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/inventory.html');
    });

    // Test#2- Add Item to Cart and then remove it
    it('should verify adding item to cart and then removing it', async () => {
        
        // add backpack item to cart
        await inventoryPage.clickAddToCartBackpack();
        
        // verify that the item was added to the cart
        const cartBadge = await inventoryPage.getCartBadgeText();
        expect(cartBadge).to.equal('1');
        
        // remove backpack item from cart
        await inventoryPage.clickCartBadge();
        
        // verify that the user is redirected to the cart page
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/cart.html');
        
        // verify that the backpack was added to the cart
        const cartItem = await inventoryPage.cartInventoryItem();
        expect(cartItem).to.equal('Sauce Labs Backpack');
        
        // remove backpack item from cart
        await inventoryPage.clickRemoveBackpack();
        
        // Check if the cart item is still visible on the page.
        let cartItemVisible = false;
        try {
            cartItemVisible = await inventoryPage.cartInventoryItemVisible();
        } catch (error) {
            if (error.name !== 'NoSuchElementError') {
                throw error;
            }
        }
        
        // /* If the cart item is not visible, the test passes. If the cart item 
        //  is still visible, the test fails. */
        expect(cartItemVisible).to.equal(false);
    });

    // Test#3- Add Item to Cart and then buyi it
    it('should verify adding item to cart and then buying it', async () => {
        
        // click on continue shopping button
        await inventoryPage.clickContinueShoppingButton();

        // add backpack item and proceed to cart and click checkout
        await inventoryPage.clickAddToCartBackpack();
        await inventoryPage.clickCartBadge();
        await inventoryPage.clickCheckoutButton();

        // // verify that the user is redirected to the checkout page
        const currentURL = await driver.getCurrentUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/checkout-step-one.html');

        // checkout with premade user info and then verify user is in checkout overview
        await inventoryPage.checkout("John", "Doe", "12345");
        const currentURL2 = await driver.getCurrentUrl();
        expect(currentURL2).to.equal('https://www.saucedemo.com/checkout-step-two.html');

        // Once again check that user is only buying backpack and pricing is correct
        const cartItem = await inventoryPage.cartInventoryItem();
        const total = await inventoryPage.totalForBackpack();
        expect(total).to.equal('Item total: $29.99');

        // make sure taxAmountActual number from that function matches taxAmountExpected number from that function
        const taxAmountActual = await inventoryPage.taxAmountActualOfBackpack();
        const taxAmountExpected = await inventoryPage.taxAmountExpectedOfBackpack();
        expect(taxAmountActual).to.equal(taxAmountExpected);

        // make sure total is correct and then finish order
        const totalAmount = await inventoryPage.totalForBackpackWithTaxes();
        const totalAmountUI = await inventoryPage.totalForBackpackWithTaxesUI();
        expect(totalAmount).to.equal(totalAmountUI);
        await inventoryPage.clickFinishOrderButton();

        //make sure user is redirected to the order complete page
        const currentURL3 = await driver.getCurrentUrl();
        expect(currentURL3).to.equal('https://www.saucedemo.com/checkout-complete.html');
        
        // check for the order verification image and texts
        const checkmarkImageIsVisible = await inventoryPage.checkmarkVisible();
        expect(checkmarkImageIsVisible).to.equal(true);
        const checkoutCompleteMessage = await inventoryPage.checkoutCompleteMessageText();
        expect(checkoutCompleteMessage).to.equal('Checkout: Complete!');
        const thankYouForOrderMessage = await inventoryPage.thankYouForOrderMessageText();
        expect(thankYouForOrderMessage).to.equal('Thank you for your order!');

        //click back home button and verify user is redirected to inventory page
        await inventoryPage.clickBackHomeButton();
        const currentURL4 = await driver.getCurrentUrl();
        expect(currentURL4).to.equal('https://www.saucedemo.com/inventory.html');
        


        
    });



});
