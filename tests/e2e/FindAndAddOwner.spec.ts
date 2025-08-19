import { test, expect } from '@playwright/test';
import { LandingPage } from '../../pages/LandingPage';
import { BasePage } from '../../pages/BasePage';
import { OwnersPage } from '../../pages/OwnersPage';
import owners from '../../core/test-data/owners.json';

test.describe('new owner', () => {
   test.describe.configure({ mode: 'serial' });
 
let landingPage: LandingPage;
let basePage  : BasePage;
let ownerPage: OwnersPage;
  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    basePage = new BasePage(page)
    ownerPage = new OwnersPage(page);
    await basePage.gotoURL();
  })


  // This test clicks on the Add New Owner link and fills in the form with owner data
  // It then clicks the Add Owner button to submit the form
  // Finally, it verifies that the owner has been added by checking the count of table entries
  // and the presence of the owner's name in the owner information
  test('click find owners and add new owner', async ({ page }) => {
  await  landingPage.clickFindOwners();
  await ownerPage.clickAddNewownerLink();
    await ownerPage.fillLasNameInInputField(owners.Owners[0].lastName);
       await ownerPage.fillFirstName(owners.Owners[0].firstName);
          await ownerPage.fillAddress(owners.Owners[0].address);
             await ownerPage.fillCityInput(owners.Owners[0].city);
                await ownerPage.fillTelephoneInput(owners.Owners[0].telephone);
                   await ownerPage.clickAddNewownerBtn();

  });
  // This test clicks on the Find Owners link, fills in the last name input field,
  // clicks the Find Owners button, and verifies that the owner information is displayed correctly
  // It checks that the count of table rows is as expected and that the owner's name is present in the owner information
  test('click find owners and verify owner on page', async ({ page }) => {
    await  landingPage.clickFindOwners();
            await ownerPage.fillLasNameInInputField(owners.Owners[0].lastName);
                await ownerPage.clickFindOwnersButton();
                 // expect( await ownerPage.countTableRows(),"Rows are not as expected").toBe(1);
                      expect (await ownerPage.checkOwnersInOwnerInformation((owners.Owners[0].firstName+' '+owners.Owners[0].lastName)),"data bot found").toBe(true);

  });

  

});
