import { Page } from '@playwright/test';

export class BasePage {
  readonly baseURL: string;

  constructor(protected page: Page) {
    this.baseURL = process.env.BASE_URL || '';
  }
   /**
   * This function navigates to a specified URL.
   * If the path does not start with 'http', it appends the base URL.
   * @param path - The path to navigate to, defaults to an empty string.
   */
  async gotoURL(path: string = '') {
    await this.page.goto(
      path.startsWith('http') ? path : `${this.baseURL}${path}`
    );
  }

  
 
}
