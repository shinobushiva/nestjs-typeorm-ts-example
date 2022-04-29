import { DataSourceOptions } from 'typeorm';

const ormconfig: DataSourceOptions = {
  name: 'default',
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  connectTimeout: 30 * 1000,
  entities: [process.cwd() + '/dist/**/entities/**/*.entity.js'],
  migrations: [process.cwd() + '/dist/database/migrations/**/*.js'],
  charset: 'utf8mb4_general_ci',
};
export default ormconfig;
