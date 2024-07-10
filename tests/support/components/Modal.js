const { expect } = require('@playwright/test')

export class Modal {

    constructor(page) {
        this.page = page
    }

    async shouldContainText(message) {

        const element = this.page.locator('.swal2-popup div[class^=swal2-html]')

        await expect(element).toBeVisible()
        await expect(element).toContainText(message)
        
    }

}

