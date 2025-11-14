import { execSync } from 'child_process';

async function globalTeardown() {
  // Stop the test database container
  execSync('sudo docker kill revugenie-db-test || true');
  execSync('sudo docker compose down -v --rmi local --remove-orphans');
}

export default globalTeardown;
