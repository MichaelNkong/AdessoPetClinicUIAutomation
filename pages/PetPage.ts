import { Page, Locator, expect } from '@playwright/test';


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
    async selectPetType(petType: string = 'dog') {
        await this.petType.click();
        await this.petType.selectOption({ value: petType });
    }
    async clickAddPetBtn() {
        await this.addPetbtn.click();
    }
}