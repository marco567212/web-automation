import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  private checkoutButton: Locator;

  constructor(private page: Page) {
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectProduct(productName: string) {
    await expect(this.page).toHaveURL(/cart\.html/);

    const product = this.page
      .locator('[data-test="inventory-item-name"]')
      .filter({ hasText: productName });

    await expect(product).toBeVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
