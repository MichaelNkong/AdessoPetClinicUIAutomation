import { Page, Locator, expect } from '@playwright/test';

export class LandingPage {
  readonly page: Page;
  readonly home: Locator;
  readonly findowner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.findowner = page.getByRole('link', { name: 'Find Owners' });

  }

  async clickFindOwners() {

    await this.findowner.click();

  }
}
