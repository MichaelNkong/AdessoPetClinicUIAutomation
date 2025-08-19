import { test, expect } from '@playwright/test';
import { LandingPage } from '../../pages/LandingPage';
import { BasePage } from '../../pages/BasePage';
import { OwnersPage } from '../../pages/OwnersPage';
import { PetPage } from '../../pages/PetPage';
import { DatePicker } from '../../core/utils/DatePicker';
import pets from '../../core/test-data/pet.json';
import owners from '../../core/test-data/owners.json';
import { VisitLabels } from '../../core/enums/visit-labels.enum';
import visit from '../../core/test-data/visit.json';
test.describe('new pet', () => {
 test.describe.configure({ mode: 'serial' });
 
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
// This test clicks on the Find Owners link, fills in the last name input field,
// clicks the Find Owners button, and verifies that the owner information is displayed correctly
// It checks that the count of table rows is as expected and that the owner's name is present in the owner information
  
  test('search owner by last name and add new pet', async ({ page }) => {
    if(await  landingPage.clickFindOwners()){
        await ownerPage.fillLasNameInInputField(owners.Owners[2].lastName);
             await ownerPage.clickFindOwnersButton();
                await ownerPage.checkOwnersInOwnerInformation((owners.Owners[2].firstName+' '+ owners.Owners[2].lastName));
                  await ownerPage.clickLinkTextByText(owners.Owners[2].firstName+' '+ owners.Owners[2].lastName);  
                    await ownerPage.clickAddNewPetLink();
 
                       await petPage.fillPetName(pets.Pet[1].Name);    
                         await petPage.selectPetType();     
                            await  datePicker.fillbirthDate(pets.Pet[1].BirthDate);  
                                 await ownerPage.clickAddPetBtn();
                                    expect(await ownerPage.verifyPetAddedToPetsAndVisit(pets.Pet[1].Name)).toBeTruthy();

    }
    else {
      throw new Error('failed to click find owners');
    }
  });
   

  
  test('search owner by last name and add visit', async ({ page }) => {
    if(await  landingPage.clickFindOwners()){
        await ownerPage.fillLasNameInInputField(owners.Owners[2].lastName);
             await ownerPage.clickFindOwnersButton();
                await ownerPage.checkOwnersInOwnerInformation((owners.Owners[2].firstName+' '+ owners.Owners[2].lastName));
                  await ownerPage.clickLinkTextByText(owners.Owners[2].firstName+' '+ owners.Owners[2].lastName);  
                       await ownerPage.clickLinkTextByText(VisitLabels.addVisitBtn, 0); 
                              // await  datePicker.fillbirthDate(pets.Pet[1].BirthDate);  
                                  await petPage.fillVisitDescription(visit.Visit[0].description);
                                    await petPage.adVisitBtn.click();
                                       expect(await petPage.checkNewVisitInTable(visit.Visit[0].description)).toBeTruthy();
                   
 
                    

    }
    else {
      throw new Error('failed to click find owners');
    }
  });
   


  });


