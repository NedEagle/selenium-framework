const { By } = require('selenium-webdriver');

class InventoryPage {
    constructor(driver) {
        this.driver = driver;

        // Add to cart button for different items (ATC)
        this.backpackATCButton = By.css("#add-to-cart-sauce-labs-backpack");
        this.bikeLightATCButton = By.css("#add-to-cart-sauce-labs-bike-light");
        this.boltTshirtATCButton = By.css("#add-to-cart-sauce-labs-bolt-t-shirt");
        this.fleeceJacketATCButton = By.css("#add-to-cart-sauce-labs-fleece-jacket");
        this.onesieATCButton = By.css("#add-to-cart-sauce-labs-onesie");
        this.alltheThingsATCButton = By.css("#add-to-cart-test.allthethings()-t-shirt-(red)");
        
        this.cartBadge = By.css(".shopping_cart_badge");
        this.cartItem = By.css(".inventory_item_name");
        this.cartQuantity = By.css(".cart_quantity");
        this.continueShoppingButton = By.css("#continue-shopping");
        this.checkoutButton = By.css("#checkout");
        this.totalOnlyBackpack = By.className('summary_subtotal_label');
        this.taxAmount = By.className('summary_tax_label');
        this.totalOnlyBackpackAndTax = By.className('summary_info_label summary_total_label');

        this.checkoutFirstName = By.css("#first-name");
        this.checkoutLastName = By.css("#last-name");
        this.checkoutZipCode = By.css("#postal-code");
        this.continueButton = By.css("#continue");
        this.finishOrderButton = By.css("#finish");
        this.checkmarkImage = By.css(".pony_express");
        this.thankYouForYourOrderMessage = By.css(".complete-header");
        this.checkoutCompleteMessage = By.css(".title");
        this.backHomeButton = By.css("#back-to-products");
        
        this.removeBackpackButton = By.css("#remove-sauce-labs-backpack");
        this.removeBikeLightButton = By.css("#remove-sauce-labs-bike-light");
        this.removeBoltTshirtButton = By.css("#remove-sauce-labs-bolt-t-shirt");
        this.removeFleeceJacketButton = By.css("#remove-sauce-labs-fleece-jacket");
        this.removeOnesieButton = By.css("#remove-sauce-labs-onesie");
        this.removeAlltheThingsButton = By.css("#remove-test.allthethings()-t-shirt-(red)");

    }


    // INVENTORY PAGE
    async clickAddToCartBackpack() {
        await this.driver.findElement(this.backpackATCButton).click();
    }

    async clickAddToCartBikeLight() {
        await this.driver.findElement(this.bikeLightATCButton).click();
    }

    async clickAddToCartBoltTshirt() {
        await this.driver.findElement(this.boltTshirtATCButton).click();
    }

    async clickAddToCartFleeceJacket() {
        await this.driver.findElement(this.fleeceJacketATCButton).click();
    }

    async addToCartOnesie() {
        await this.driver.findElement(this.onesieATCButton).click();
    }

    async clickAddToCartAlltheThings() {
        await this.driver.findElement(this.alltheThingsATCButton).click();
    }

    // INVENTORY PAGE - CART INTERACTIONS

    async getCartBadgeText() {
        return await this.driver.findElement(this.cartBadge).getText();
    }

    async clickCartBadge() {
        await this.driver.findElement(this.cartBadge).click();
    }

    async cartInventoryItem() {
        return await this.driver.findElement(this.cartItem).getText();
    }

    async clickRemoveButton() {
        await this.driver.findElement(this.removeButton).click();
    }

    async cartQuantity() {
        return await this.driver.findElement(this.cartQuantity).getText();
    }

    async cartInventoryItemVisible() {
        return await this.driver.findElement(this.cartItem).isDisplayed();
    }

    async clickContinueShoppingButton() {
        await this.driver.findElement(this.continueShoppingButton).click();
    }

    async clickCheckoutButton() {
        await this.driver.findElement(this.checkoutButton).click();
    }

    async clickContinueCheckoutButton() {
        await this.driver.findElement(this.continueButton).click();
    }

    async checkout(firstname, lastname, zipcode) {
        await this.driver.findElement(this.checkoutFirstName).sendKeys(firstname);
        await this.driver.findElement(this.checkoutLastName).sendKeys(lastname);
        await this.driver.findElement(this.checkoutZipCode).sendKeys(zipcode);
        await this.clickContinueCheckoutButton();
    }

    // INVENTORY PAGE - CHECKOUT
    async totalForBackpack() {
        return await this.driver.findElement(this.totalOnlyBackpack).getText();
    }

    async taxForBackpack() {
        return await this.driver.findElement(this.taxAmount).getText();
    }

    async totalBackpackWithTax() {
        return await this.driver.findElement(this.totalOnlyBackpackAndTax).getText();
    }

    async clickFinishOrderButton() {
        await this.driver.findElement(this.finishOrderButton).click();
    }

    //grab tax amount from page and then convert it into number form to 2 decimal places
    async taxAmountActualOfBackpack() {
        let taxAmount = await this.taxForBackpack();
        // taxAmount is a string, so we need to convert it into a number
        // by using substring to remove the first 6 char of the string, which are "Tax: $"
        // then we convert it into a number by multiplying it by any number, in this case 1.00
        // then convert it back to string from a number keeping 2 decimal places
        taxAmount = taxAmount.substring(6, taxAmount.length);
        taxAmount = taxAmount * 1.00;
        return taxAmount.toFixed(2);
    }

    //calculate tax amount its 8 percent of totalOnlyBackpack, change it into number form to 2 decimal places
    async taxAmountExpectedOfBackpack() {
        let taxAmount = await this.totalForBackpack()
        taxAmount = taxAmount.substring(13, taxAmount.length);
        taxAmount = taxAmount * .08;
        return taxAmount.toFixed(2);
    }

    async totalForBackpackWithoutTax() {
        let total = await this.totalForBackpack();
        total = total.substring(13, total.length);
        return total;
    }

    async totalForBackpackWithTaxes() {
        let total = await this.totalForBackpack();
        total = total.substring(13, total.length);
        let taxAmount = await this.taxForBackpack();
        taxAmount = taxAmount.substring(6, taxAmount.length);
        taxAmount = taxAmount * 1.00;
        total = total * 1.00;
        total = total + taxAmount;
        return total.toFixed(2);
    }

    async totalForBackpackWithTaxesUI() {
        let total = await this.totalBackpackWithTax();
        total = total.substring(8, total.length);
        total = total * 1;
        return total.toFixed(2);

    }

    // INVENTORY PAGE - CHECKOUT COMPLETE
    async checkmarkVisible() {
        return await this.driver.findElement(this.checkmarkImage).isDisplayed();
    }

    async thankYouForOrderMessageText() {
        return await this.driver.findElement(this.thankYouForYourOrderMessage).getText();
    }

    async checkoutCompleteMessageText() {
        return await this.driver.findElement(this.checkoutCompleteMessage).getText();
    }

    async clickBackHomeButton() {
        await this.driver.findElement(this.backHomeButton).click();
    }



    // CLICK REMOVE BUTTONS FOR EACH ITEM
    async clickRemoveBackpack() {
        await this.driver.findElement(this.removeBackpackButton).click();
    }
    async clickRemoveBikeLight() {
        await this.driver.findElement(this.removeBikeLightButton).click();
    }
    async clickRemoveBoltTshirt() {
        await this.driver.findElement(this.removeBoltTshirtButton).click();
    }
    async clickRemoveFleeceJacket() {
        await this.driver.findElement(this.removeFleeceJacketButton).click();
    }
    async clickRemoveOnesie() {
        await this.driver.findElement(this.removeOnesieButton).click();
    }
    async clickRemoveAlltheThings() {
        await this.driver.findElement(this.removeAlltheThingsButton).click();
    }


    //






}

module.exports = InventoryPage;