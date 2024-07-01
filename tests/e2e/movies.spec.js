const { test } = require ('../support')

const data = require('../support/fixtures/movie/movies.json')

const { executeSQL } = require('../support/database.js')

test('Deve poder cadastrar um novo filme', async ({ pw }) => {

    const admin = {email: "admin@zombieplus.com", password: "pwd123"}
    const movie = data.create

    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await pw.loginPage.visit()
    await pw.loginPage.fillForm(admin)
    await pw.loginPage.submitForm()

    await pw.moviesPage.isLoggedIn()

    await pw.header.goToRegister()
    await pw.moviesPage.fillNewMovieForm(movie)
    await pw.moviesPage.submitForm()

    await pw.toast.shouldContainText('Cadastro realizado com sucesso!')

})