import Dexie from 'dexie';

import ModulesTable from './tables/modules';

const databaseException = (message) => {
  this.message = message;
  this.type = 'Database';
};

class Database {
  constructor(name, properties) {
    this.name = name;

    this.database = new Dexie(this.name);
    this.tables = {
      modules: new ModulesTable(this.database, properties),
    };
  }

  table(name) {
    if (!(name in this.tables)) {
      throw databaseException(`No table with name : ${name}`);
    }

    return this.tables[name];
  }
}

module.exports = Database;
