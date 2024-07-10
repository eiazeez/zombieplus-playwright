const {test} = require('../support')
const user = require('../support/fixtures/user.json')

test('Deve logar no administrador', async ({pw})=> {

    const admin = user.admin

    await pw.login.visit()
    await pw.login.fillForm(admin)
    await pw.login.submitForm()

    await pw.login.isLoggedIn(admin.name)
    
})

test('Não deve logar com senha incorreta', async ({pw})=> {

    const user = {email: "admin@zombieplus.com", password: "senharuim"}

    await pw.login.visit()
    await pw.login.fillForm(user)
    await pw.login.submitForm()

    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

    await pw.modal.shouldContainText(message)

})

test('Não deve logar quando o email não é preenchido', async ({pw})=> {

    const user = {password: "senharuim"}

    await pw.login.visit()
    await pw.login.fillForm(user)
    await pw.login.submitForm()

    await pw.login.alertShouldHave('Campo obrigatório')

})

test('Não deve logar quando a senha não é preenchida', async ({pw})=> {

    const user = {email: "admin@zombieplus.com"}

    await pw.login.visit()
    await pw.login.fillForm(user)
    await pw.login.submitForm()

    await pw.login.alertShouldHave('Campo obrigatório')

})

test('Não deve logar quando nenhum campo é preenchido', async ({pw})=> {

    await pw.login.visit()
    await pw.login.submitForm()

    await pw.login.alertShouldHave(['Campo obrigatório', 'Campo obrigatório'])

})

test('Não deve logar quando o email está incorreto', async ({pw})=> {

    const user = {email: "emailruim.com", password: "senharuim"}

    await pw.login.visit()
    await pw.login.fillForm(user)
    await pw.login.submitForm()

    await pw.login.alertShouldHave('Email incorreto')

})