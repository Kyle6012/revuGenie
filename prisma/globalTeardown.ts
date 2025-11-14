import { execSync } from 'child_process';

async function globalTeardown() {
  // Stop the test database container
  execSync('if [ $(sudo docker ps -q -f name=revugenie-db-test) ]; then sudo docker kill revugenie-db-test; fi');
  execSync('sudo docker compose down -v --rmi local --remove-orphans');
}

export default globalTeardown;
