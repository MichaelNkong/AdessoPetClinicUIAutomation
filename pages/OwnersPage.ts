import { Page, Locator, expect } from '@playwright/test';
import { text } from 'stream/consumers';
import { FindLabels } from '../core/enums/find-labels.enum';
import { OwnerLabels } from '../core/enums/owner-labels.enum';
import { PetLabels } from '../core/enums/pet-labels.enum';
// This class represents the Owners page of the application
// It contains locators for elements on the Owners page and methods to interact with them
export class OwnersPage {
  readonly page: Page;
  readonly lastNameInput: Locator;
  readonly ownersInformation: Locator;
  readonly findOwnerBtn: Locator;
  readonly firstNameInput: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly telephone: Locator;
  readonly addOwnerBtn: Locator;
  readonly addOwnerLink: Locator;
  readonly countTableEntries: Locator;
  readonly petName: Locator;
  readonly addNewPetLink: Locator;
  readonly petTableLocator: Locator;
  readonly addPetbtn: Locator;
 

  constructor(page: Page) {
    this.page = page;
    this.lastNameInput = page.locator('#lastName');
    this.firstNameInput = page.locator('#firstName');
    this.address = page.locator('#address');
    this.city = page.locator('#city');
    this.telephone = page.locator('#telephone');
    this.ownersInformation = page.locator("//table[@class ='table table-striped']");
    this.findOwnerBtn = page.getByRole('button', { name: FindLabels.findownerbtn });
    this.addOwnerBtn = page.getByRole('button', { name: FindLabels.addownerbtn });
    this.addOwnerLink = page.getByRole('link', { name: FindLabels.addownerbtn });
    this.countTableEntries = page.locator("//table[@class ='table table-striped']//tbody//tr");
    this.petName = page.locator("input#name");
    this.addNewPetLink = page.getByRole('link', { name: OwnerLabels.addnewpetlink });
    this.petTableLocator = page.locator('dl.dl-horizontal');
    this.addPetbtn = page.getByRole('button', { name: PetLabels.addpetBtn });
  
  }

  async getLatName() {
    return this.lastNameInput;
  }
  async fillLasNameInInputField(input: string) {
    await this.lastNameInput.fill(input);
  }
  async getAddNewPetLink() {
    return this.addNewPetLink;
  }

  async clickFindOwnersButton() {
    await this.findOwnerBtn.click();
  }


  async fillFirstName(input: string) {
    await this.firstNameInput.fill(input);
  }
  async fillTelephoneInput(input: string) {
    await this.telephone.fill(input);
  }

  async fillCityInput(input: string) {
    await this.city.fill(input);
  }

  async fillAddress(input: string) {
    await this.address.fill(input);
  }
   // This function clicks on the Add Pet button on the owners page
    async clickAddPetBtn() {
        await this.addPetbtn.click();
    }

  // This function clicks on the Add New Owner link on the owners page
  // It is used to navigate to the page where a new owner can be added
  async clickAddNewownerLink() {
    try {

      await this.addOwnerLink.click();
      return true;
    }
    catch (error) {
      console.error('Add New Owner Not clicked:', error);
      return false;
    }

  }
  // This function clicks on the Add Owner button on the owners page
  // It is used to submit the form for adding a new owner
  async clickAddNewownerBtn() {
    await this.addOwnerBtn.click();
  }
  // This function counts the number of table entries in the owners information table
  async countTableRows() {
    return (await this.countTableEntries.count());
  }


  async clickAddNewPetLink() {
       try {
      
         await this.addNewPetLink.click();
         return true;
    }
    catch (error) {
      console.error('failed to click add new pet link:', error);
      return false;
    }

  }
//click name by text on tABLE
  async clickLinkTextByText(text: string, index: number= 0) {

       try {
      
         this.page.getByRole('link', { name: text}).nth(index).click();
         return true;
    }
    catch (error) {
      console.error('failed to click add new pet link:', error);
      return false;
    }

  }

  /**
      * This function verifies if pet has been added to table pet and visit.
       * @param petPropertyToCheck specifies the property of the pet to be checked in the table
       * @return boolean indicating if the pet property was found in the table
       *
      */
  async verifyPetAddedToPetsAndVisit(petPropertyToCheck: any) {

    try {
      let textFound: boolean = false;
      const dlCount = await this.petTableLocator.count();
      for (let i = 0; i < dlCount; i++) {
        const dl = this.petTableLocator.nth(i);
        const dtElements = dl.locator('dd');
        const dtCount = await dtElements.count();

        for (let j = 0; j < dtCount; j++) {
          const ddText = await dtElements.nth(j).innerText();
          if (ddText == petPropertyToCheck) {
            textFound = true;
            break;

          }

        }
      }
      return textFound;
    }
    catch (error) {
      console.error('table locator not found', error);
    }


  }

  /**
    * This function verifies if owners information is displayed in the table
    * @param index specifies the index of the table because we have multiple tables(information has index 0)
     * @param petPropertyToCheck specifies the property of the pet to be checked in the table
     * @return boolean indicating if the pet property was found in the table
     * 
    */

  async checkOwnersInOwnerInformation(petPropertyToCheck: string, index: number = 0) {

    try {

      let textFound: boolean = false;
      const dlCount = this.ownersInformation.nth(index);
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