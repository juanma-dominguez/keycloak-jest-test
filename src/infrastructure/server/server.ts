import { HttpException } from '@errors';
import { logger } from '@logger';
import { json, urlencoded } from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'node:http';
import { authenticationMiddleware } from './middlewares';
import { userRoutes } from './routes';

const app = express();
const port = parseInt(process.env.SERVER_PORT ?? '3000', 10);

app.use(helmet());

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(authenticationMiddleware());

app.use('/api/v1/', [userRoutes]);

app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  logger('error', `Status: ${err.status} ${err.message} .`);
  res.status(err.status || 500).json({
    error: true,
    message: err.message,
    errors: err?.errors,
  });
});

const server = createServer(app);

const runServer = (): Server => server.listen(port, () => logger('info', `Server running in http://localhost:${port}`));

const stopServer = (): void => {
  logger('info', 'Clossing server...');
  server.close();
};

export { server, runServer, stopServer };
