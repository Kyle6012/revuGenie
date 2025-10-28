import { execSync } from 'child_process';

async function globalTeardown() {
  // Stop the test database container
  execSync('sudo docker compose down');
}

export default globalTeardown;
