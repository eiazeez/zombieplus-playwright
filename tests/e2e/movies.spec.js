const { test } = require ('../support')

const data = require('../support/fixtures/movie/movies.json')
const user = require('../support/fixtures/user.json')

const { executeSQL } = require('../support/database.js')

test('Deve poder cadastrar um novo filme', async ({ pw }) => {

    const admin = user.admin
    const movie = data.create

    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await pw.login.visit()
    await pw.login.fillForm(admin)
    await pw.login.submitForm()

    await pw.login.isLoggedIn(admin.name)

    await pw.header.goToRegister()
    await pw.movies.fillNewMovieForm(movie)
    await pw.movies.submitForm()

    await pw.toast.shouldContainText('Cadastro realizado com sucesso!')

})

test('Não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ pw }) => {

    const admin = user.admin

    await pw.login.visit()
    await pw.login.fillForm(admin)
    await pw.login.submitForm()

    await pw.login.isLoggedIn(admin.name)

    await pw.header.goToRegister()
    await pw.movies.submitForm()

    const alerts = [
        'Por favor, informe o título.', 
        'Por favor, informe a sinopse.', 
        'Por favor, informe a empresa distribuidora.', 
        'Por favor, informe o ano de lançamento.'
    ]

    await pw.movies.alertShouldHaveText(alerts)
})