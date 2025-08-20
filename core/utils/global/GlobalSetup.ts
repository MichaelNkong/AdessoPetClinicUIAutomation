import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🌍 Global setup: runs once before all tests');
  // Example: connect to DB, seed data, start mock server, etc.
}

export default globalSetup;
