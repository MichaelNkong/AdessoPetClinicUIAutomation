import { test, expect } from '@playwright/test';
import { LandingPage } from '../../pages/LandingPage';
import { BasePage } from '../../pages/BasePage';
import { OwnersPage } from '../../pages/OwnersPage';
import { PetPage } from '../../pages/PetPage';
import owners from '../../core/test-data/owners.json';
import { DatePicker } from '../../core/utils/DatePicker';

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

  
  test('Search Owner by Last name  and Add New Pet', async ({ page }) => {
    await  landingPage.clickFindOwners();
        await ownerPage.fillLasNameInInputField('Nkongho');
             await ownerPage.clickFindOwnersButton();
                await ownerPage.checkOwnersInOwnerInformation('Michael Nkongho');
                 await ownerPage.clickAddNewPetLink();   
                    await petPage.fillPetName("Pauli");    
                         await petPage.selectPetType();     
                            await  datePicker.fillbirthDate("2020-12-01");  
                                 await petPage.clickAddPetBtn();
                                    expect(await ownerPage.verifyPetAddedToPetsAndVisit('Pauli')).toBeTruthy();
  });
   


  });


