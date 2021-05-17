import { serverLogger } from '@logger';
import { json, urlencoded } from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'node:http';
import { authenticationMiddleware, handleHttpError } from './middlewares';
import { projectRoutes } from './routes';

const app = express();
const port = parseInt(process.env.SERVER_PORT ?? '3000', 10);

app.use(helmet());

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(authenticationMiddleware());

app.use(projectRoutes);

app.use(handleHttpError);

const server = createServer(app);

const runServer = (): Server => server.listen(port, () => serverLogger('info', `Server running in http://localhost:${port}`));

const stopServer = (): void => {
  serverLogger('info', 'Clossing server...');
  server.close();
};

export { server, runServer, stopServer };
