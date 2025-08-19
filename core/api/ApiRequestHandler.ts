import { Page } from '@playwright/test';
import { AxiosResponse } from 'axios';
import { ApiRequestsBaseWrapper } from './ApiRequestBaseWrapper';
import { EndPoints } from '../../core/endpoints/OdataEndpointPathEnum';
import { Services } from '../../core/services/Service';

const apiBaseUrl = process.env.API_BASE_URL || "";
const apiIdContext = process.env.API_ID_CONTEXT;
const commonBasePathForApi = Services.OwnerService +'/';


export class ApiRequestsForTestsWrapper extends ApiRequestsBaseWrapper {
  page: Page;

  constructor() {
    super(apiBaseUrl);
  }

  
  // add new owner
  async addNewOwner(addNewOwnerData: any, token: any) {
    await super.post(`${commonBasePathForApi}${EndPoints.NewOwner}`, addNewOwnerData, 201, this.getApiHeaders(token));
  }

 
  // get current context for WB100
 async getCurrentContext(token: any,siteData: any = undefined) {
    const response = await super.get(`${commonBasePathForApi}${EndPoints.NewOwner}`, siteData, 200, this.getApiHeaders(token));
    return (response as AxiosResponse<any, any>).data.value;
  }
  getApiHeaders(token: any, ifMatchValue: any = undefined) {
    if (ifMatchValue === undefined) {
      return {
        "Content-Type": "application/json",
        "Cookie": token,
      };
    }
    return {
      "Content-Type": "application/json",
      "Cookie": token,
      "If-Match": ifMatchValue
    };
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