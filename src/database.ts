import Migration from './lib/migration';
import { Context, Callback } from 'aws-lambda';
import ormconfig from './config/ormconfig';

const success = (response: any) => ({
  statusCode: 200,
  body: JSON.stringify(response),
});

const handler =
  (handlerName: string) =>
  async (event: any, context: Context, callback: Callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const migration = new Migration(ormconfig);

    try {
      const response = await migration[handlerName]();
      callback(null, success(response));
    } catch (error) {
      callback(error);
    }
  };

const migrationUp = handler('runMigration');
const migrationDown = handler('undoLastMigration');

export { migrationUp, migrationDown };
