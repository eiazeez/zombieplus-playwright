const { expect } = require('@playwright/test')

export class LoginPage {
   
    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async fillForm(user) {
        if(user.email) await this.page.getByPlaceholder('E-mail').fill(user.email)
        if(user.password) await this.page.getByPlaceholder('Senha').fill(user.password)
    }

    async submitForm() {
        await this.page.click('button[type="submit"]')
    }

    async alertShouldHave(text) {
        const alert = this.page.locator('span[class$=alert]')

        await expect(alert).toHaveText(text)
    }

}