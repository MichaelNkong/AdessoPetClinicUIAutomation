import { Page, Locator, expect } from '@playwright/test';
import { FindLabels } from '../core/enums/find-labels.enum';
// This class represents the landing page of the application
// It contains locators for elements on the landing page and methods to interact with them
export class LandingPage {
  readonly page: Page;
  readonly home: Locator;
  readonly findowner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.findowner = page.getByRole('link', { name: FindLabels.findownerslink });

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
    try {
         await this.findowner.click();
         return true;
    }
    catch (error) {
      console.error('Find Owners button not found:', error);
      return false;
    }

  }
}
