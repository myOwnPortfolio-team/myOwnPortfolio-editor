import Dexie from 'dexie';

const db = new Dexie('MyOwnPortfolioDB');
db.version(1).stores({
  modules: 'name, sha, content, properties, style',
});

export default db;
