import { Page, Locator, expect } from '@playwright/test';

// This class represents the landing page of the application
// It contains locators for elements on the landing page and methods to interact with them
export class LandingPage {
  readonly page: Page;
  readonly home: Locator;
  readonly findowner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.findowner = page.getByRole('link', { name: 'Find Owners' });

  }
 /**
   * This function clicks on the Find Owners link on the landing page.
   */
  async clickFindOwnersLink() {
    await this.findowner.click();
  }
    /**
   * This function clicks on the Find Owners button on the landing page.
   */
  async clickFindOwners() {

    await this.findowner.click();

  }
}
