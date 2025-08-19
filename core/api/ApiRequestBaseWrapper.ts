import { expect, type Page } from '@playwright/test';
import axios, { AxiosRequestConfig } from "axios";


type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface RequestConfig extends AxiosRequestConfig {
  method: HttpMethod;
}

export class ApiRequestsBaseWrapper {

  readonly baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async post(path: string, data: any, expectedStatus: number = 0, headers: any = undefined) {
    return await this.genericAxiosRequest('post', path, data, expectedStatus, headers);
  }

  async patch(path: string, data: any, expectedStatus: number = 0, headers: any = undefined) {
    return await this.genericAxiosRequest('patch', path, data, expectedStatus, headers);
  }

  async put(path: string, data: any, expectedStatus: number = 0, headers: any = undefined) {
    return await this.genericAxiosRequest('put', path, data, expectedStatus, headers);
  }

  async get(path: string, data: any, expectedStatus: number = 0, headers: any = undefined) {
    return await this.genericAxiosRequest('get', path, data, expectedStatus, headers);
  }

  async delete(path: string, data: any, expectedStatus: number = 0, headers: any = undefined) {
    return await this.genericAxiosRequest('delete', path, data, expectedStatus, headers);
  }

  async genericAxiosRequest(method: HttpMethod, path: string, data: any, expectedStatus: number = 0, headers: any = undefined) {
    const url = this.baseURL + path;
    const requestHeaders = headers === undefined ? this.getHeaders() : headers;
    const requestConfig: RequestConfig = {
      url,
      method,
      data,
      headers: requestHeaders,
    };
   console.log(this.generateCurlFromAxios(url, method, data, requestHeaders));
    const response = await axios.request(requestConfig)
      .then(
        (response) => {
         // console.log({ status: response.status, data: response.data, headers: response.headers });
          if (expectedStatus !== 0) {
            expect(response.status).toBe(expectedStatus);
          }
          return response;
        },
      ).catch(error => {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error('Server responded with an error:', error.response.status, error.response.data);
        } else if (error.request) {
          // Request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request
          console.error('Error in setting up request:', error.message);
        }
      });
    return response;
  }

  async getCookieTokenFromPage(page: Page) {
    const cookies = await page.context().cookies();
    const sessionCookie = cookies.find((cookie) => cookie.name === "KoerberSessionCookie");
    const authCookie = cookies.find((cookie) => cookie.name === "KoerberAuthCookie");
    return "KoerberSessionCookie=" + (sessionCookie?.value || "") + ";KoerberAuthCookie=" + (authCookie?.value || "");
  }

  getHeaders(): any {
    return {
      "Content-Type": "application/json",
    }

  }

  generateCurlFromAxios(url: string, method: string, data: any = {}, headers: any = {}): string {
    let curlCommand = `curl -X ${method.toUpperCase()}`;
    for (const header in headers) {
      curlCommand += ` -H "${header}: ${headers[header]}"`;
    }
    if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && data) {
      const dataString = typeof data === 'string' ? data : JSON.stringify(data);
      curlCommand += ` -d '${dataString}'`;
    }
    curlCommand += ` "${url}"`;
    return curlCommand;
  }

}