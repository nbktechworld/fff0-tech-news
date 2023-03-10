const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  "development": {
    "username": "tech_news_user",
    "password": process.env.DATABASE_PASSWORD,
    "database": "tech_news_development",
    "host": "127.0.0.1",
    "dialect": "postgres",
    migrationStorageTableName: "sequelize_meta"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    migrationStorageTableName: "sequelize_meta"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    migrationStorageTableName: "sequelize_meta"
  }
}
