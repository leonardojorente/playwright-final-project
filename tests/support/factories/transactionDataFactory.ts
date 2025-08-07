import { faker } from '@faker-js/faker'

//gets curent date and time
const currentDateAndTime = new Date()
//gets only the date and set the format to pt-br
const currentDate = currentDateAndTime.toLocaleDateString('pt-br')

export const generateTransaction = (overrides = {}) => ({
  tipo: "REC",
  data_transacao: currentDate, // e.g., "17/10/2024"
  data_pagamento: currentDate,
  descricao: faker.finance.transactionDescription(),
  valor: "1",
  envolvido: faker.person.firstName(),
  conta_id: 2301036,
  status: false,
  ...overrides // Allow custom overrides
})