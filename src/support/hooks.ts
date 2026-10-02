import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  setDefaultTimeout,
  Status
} from '@cucumber/cucumber';

import {
  Browser,
  BrowserContext,
  chromium,
  firefox,
  Page,
  webkit
} from '@playwright/test';

import fs from 'fs';
import path from 'path';

import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

let browser: Browser;

const browserName = process.env.BROWSER || 'chromium';

export interface TestContext {
  context: BrowserContext;
  page: Page;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
}

setDefaultTimeout(30000);

function getBrowser() {
  if (browserName === 'firefox') return firefox;
  if (browserName === 'webkit') return webkit;
  return chromium;
}

function cleanName(name: string) {
  return name
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .replace(/_+/g, '_');
}

BeforeAll(async function () {
  const browserType = getBrowser();

  browser = await browserType.launch({
    headless: false
  });

  fs.mkdirSync(`artifacts/screenshots/${browserName}`, {
    recursive: true
  });

  fs.mkdirSync(`artifacts/videos/${browserName}`, {
    recursive: true
  });
});

Before(async function (this: TestContext) {
  this.context = await browser.newContext({
    recordVideo: {
      dir: `artifacts/videos/${browserName}`
    }
  });

  this.page = await this.context.newPage();

  this.loginPage = new LoginPage(this.page);
  this.productsPage = new ProductsPage(this.page);
  this.cartPage = new CartPage(this.page);
  this.checkoutPage = new CheckoutPage(this.page);
});

After(async function (this: TestContext, scenario) {
  const status =
    scenario.result?.status === Status.PASSED
      ? 'PASSED'
      : 'FAILED';

  const scenarioName = cleanName(scenario.pickle.name);

  const screenshotPath = path.join(
    'artifacts',
    'screenshots',
    browserName,
    `${scenarioName}_${status}.png`
  );

  await this.page.screenshot({
    path: screenshotPath,
    fullPage: true
  });

  const video = this.page.video();

  await this.context.close();

  if (video) {
    const originalVideoPath = await video.path();

    const finalVideoPath = path.join(
      'artifacts',
      'videos',
      browserName,
      `${scenarioName}_${status}.webm`
    );

    if (originalVideoPath !== finalVideoPath) {
      fs.renameSync(originalVideoPath, finalVideoPath);
    }
  }
});

AfterAll(async function () {
  await browser.close();
});
