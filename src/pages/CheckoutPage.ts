import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postalCodeInput: Locator;
  private continueButton: Locator;
  private finishButton: Locator;
  private completeHeader: Locator;

  constructor(private page: Page) {
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  async completePurchase() {
    await this.firstNameInput.fill('Gianmarco');
    await this.lastNameInput.fill('QA');
    await this.postalCodeInput.fill('15036');
    await this.continueButton.click();
    await this.finishButton.click();
  }

  async expectPurchaseCompleted() {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
