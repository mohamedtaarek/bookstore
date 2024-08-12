import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: process.env.DB_NAME || 'mydb',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASS || 'mypass',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
//   ssl: true,
  clientMinMessages: 'notice',
});

export default sequelize;