'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import configFile from '../config/config.json' assert { type: 'json' };
import Author from './Author.js';
import Book from './Book.js';
import Store from './Store.js';
import store_book from './store_book.js';

// Convert `import.meta.url` to `__filename` and `__dirname`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// fs.readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(async (file) => {
//     const model = (await import(path.join(__dirname, file))).default(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

const models = {
    Author: Author(sequelize, Sequelize.DataTypes),
    Book: Book(sequelize, Sequelize.DataTypes),
    Store: Store(sequelize, Sequelize.DataTypes),
    store_book: store_book(sequelize, Sequelize.DataTypes),
}

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
