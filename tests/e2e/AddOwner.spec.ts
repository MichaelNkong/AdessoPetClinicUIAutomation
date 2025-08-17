import { test, expect } from '@playwright/test';
import { LandingPage } from '../../pages/LandingPage';
import { BasePage } from '../../pages/BasePage';
import { OwnersPage } from '../../pages/OwnersPage';
import owners from '../../core/test-data/owners.json';

test.describe('New Owner', () => {
 
let landingPage: LandingPage;
let basePage  : BasePage;
let ownerPage: OwnersPage;
  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    basePage = new BasePage(page)
    ownerPage = new OwnersPage(page);
    await basePage.gotoURL();
  })
  test.only('Click Find Owners and verify Owner on page', async ({ page }) => {
    await  landingPage.clickFindOwners();
            await ownerPage.fillLasNameInInputField(owners.Owners[0].lastName);
                await ownerPage.clickFindOwnersButton();
                  expect( await ownerPage.countTableRows(),"Rows are not as expected").toBe(3);
                      expect (await ownerPage.checkOwnersInOwnerInformation((owners.Owners[0].firstName+' '+owners.Owners[0].lastName)),"data bot found").toBe(true);

  });

  
  test('Click Find Owners and Add New Owner', async ({ page }) => {
  await  landingPage.clickFindOwners();
  await ownerPage.clickAddNewownerLink();
    await ownerPage.fillLasNameInInputField(owners.Owners[0].lastName);
       await ownerPage.fillFirstName(owners.Owners[0].firstName);
          await ownerPage.fillAddress(owners.Owners[0].address);
             await ownerPage.fillCityInput(owners.Owners[0].city);
                await ownerPage.fillTelephoneInput(owners.Owners[0].telephone);
                   await ownerPage.clickAddNewownerBtn();

  });

});
