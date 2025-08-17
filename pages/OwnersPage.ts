import { Page, Locator, expect } from '@playwright/test';
import { text } from 'stream/consumers';


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



  constructor(page: Page) {
    this.page = page;
    this.lastNameInput = page.locator('#lastName');
    this.firstNameInput = page.locator('#firstName');
    this.address = page.locator('#address');
    this.city = page.locator('#city');
    this.telephone = page.locator('#telephone');
    this.ownersInformation = page.locator("//table[@class ='table table-striped']");
    this.findOwnerBtn = page.getByRole('button', { name: 'Find Owner' });
    this.addOwnerBtn = page.getByRole('button', { name: 'Add Owner' });
    this.addOwnerLink = page.getByRole('link', { name: 'Add Owner' });
    this.countTableEntries = page.locator("//table[@class ='table table-striped']//tbody//tr");
    this.petName = page.locator("input#name");
    this.addNewPetLink = page.getByRole('link', { name: 'Add New Pet' });
    this.petTableLocator = page.locator('dl.dl-horizontal');

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

  async clickAddNewownerLink() {
    await this.addOwnerLink.click();
  }
  async clickAddNewownerBtn() {
    await this.addOwnerBtn.click();
  }

  async countTableRows() {
    return (await this.countTableEntries.count());
  }

  async clickAddNewPetLink() {
    await this.addNewPetLink.click();
  }


  //pets are contained in the element dl with class dl-horizontal.
  //  get all elements and loop through all dl elements
  //  and then loop through sub elements to check the expected text
  async verifyPetAddedToPetsAndVisit(petPropertyToCheck: any) {
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
  
  async checkOwnersInOwnerInformation(petPropertyToCheck: string,index:number = 0) {
    let textFound: boolean = false;
    const dlCount =  this.ownersInformation.nth(index);
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


}