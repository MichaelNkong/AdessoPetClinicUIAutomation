async function globalTeardown() {
  console.log('🧹 Global teardown: runs once after all tests');
  // Example: clear DB, stop services, cleanup files, etc.
}

export default globalTeardown;
