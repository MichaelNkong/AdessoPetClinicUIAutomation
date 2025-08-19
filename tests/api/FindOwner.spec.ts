import { test, expect } from '@playwright/test';
import { LandingPage } from '../../pages/LandingPage';
import { BasePage } from '../../pages/BasePage';
import { OwnersPage } from '../../pages/OwnersPage';
import owners from '../../core/test-data/owners.json';
import { ApiRequestsForTestsWrapper } from '../../core/api/ApiRequestHandler';
import { getApiHeaders } from '../../core/api/Headers';
import { getCookieString } from '../../core/api/Cookies';
   test.describe.configure({ mode: 'serial' });
 
let landingPage: LandingPage;
let basePage  : BasePage;
let ownerPage: OwnersPage;
let apiRequestsForTestsWrapper: ApiRequestsForTestsWrapper;
  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    basePage = new BasePage(page)
    ownerPage = new OwnersPage(page);
    apiRequestsForTestsWrapper = new ApiRequestsForTestsWrapper();
    await basePage.gotoURL();
  })


  test('fetch owner', async ({ page }) => {

  await  landingPage.clickFindOwners();
  await ownerPage.clickAddNewownerLink();
  await page.waitForTimeout(3000); // Wait for the page to load

  const cookies = await page.context().cookies();
console.log("Cookies length:", cookies.length);
cookies.forEach(c => console.log(c.name, c.value, c.domain, c.path));
    const headers = apiRequestsForTestsWrapper.getApiHeadersWithToken(await getCookieString(page));
     let owner =  await apiRequestsForTestsWrapper.findOwner("",headers);
     console.log('Owner fetched via API:', owner);

  
  

});
