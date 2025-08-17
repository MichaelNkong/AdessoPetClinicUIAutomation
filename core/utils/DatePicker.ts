import { Locator, Page, expect } from "@playwright/test";

export class DatePicker {
     
    pageInstance: Page;
    readonly birthDate: Locator;

    constructor(pageInstance: Page) {
     
        this.pageInstance = pageInstance;
        this.birthDate = pageInstance.locator('input#birthDate');
      
    }


    

/**
      * * This function picks a date from calendar based on the current date
      * @param numberOfDaysFromToday specify the number of days from today that you want to select in calendar
      * @param  index specify calendar index --> [0 = first, 1 = second, ...]

      */
    async datePicker(index: number, numberOfDaysFromToday: number) {
        try {

            const isVisible = await this.pageInstance.locator('input#birthDate').nth(index).isVisible({ timeout: 2000 });

            if (isVisible) {
                await this.pageInstance.locator('input#birthDate').nth(index).click();
                let today = new Date();
                today.setDate(today.getDate() + numberOfDaysFromToday);
                const expectedYear = today.getFullYear();
                const expectedDay = today.getDate().toString();
                const month = today.getMonth() + 1;// returns month as 1,2,3 ..
                const expectedMonth = today.toLocaleString('en-US', { month: 'long' }); // e.g., "March"
                const expectedDate = expectedYear + "/" + month + "/" + expectedDay;
                const dateToAsset = expectedMonth + " " + expectedYear;
                console.log(dateToAsset);
                console.log(expectedDay);
                let displayedMonthandYear: any;
                let i: number = 1;
                while (!(displayedMonthandYear == dateToAsset) && !(i == 12)) {
                    displayedMonthandYear = await this.pageInstance.locator("//div[@class = 'k-header']//a[@class = 'k-link k-nav-fast']").textContent({ timeout: 3000 });
                    await this.pageInstance.locator("//div[@class = 'k-header']//span[@class = 'k-icon k-i-arrow-60-right']").click();
                    i++;
                    console.log("diaplayed date " + displayedMonthandYear);
                }
                await this.pageInstance.locator("//tbody//tr[@role = 'row']//td[not(@class ='k-other-month')]//a[@data-value ='" + expectedDate + "']").nth(0).click({ timeout: 3000 });
            }
            else {

                console.log("cannot click calendar");
            }

        } catch (error) {
            console.error("Error:\t" + error.message);
        }
    }

      async fillbirthDate(birthDate: string) {
             await this.birthDate.fill(birthDate)

           }

           
      async getBirthDate() {
             return (this.birthDate);
        }

}