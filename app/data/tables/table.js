class Table {
  constructor(database, name, schema) {
    this.name = name;
    this.schema = {};
    this.schema[this.name] = schema;

    this.database = database;
    this.table = null;

    try {
      this.table = this.database.table(this.name);
    } catch (error) {
      this.database
        .version(1)
        .stores(this.schema);
      this.table = this.database.table(this.name);
    }
  }
}

module.exports = Table;
