import { test, expect } from '@playwright/test';
import { LandingPage } from '../../pages/LandingPage';
import { BasePage } from '../../pages/BasePage';
import { OwnersPage } from '../../pages/OwnersPage';
import { PetPage } from '../../pages/PetPage';
import { DatePicker } from '../../core/utils/DatePicker';
import pets from '../../core/test-data/pet.json';
import owners from '../../core/test-data/owners.json';
test.describe('New Pet', () => {
 
let landingPage: LandingPage;
let basePage  : BasePage;
let ownerPage: OwnersPage;
let petPage : PetPage;
let datePicker : DatePicker;
  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    basePage = new BasePage(page)
    petPage = new PetPage(page);
    datePicker = new DatePicker(page);
    ownerPage = new OwnersPage(page);
    await basePage.gotoURL();
  })

  
  test('Search Owner by Last name and Add New Pet', async ({ page }) => {
    await  landingPage.clickFindOwners();
        await ownerPage.fillLasNameInInputField(owners.Owners[1].lastName);
             await ownerPage.clickFindOwnersButton();
                await ownerPage.checkOwnersInOwnerInformation((owners.Owners[1].firstName+' '+ owners.Owners[1].lastName));
                 await ownerPage.clickAddNewPetLink();   
                    await petPage.fillPetName(pets.Pet[1].Name);    
                         await petPage.selectPetType();     
                            await  datePicker.fillbirthDate(pets.Pet[1].BirthDate);  
                                 await petPage.clickAddPetBtn();
                                    expect(await ownerPage.verifyPetAddedToPetsAndVisit(pets.Pet[1].Name)).toBeTruthy();
  });
   


  });


