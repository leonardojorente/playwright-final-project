import { request as playwrightRequest } from '@playwright/test';
import  LoginPayload  from '../data/request-payloads/post-signin-payload.json';
import { LoginRequests } from '../api/api-requests/login-requests';

//adm user
LoginPayload.email = process.env.USER!;
LoginPayload.senha = process.env.PASSWORD!;

async function globalSetup() {
  console.log(`works as before all hook, only one function, a place to set process.env values`)
  const request = await playwrightRequest.newContext();
  const loginRequests = new LoginRequests(request)
  const response = await loginRequests.doLogin(LoginPayload)

  const responseBody = await response.json();

  process.env.API_TOKEN = responseBody.token
}

export default globalSetup;

