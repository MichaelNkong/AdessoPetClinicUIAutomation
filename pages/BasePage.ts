import { Page } from '@playwright/test';

export class BasePage {
  readonly baseURL: string;

  constructor(protected page: Page) {
    this.baseURL = process.env.BASE_URL || '';
  }

  async gotoURL(path: string = '') {
    await this.page.goto(
      path.startsWith('http') ? path : `${this.baseURL}${path}`
    );
  }

  
 
}
