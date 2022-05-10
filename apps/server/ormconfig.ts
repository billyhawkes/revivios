import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'revivios',
  synchronize: true,
  logging: true,
  entities: ['dist/src/**/*.entity.js'],
  subscribers: [],
  migrations: [],
};

export default config;
