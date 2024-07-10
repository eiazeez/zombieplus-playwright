const { expect } = require('@playwright/test') 

export class TvShows {

    constructor(page) {
        this.page = page
    }

    async fillNewTvShowForm (tvShow) {
        await expect(this.page.getByText('Cadastrar nova Série')).toBeVisible()

        await this.page.fill('input[name=title]', tvShow.title)
        await this.page.fill('textarea[name=overview]', tvShow.overview)
        await this.page.click('#select_company_id div[class*="react-select__dropdown"]')
        await this.page.locator('.react-select__option').filter({hasText: tvShow.company}).click()
        await this.page.click('#select_year div[class*="react-select__dropdown"]')
        await this.page.locator('.react-select__option').filter({hasText: tvShow.release_year}).click()
        await this.page.fill('input[name="seasons"]', tvShow.seasons)
        if (tvShow.cover) await this.page.locator('input[id=cover]').setInputFiles('tests/support/fixtures/tv' + tvShow.cover)
        if (tvShow.featured) await this.page.locator('.featured .react-switch').click()
    }

    async submitForm() {
        await this.page.getByRole('button', {name: 'Cadastrar'}).click()
    }

    async alertShouldHaveText(text) {
        const alert = this.page.locator('.fields .alert')

        await expect(alert).toHaveText(text)
    }

    async removeTvShow(tvShow) {
        await this.page.getByRole('row', { name: tvShow.title }).getByRole('button').click()
        await this.page.locator('.confirm-removal').click()
    }

    async searchedTvShow(tvShow) {

        const rows = this.page.getByRole('row')
        await expect(rows).toContainText(tvShow)

    }

}