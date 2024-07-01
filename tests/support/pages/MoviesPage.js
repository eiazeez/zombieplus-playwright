const { expect } = require('@playwright/test') 

export class MoviesPage {

    constructor(page) {
        this.page = page
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/) 
    }

    async fillNewMovieForm (movie) {

        await expect(this.page.getByText('Cadastrar novo Filme')).toBeVisible()

        await this.page.fill('input[name=title]', movie.title)
        await this.page.fill('textarea[name=overview]', movie.overview)
        await this.page.click('#select_company_id div[class*="react-select__dropdown"]')
        await this.page.locator('.react-select__option').filter({hasText: movie.company}).click()
        await this.page.click('#select_year div[class*="react-select__dropdown"]')
        await this.page.locator('.react-select__option').filter({hasText: movie.release_year}).click()

    }

    async submitForm() {
        await this.page.getByRole('button', {name: 'Cadastrar'}).click()
    }

}