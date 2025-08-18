import { Page, Locator, expect } from '@playwright/test';

// This class represents the Pet page of the application
// It contains locators for elements on the Pet page and methods to interact with them
export class PetPage {
    readonly page: Page;
    readonly petName: Locator;
    readonly petType: Locator;
    readonly addPetbtn: Locator;
    readonly desciption: Locator;
    readonly adVisitBtn: Locator;
      readonly vistData: Locator;
    constructor(page: Page) {
        this.page = page;
        this.petName = page.locator("input#name");
        this.petType = page.locator("select#type");
        this.desciption = page.locator("input#description");
        this.adVisitBtn = page.getByRole('button', { name: 'Add Visit' });
        this.vistData = page.locator('table.table-condensed');



    }

    async getPetName() {
        return this.petName;
    }
    async getAddPetBtn() {
        return this.addPetbtn;
    }
    async getPetType() {
        return this.petType;
    }
    async fillPetName(input: string) {
        await this.petName.type(input);
    }

       async fillVisitDescription(input: string) {
        await this.desciption.type(input);
    }
    // This function selects a pet type from the dropdown
    // Default is 'dog', but can be changed to any other type like 'cat', 'bird', etc.
    async selectPetType(petType: string = 'dog') {
        await this.petType.click();
        await this.petType.selectOption({ value: petType });
    }
    async clickAddPetBtn() {
        await this.addPetbtn.click();
    }

    
  /**
    * This function verifies if pet visit data is present in the table.
    * @param index specifies the index of the table because we have multiple tables(information has index 0)
     * @param petPropertyToCheck specifies the property of the pet to be checked in the table
     * @return boolean indicating if the pet property was found in the table
     * 
    */

  async checkNewVisitInTable(petPropertyToCheck: string, index: number = 0) {

    try {

      let textFound: boolean = false;
      const dlCount = this.vistData.nth(index);
      const dtElements = dlCount.locator('td');
      const dtCount = await dtElements.count();
      for (let j = 0; j < dtCount; j++) {
        const ddText = await dtElements.nth(j).innerText();
        if (ddText == petPropertyToCheck) {
          textFound = true;
          break;

        }

      }
      return textFound;
    }
    catch (error) {
      console.error('locator not found:', error);
    }

  }
   
}