import Dexie from 'dexie';

import ModulesTable from './tables/modules';

class Database {
  constructor(name, properties) {
    this.name = name;

    this.database = new Dexie(this.name);
    this.tables = {
      modules: new ModulesTable(this.database, properties),
    };
  }

  table(name) {
    return this.tables[name];
  }
}

module.exports = Database;
