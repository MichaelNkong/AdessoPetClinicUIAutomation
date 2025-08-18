import { Page, Locator, expect } from '@playwright/test';


export class GeneralPage {
  readonly page: Page;
  readonly input: Locator;

  constructor(page: Page) {
    this.page = page;

  }
 /**
     * This function fills out input fields in a form table.
     * @param idForm specifies the form id
     * @param input specifies the input value to be filled in the input field
     * @param inputid specifies the input field id
     * @param index specifies the index of the input field in case there are multiple fields with the same id
     */
  async fillOutFormTableInputFields(idForm: string, input:any ,inputid:string,index:number = 0) {
    this.page.locator("//form[@id ='"+idForm+"']//input[@id ='"+inputid+"']").nth(index).fill(input);
  }


}