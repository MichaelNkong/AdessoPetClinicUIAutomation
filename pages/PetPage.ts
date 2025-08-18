import { Page, Locator, expect } from '@playwright/test';

// This class represents the Pet page of the application
// It contains locators for elements on the Pet page and methods to interact with them
export class PetPage {
    readonly page: Page;
    readonly petName: Locator;
    readonly petType: Locator;
    readonly addPetbtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.petName = page.locator("input#name");
        this.petType = page.locator("select#type");
        this.addPetbtn = page.getByRole('button', { name: 'Add Pet' });



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
    // This function selects a pet type from the dropdown
    // Default is 'dog', but can be changed to any other type like 'cat', 'bird', etc.
    async selectPetType(petType: string = 'dog') {
        await this.petType.click();
        await this.petType.selectOption({ value: petType });
    }
    // This function clicks on the Add Pet button on the owners page
    async clickAddPetBtn() {
        await this.addPetbtn.click();
    }
}