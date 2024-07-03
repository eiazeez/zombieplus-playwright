const { expect } = require('@playwright/test') 

export class Movies {

    constructor(page) {
        this.page = page
    }

    async fillNewMovieForm (movie) {

        await expect(this.page.getByText('Cadastrar novo Filme')).toBeVisible()

        await this.page.fill('input[name=title]', movie.title)
        await this.page.fill('textarea[name=overview]', movie.overview)
        await this.page.click('#select_company_id div[class*="react-select__dropdown"]')
        await this.page.locator('.react-select__option').filter({hasText: movie.company}).click()
        await this.page.click('#select_year div[class*="react-select__dropdown"]')
        await this.page.locator('.react-select__option').filter({hasText: movie.release_year}).click()
        if (movie.cover) await this.page.locator('input[name=cover]').setInputFiles('tests/support/fixtures/movie' + movie.cover)
        if (movie.featured) await this.page.locator('.featured .react-switch').click()

    }

    async submitForm() {
        await this.page.getByRole('button', {name: 'Cadastrar'}).click()
    }

    async alertShouldHaveText(text) {

        const alert = this.page.locator('.fields .alert')

        await expect(alert).toHaveText(text)

    }

}