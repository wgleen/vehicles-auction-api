import * as http from 'http';
import * as express from 'express';
import { rootBuild } from './app/root.build';

async function bootstrap() {
  const server = express();

  const appRoot = await rootBuild(server);

  await appRoot.init();

  http
    .createServer(server)
    .listen(3000);
}
bootstrap();
