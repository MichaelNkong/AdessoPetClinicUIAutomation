import { AxiosAdapter, AxiosResponse } from "axios";
import { ApiRequestsBaseWrapper } from './ApiRequestBaseWrapper';

const apiBaseUrl = process.env.APPLICATION_INTERFACE_BASE_URL;

export class ApiKeyRequestsWrapper extends ApiRequestsBaseWrapper {

  constructor() {
    super(apiBaseUrl ?? '');
  }

    async generateAPIKey() {
      const userTokenData = await this.getUserToken();
      const adminKey = await this.generateAdminKey(userTokenData);
      return adminKey;
    }

    async getUserToken() {
      const requestBody = {
        "username": process.env.AUTH_USERNAME,
        "password": process.env.AUTH_PASSWORD,
        "tenant": process.env.AUTH_TENANT
      }
      const response = await super.post("login", requestBody, 200);
      return (response as AxiosResponse<any, any>).data;
    }

    async generateAdminKey(userToken: any) {
      const requestBody = {
        "userToken": userToken.userToken
      }
      const response = await super.post("generate-admin-key", requestBody, 200);
      return (response as AxiosResponse<any, any>).data;
    }
}