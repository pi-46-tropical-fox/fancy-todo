require('dotenv').config()

module.exports = {
  "development": {
    "username": "diezzy",
    "password": "postgres",
    "database": "fancy-todo-06",
    "host": "127.0.0.1",
    "dialect": "postgres",
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
