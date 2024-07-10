// @ts-check
const { test } = require ('../support')
const { faker } = require('@faker-js/faker')

test('Deve cadastrar um lead na fila de espera', async ({ pw }) => {

  const randomName = faker.person.fullName()
  const randomEmail = faker.internet.email()
  const user = { name: randomName, email: randomEmail }

  await pw.leads.visit()
  await pw.leads.openLeadModal()
  await pw.leads.fillLeadForm(user)
  await pw.leads.submitLeadForm()

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'

  await pw.modal.shouldContainText(message)

})

test('Não deve cadastrar email existente', async ({ pw }) => {

  const randomName = faker.person.fullName()
  const randomEmail = faker.internet.email()
  const user = {name: randomName, email: randomEmail} 

  await pw.requests.postWaitingList(user)

  await pw.leads.visit()
  await pw.leads.openLeadModal()
  await pw.leads.fillLeadForm(user)
  await pw.leads.submitLeadForm()

  const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'

  await pw.modal.shouldContainText(message)

})

test('Não deve cadastrar com email incorreto', async ({ pw }) => {

  const user = {
    name: 'Azeez Teste',
    email: 'azeez-teste-1.outlook.com'
  }

  await pw.leads.visit()
  await pw.leads.openLeadModal()
  await pw.leads.fillLeadForm(user)
  await pw.leads.submitLeadForm()

  await pw.leads.alertHaveText('Email incorreto')

})

test('Não deve cadastrar quando o nome não é preenchido', async ({ pw }) => {

  const user = {
    email: 'azeez-teste-1@outlook.com'
  }

  await pw.leads.visit()
  await pw.leads.openLeadModal()
  await pw.leads.fillLeadForm(user)
  await pw.leads.submitLeadForm()

  await pw.leads.alertHaveText('Campo obrigatório')

})

test('Não deve cadastrar quando o email não é preenchido', async ({ pw }) => {

  const user = {
    name: 'Azeez'
  }

  await pw.leads.visit()
  await pw.leads.openLeadModal()
  await pw.leads.fillLeadForm(user)
  await pw.leads.submitLeadForm()

  await pw.leads.alertHaveText('Campo obrigatório')

})

test('Não deve cadastrar quando nenhum campo é preenchido', async ({ pw }) => {

  await pw.leads.visit()
  await pw.leads.openLeadModal()
  await pw.leads.submitLeadForm()

  await pw.leads.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

})