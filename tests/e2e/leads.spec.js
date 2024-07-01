// @ts-check
const { test } = require ('../support')
const { faker } = require('@faker-js/faker')

test('Deve cadastrar um lead na fila de espera', async ({ pw }) => {

  const randomName = faker.person.fullName()
  const randomEmail = faker.internet.email()
  const user = { name: randomName, email: randomEmail }

  await pw.landingPage.visit()
  await pw.landingPage.openLeadModal()
  await pw.landingPage.fillLeadForm(user)
  await pw.landingPage.submitLeadForm()

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  await pw.toast.shouldContainText(message)

})

test('Não deve cadastrar email existente', async ({ pw }) => {

  const randomName = faker.person.fullName()
  const randomEmail = faker.internet.email()
  const user = {name: randomName, email: randomEmail} 

  await pw.requests.postWaitingList(user)

  await pw.landingPage.visit()
  await pw.landingPage.openLeadModal()
  await pw.landingPage.fillLeadForm(user)
  await pw.landingPage.submitLeadForm()

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'

  await pw.toast.shouldContainText(message)

})

test('Não deve cadastrar com email incorreto', async ({ pw }) => {

  const user = {
    name: 'Azeez Teste',
    email: 'azeez-teste-1.outlook.com'
  }

  await pw.landingPage.visit()
  await pw.landingPage.openLeadModal()
  await pw.landingPage.fillLeadForm(user)
  await pw.landingPage.submitLeadForm()

  await pw.landingPage.alertHaveText('Email incorreto')

})

test('Não deve cadastrar quando o nome não é preenchido', async ({ pw }) => {

  const user = {
    email: 'azeez-teste-1@outlook.com'
  }

  await pw.landingPage.visit()
  await pw.landingPage.openLeadModal()
  await pw.landingPage.fillLeadForm(user)
  await pw.landingPage.submitLeadForm()

  await pw.landingPage.alertHaveText('Campo obrigatório')

})

test('Não deve cadastrar quando o email não é preenchido', async ({ pw }) => {

  const user = {
    name: 'Azeez'
  }

  await pw.landingPage.visit()
  await pw.landingPage.openLeadModal()
  await pw.landingPage.fillLeadForm(user)
  await pw.landingPage.submitLeadForm()

  await pw.landingPage.alertHaveText('Campo obrigatório')

})

test('Não deve cadastrar quando nenhum campo é preenchido', async ({ pw }) => {

  await pw.landingPage.visit()
  await pw.landingPage.openLeadModal()
  await pw.landingPage.submitLeadForm()

  await pw.landingPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

})