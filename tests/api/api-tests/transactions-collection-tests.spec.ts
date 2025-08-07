import { test, expect } from '@tests/api/fixtures/requests-fixture';
import { generateRandomString } from '@tests/support/utils';
import  TransactionPayload  from '@tests/data/request-payloads/post-transacoes-payload.json';
import { TransactionRequests } from '@tests/api/api-requests/transaction-requests';
import  AccountPayload  from '@tests/data/request-payloads/post-contas-payload.json';
import { AccountRequests } from '@tests/api/api-requests/account-requests';
import { generateTransaction } from '@tests/support/factories/transactionDataFactory';

let accountId: number;

test.beforeEach(async ({ request }) => {
    AccountPayload.nome = `account${generateRandomString(3)}`;
    const accountRequests = new AccountRequests(request)
  
    const response = await accountRequests.createNewAccount(AccountPayload)
    const responseBody = await response.json();
    accountId = responseBody.id;
  });

test('TC01 Create new Transaction by API', {tag: ['@regression', '@api']},  async ({ request, performance }) => {
    //gets curent date and time
    const currentDateAndTime = new Date()
    //gets only the date and set the format to pt-br
    const currentDate = currentDateAndTime.toLocaleDateString('pt-br')

    TransactionPayload.data_pagamento = currentDate;
    TransactionPayload.data_transacao = currentDate;
    TransactionPayload.descricao = `description ${generateRandomString(3)}`;
    TransactionPayload.envolvido = `interested ${generateRandomString(3)}`;
    TransactionPayload.conta_id = accountId

    const transactionRequests = new TransactionRequests(request)

    /**
     * ABOUT PERFORMANCE - Up to 1 second (Fast), Between 1 and 5 seconds
     * (Acceptable - user lose the perception os instantly use)
     * and Above 5 seconds (Slow - alert the user with load and reason)
     **/

    performance.sampleStart("transaction-performance-startup");
    const response = await transactionRequests.createNewTransaction(TransactionPayload)
    performance.sampleEnd("transaction-performance-startup");

    expect(performance.getSampleTime("transaction-performance-startup")).toBeLessThanOrEqual(1000);
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody.descricao).toBe(TransactionPayload.descricao);
});

test('TC02 Create new Transaction by API using factory', {tag: ['@regression', '@api']},  async ({ request, performance }) => {
    // Create a transaction payload using the factory with some overrides
    const transactionPayloadFactory = generateTransaction({ conta_id: accountId, valor: "2500", status: true });
    const transactionRequests = new TransactionRequests(request)

    const response = await transactionRequests.createNewTransaction(transactionPayloadFactory)

    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody.descricao).toBe(transactionPayloadFactory.descricao);
});