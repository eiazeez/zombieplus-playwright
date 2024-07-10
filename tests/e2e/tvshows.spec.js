const { test } = require ('../support')

const data = require('../support/fixtures/tv/tvshows.json')
const user = require('../support/fixtures/user.json')

const { executeSQL } = require('../support/database.js')

test.beforeAll( async () => {
    await executeSQL(`DELETE from tvshows`)
})

test('Deve poder cadastrar uma nova série', async ({ pw }) => {

    const admin = user.admin
    const tvShow = data.create

    await pw.login.visit()
    await pw.login.fillForm(admin)
    await pw.login.submitForm()

    await pw.login.isLoggedIn(admin.name)

    await pw.header.goToTvShows()
    await pw.header.goToRegister()
    await pw.tvShows.fillNewTvShowForm(tvShow)
    await pw.tvShows.submitForm()

    await pw.modal.shouldContainText(`A série '${tvShow.title}' foi adicionada ao catálogo.`)

})

test('Deve poder remover uma série', async ( { pw }) => {

    const admin = user.admin
    const tvShow = data.to_remove

    await pw.requests.postTvShow(tvShow)

    await pw.login.visit()
    await pw.login.fillForm(admin)
    await pw.login.submitForm()
    await pw.login.isLoggedIn(admin.name)

    await pw.header.goToTvShows()
    await pw.tvShows.removeTvShow(tvShow)
    await pw.modal.shouldContainText('Série removida com sucesso.')

} )

test('Não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ pw }) => {

    const admin = user.admin

    await pw.login.visit()
    await pw.login.fillForm(admin)
    await pw.login.submitForm()

    await pw.login.isLoggedIn(admin.name)

    await pw.header.goToTvShows()
    await pw.header.goToRegister()
    await pw.tvShows.submitForm()

    const alerts = [
        'Campo obrigatório', 
        'Campo obrigatório', 
        'Campo obrigatório', 
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'
    ]

    await pw.tvShows.alertShouldHaveText(alerts)
})

test('Não deve cadastrar o título que já existe', async ({ pw }) => {

    const admin = user.admin
    const tvShow = data.duplicated

    await pw.requests.postTvShow(tvShow)

    await pw.login.visit()
    await pw.login.fillForm(admin)
    await pw.login.submitForm()

    await pw.login.isLoggedIn(admin.name)

    await pw.header.goToTvShows()
    await pw.header.goToRegister()
    await pw.tvShows.fillNewTvShowForm(tvShow)
    await pw.tvShows.submitForm()

    const text = `O título '${tvShow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`

    await pw.modal.shouldContainText(text)

})

test('Deve realizar busca pelo termo dead', async ({ pw }) => {

    const admin = user.admin
    const tvShow = data.search

    tvShow.data.forEach(async (tvShow) => {

        await pw.requests.postTvShow(tvShow)

    })

    await pw.login.visit()
    await pw.login.fillForm(admin)
    await pw.login.submitForm()

    await pw.login.isLoggedIn(admin.name)

    await pw.header.goToTvShows()
    await pw.header.searchFor(tvShow.input)
    await pw.tvShows.searchedTvShow(tvShow.output)

})