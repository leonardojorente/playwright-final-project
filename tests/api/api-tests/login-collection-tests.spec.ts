import { test, expect } from '@playwright/test';
import  LoginPayload  from '@tests/data/request-payloads/post-signin-payload.json';
import { LoginRequests } from '@tests/api/api-requests/login-requests';

LoginPayload.email = process.env.USER!;
LoginPayload.senha = process.env.PASSWORD!;

test.describe('Login API Tests', () => {

  test('TC01 Success Login by API - assert using object - better', {tag: ['@regression', '@api']},  async ({ request }) => {
    const loginRequests = new LoginRequests(request)

    const response = await loginRequests.doLogin(LoginPayload)
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    //use this validation
    expect(responseBody).toMatchObject({
      nome: "leonardo Jorente",
      id: 24780
    })
    //instead of this
    expect(responseBody.nome).toBe("leonardo Jorente");
    expect(responseBody.id).toBe(24780);
  });
});
