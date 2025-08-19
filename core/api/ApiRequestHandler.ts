import { Page } from '@playwright/test';
import { AxiosResponse } from 'axios';
import { ApiRequestsBaseWrapper } from './ApiRequestBaseWrapper';
import { EndPoints } from '../../core/api/endpoints/EndPoints';


const apiBaseUrl = process.env.API_BASE_URL || "";
const endpoint =EndPoints.FindOwner;


export class ApiRequestsForTestsWrapper extends ApiRequestsBaseWrapper {
  page: Page;

  constructor() {
    super(apiBaseUrl);
  }

  
  // add new owner
  async addNewOwner(addNewOwnerData: any, token: any) {
    await super.post(`${apiBaseUrl}${EndPoints.NewOwner}`, addNewOwnerData, 200, this.getApiHeaders(token));
  }
  //find owner by last name
  async findOwner(data: any, token: any) {
    await super.get(`${EndPoints.FindOwner}`, data, 200, this.getApiHeaders(token));
  }

 
getApiHeaders(token: string, ifMatchValue?: string) {
  const headers: Record<string, string> = {
    "Accept": "*/*",
    "Content-Type": "application/json",
    "Cookie": token   // token must be string: "name=value; name2=value2"
  };

  if (ifMatchValue) {
    headers["If-Match"] = ifMatchValue;
  }

  return headers;
}

  enumToJson(enumObj: object): string {
    return JSON.stringify(
      Object.entries(enumObj).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {} as Record<string, string>)
    );
  }

}