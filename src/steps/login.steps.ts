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
