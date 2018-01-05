import Table from './table';

class KVTable extends Table {
  constructor(database) {
    super(database, 'kv-store', 'key, value');
  }

  set(key, value) {
    return this.table.put({ key, value });
  }

  get(key) {
    return this.table
      .get({ key })
      .then((object) => {
        if (object) {
          return object.value;
        }
        return undefined;
      });
  }
}

module.exports = KVTable;
