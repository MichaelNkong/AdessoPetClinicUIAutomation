
import { ApiRequestsBaseWrapper } from './ApiRequestBaseWrapper';
import { ApiKeyRequestsWrapper } from "./ApiKeyReqeuestWrapper";
const apiBaseUrl = process.env.API_BASE_URL + 'slotting/api/v1/';
export const apiIdContext = process.env.API_ID_CONTEXT;



export class ApiRequestsWrapper extends ApiRequestsBaseWrapper {

  static apiKeyValue: string;

  constructor() {
    super(apiBaseUrl ?? '');
  }

  // Deletes any existing temporary Import Data to ensure that any subsequent Data Import requests are started Fresh:
  async deleteTempData() {
    await super.delete("temp-data/site/" + (apiIdContext ?? ''), undefined, 200);
  }



  getHeaders(): any {
    return {
      "Content-Type": "application/json",
      "X-PUBLIC-API-KEY": ApiRequestsWrapper.apiKeyValue
    }
  }

  async generateApiKey() {
    const apiKeyRequestsWrapper = new ApiKeyRequestsWrapper();
    if (!ApiRequestsWrapper.apiKeyValue || ApiRequestsWrapper.apiKeyValue === undefined) {
      const value = await apiKeyRequestsWrapper.generateAPIKey();
      ApiRequestsWrapper.apiKeyValue = value;
    }
  }

}