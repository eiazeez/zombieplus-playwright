const { expect } = require('@playwright/test')

export class Header {

    constructor(page) {
        this.page = page
    }

    async goToRegister() {

        await this.page.click('a[href$=register]')

    }

}
