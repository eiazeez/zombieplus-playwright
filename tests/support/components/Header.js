const { expect } = require('@playwright/test')

export class Header {

    constructor(page) {
        this.page = page
    }

    async goToRegister() {

        await this.page.click('a[href$=register]')

    }

    async searchFor(text) {

        await this.page.fill('input[placeholder="Busque pelo nome"]', text)
        await this.page.click('.actions button')

    }

    async goToTvShows() {

        await this.page.locator('a[href="/admin/tvshows"]').click()

    }

}
