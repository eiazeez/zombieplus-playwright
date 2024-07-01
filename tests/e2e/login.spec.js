const {test} = require('../support')

test('Deve logar no administrador', async ({pw})=> {

    const user = {email: "admin@zombieplus.com", password: "pwd123"}

    await pw.loginPage.visit()
    await pw.loginPage.fillForm(user)
    await pw.loginPage.submitForm()

    await pw.moviesPage.isLoggedIn()
    
})

test('Não deve logar com senha incorreta', async ({pw})=> {

    const user = {email: "admin@zombieplus.com", password: "senharuim"}

    await pw.loginPage.visit()
    await pw.loginPage.fillForm(user)
    await pw.loginPage.submitForm()

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

    await pw.toast.shouldContainText(message)

})

test('Não deve logar quando o email não é preenchido', async ({pw})=> {

    const user = {password: "senharuim"}

    await pw.loginPage.visit()
    await pw.loginPage.fillForm(user)
    await pw.loginPage.submitForm()

    await pw.loginPage.alertShouldHave('Campo obrigatório')

})

test('Não deve logar quando a senha não é preenchida', async ({pw})=> {

    const user = {email: "admin@zombieplus.com"}

    await pw.loginPage.visit()
    await pw.loginPage.fillForm(user)
    await pw.loginPage.submitForm()

    await pw.loginPage.alertShouldHave('Campo obrigatório')

})

test('Não deve logar quando nenhum campo é preenchido', async ({pw})=> {

    await pw.loginPage.visit()
    await pw.loginPage.submitForm()

    await pw.loginPage.alertShouldHave(['Campo obrigatório', 'Campo obrigatório'])

})

test('Não deve logar quando o email está incorreto', async ({pw})=> {

    const user = {email: "emailruim.com", password: "senharuim"}

    await pw.loginPage.visit()
    await pw.loginPage.fillForm(user)
    await pw.loginPage.submitForm()

    await pw.loginPage.alertShouldHave('Email incorreto')

})