import { Context, Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as serverless from 'aws-serverless-express';
import * as express from 'express';
import { createConnection } from 'mysql2';

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const module = AppModule;
  const app = await NestFactory.create(module, adapter);
  await NestFactory.createApplicationContext(module);
  app.enableCors();
  await app.init();
  return serverless.createServer(expressApp);
}

export const handler: Handler = async (event: any, context: Context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }

  return serverless.proxy(cachedServer, event, context, 'PROMISE').promise;
};

export const createDatabase: Handler = async (event: any) => {
  console.log('process env', process.env);
  const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
  };
  console.log(options);
  const con = createConnection(options);
  console.log('connection created');
  const res = await con
    .promise()
    .query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\``);
  console.log('res', res);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Cerate database success!',
        result: res,
        input: event,
      },
      null,
      2,
    ),
  };
};
