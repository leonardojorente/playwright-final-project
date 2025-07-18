import { APIRequestContext } from '@playwright/test';
import  RelativePath  from '@tests/data/endpoint-relative-path.json';

export class AccountRequests{
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createNewAccount(body: object){
        const response = await this.request.post(`${process.env.BASE_URL_API}${RelativePath.ACCOUNT}`,
            {
                headers:{
                    authorization: `JWT ${process.env.API_TOKEN}`
                },
                data: body
            })
        return response
    }
}