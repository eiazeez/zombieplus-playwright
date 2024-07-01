const { expect } = require('@playwright/test')

export class LandingPage {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000');
    }

    async openLeadModal() {
        await this.page.getByRole('button', {name: /Aperte o play/ }).click()

        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')
    }

    async fillLeadForm(user) {
        if(user.name) await this.page.getByPlaceholder('Informe seu nome').fill(user.name)
        if(user.email) await this.page.getByPlaceholder('Informe seu email').fill(user.email)
    }

    async submitLeadForm() {
        await this.page.getByText('Quero entrar na fila!').click()
    }

    async alertHaveText(message) {
        await expect(this.page.locator('.alert')).toHaveText(message)
    }

}