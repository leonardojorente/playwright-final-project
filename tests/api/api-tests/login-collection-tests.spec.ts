import { test, expect } from '@playwright/test';
import  LoginPayload  from '../../data/request-payloads/post-signin-payload.json';
import { LoginRequests } from '../api-requests/login-requests';

LoginPayload.email = process.env.USER!;
LoginPayload.senha = process.env.PASSWORD!;

test.describe('Login API Tests', () => {

  test('TC01 Success Login by API', {tag: ['@regression', '@api']},  async ({ request }) => {
    const loginRequests = new LoginRequests(request)

    const response = await loginRequests.doLogin(LoginPayload)
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.nome).toBe("leonardo Jorente");
  });

  test('TC02 Success Login by API - assert using object - better', {tag: ['@regression', '@api']},  async ({ request }) => {
    const loginRequests = new LoginRequests(request)

    const response = await loginRequests.doLogin(LoginPayload)
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    
    expect(responseBody.nome).toBe("leonardo Jorente");
    expect(responseBody.id).toBe("24780");
  });
});
