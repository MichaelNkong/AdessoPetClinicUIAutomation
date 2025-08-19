
import { Page } from 'playwright';
import * as Cookies from './Cookies';

export async function getApiHeaders(page: Page, ifMatchValue?: string): Promise<Record<string, string>> {
  const cookieString = await Cookies.getCookieString(page);

  const headers: Record<string, string> = {
    "Accept": "*/*",
    "Content-Type": "application/json",
    "Cookie": cookieString
  };

  if (ifMatchValue) {
    headers["If-Match"] = ifMatchValue;
  }

  return headers;
}
