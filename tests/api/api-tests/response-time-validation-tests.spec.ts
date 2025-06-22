import { test, expect } from '@tests/api/fixtures/requests-fixture';
import  LoginPayload  from '@tests/data/request-payloads/post-signin-payload.json';
import { LoginRequests } from '@tests/api/api-requests/login-requests';

LoginPayload.email = process.env.USER!;
LoginPayload.senha = process.env.PASSWORD!;

test.describe('Login API Tests', () => {

  test('TC01 Success Login by API', {tag: ['@regression', '@api']},  async ({ request, performance }) => {
    const loginRequests = new LoginRequests(request)

    performance.sampleStart("login-end-point-performance-startup");
    const response = await loginRequests.doLogin(LoginPayload)
    performance.sampleEnd("login-end-point-performance-startup");

    expect(performance.getSampleTime("login-end-point-performance-startup")).toBeLessThanOrEqual(1000);

    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.nome).toBe("leonardo Jorente");
  });

});
