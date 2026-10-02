import {
  Given,
  Then,
  When
} from '@cucumber/cucumber';

import { TestContext } from '../support/hooks';

Given(
  'que el usuario está en Sauce Demo',
  async function (this: TestContext) {
    await this.loginPage.open();
  }
);

When(
  'inicia sesión con {string} y {string}',
  async function (
    this: TestContext,
    username: string,
    password: string
  ) {
    await this.loginPage.login(username, password);
  }
);

Then(
  'visualiza la página de productos',
  async function (this: TestContext) {
    await this.productsPage.expectLoaded();
  }
);

Then(
  'visualiza un mensaje de usuario bloqueado',
  async function (this: TestContext) {
    await this.loginPage.expectErrorContains(
      'Sorry, this user has been locked out'
    );
  }
);

Then(
  'visualiza un mensaje de error',
  async function (this: TestContext) {
    await this.loginPage.expectErrorContains(
      'Username and password do not match'
    );
  }
);

Given(
  'que el usuario inicia sesión correctamente',
  async function (this: TestContext) {
    await this.loginPage.open();
    await this.loginPage.login('standard_user', 'secret_sauce');
    await this.productsPage.expectLoaded();
  }
);

When(
  'agrega {string} al carrito',
  async function (
    this: TestContext,
    productName: string
  ) {
    await this.productsPage.addProduct(productName);
  }
);

When(
  'abre el carrito',
  async function (this: TestContext) {
    await this.productsPage.openCart();
  }
);

Then(
  'visualiza {string} en el carrito',
  async function (
    this: TestContext,
    productName: string
  ) {
    await this.cartPage.expectProduct(productName);
  }
);

When(
  'completa el proceso de compra',
  async function (this: TestContext) {
    await this.cartPage.checkout();
    await this.checkoutPage.completePurchase();
  }
);

Then(
  'visualiza la confirmación de compra',
  async function (this: TestContext) {
    await this.checkoutPage.expectPurchaseCompleted();
  }
);
