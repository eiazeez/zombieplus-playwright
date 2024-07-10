const { test } = require ('../support')

const data = require('../support/fixtures/movie/movies.json')
const user = require('../support/fixtures/user.json')

const { executeSQL } = require('../support/database.js')

test.beforeAll( async () => {
    await executeSQL(`DELETE from movies`)
})

test('Deve poder cadastrar um novo filme', async ({ pw }) => {

    const admin = user.admin
    const movie = data.create

    await pw.login.visit()
    await pw.login.fillForm(admin)
    await pw.login.submitForm()

    await pw.login.isLoggedIn(admin.name)

    await pw.header.goToRegister()
    await pw.movies.fillNewMovieForm(movie)
    await pw.movies.submitForm()

    await pw.modal.shouldContainText(`O filme '${movie.title}' foi adicionado ao catálogo.`)

})

test('Deve poder remover um filmes', async ( { pw }) => {

    const admin = user.admin
    const movie = data.to_remove

    await pw.requests.postMovie(movie)

    await pw.login.visit()
    await pw.login.fillForm(admin)
    await pw.login.submitForm()
    await pw.login.isLoggedIn(admin.name)

    await pw.movies.removeMovie(movie)
    await pw.modal.shouldContainText('Filme removido com sucesso.')

} )

test('Não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ pw }) => {

    const admin = user.admin

    await pw.login.visit()
    await pw.login.fillForm(admin)
    await pw.login.submitForm()

    await pw.login.isLoggedIn(admin.name)

    await pw.header.goToRegister()
    await pw.movies.submitForm()

    const alerts = [
        'Campo obrigatório', 
        'Campo obrigatório', 
        'Campo obrigatório', 
        'Campo obrigatório'
    ]

    await pw.movies.alertShouldHaveText(alerts)
})

test('Não deve cadastrar o título que já existe', async ({ pw }) => {

    const admin = user.admin
    const movie = data.duplicated

    await pw.requests.postMovie(movie)

    await pw.login.visit()
    await pw.login.fillForm(admin)
    await pw.login.submitForm()

    await pw.login.isLoggedIn(admin.name)

    await pw.header.goToRegister()
    await pw.movies.fillNewMovieForm(movie)
    await pw.movies.submitForm()

    const text = `O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`

    await pw.modal.shouldContainText(text)

})

test('Deve realizar busca pelo termo morto', async ({ pw }) => {

    const admin = user.admin
    const movies = data.search

    movies.data.forEach(async (movie) => {

        await pw.requests.postMovie(movie)

    })

    await pw.login.visit()
    await pw.login.fillForm(admin)
    await pw.login.submitForm()

    await pw.login.isLoggedIn(admin.name)

    await pw.header.searchFor(movies.input)
    await pw.movies.searchedMovie(movies.output)

})