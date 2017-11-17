/* global describe */
/* global it */
import { expect } from 'chai';
import Dexie from 'dexie';

import Database from '../../app/data/database';

const PROPERTIES = require('../../properties/app');

describe('Database', () => {
  const database = new Database('MyOwnPortfolioDB', PROPERTIES);
  let table;

  try {
    table = database.table('modules');
  } catch (error) {
    table = null;
  }

  it('Exists', () => {
    Dexie
      .exists('MyOwnPortfolioDB')
      .then(exists => expect(exists).to.equal(true));
  });

  it('Table "modules" exists', () => {
    expect(table).not.to.be.a('null');
  });

  it('Table "modules" minimal schema correct', () => {
    expect(table.table.schema.instanceTemplate).to.have.property('name');
    expect(table.table.schema.instanceTemplate).to.have.property('sha');
    expect(table.table.schema.instanceTemplate).to.have.property('content');
    expect(table.table.schema.instanceTemplate).to.have.property('properties');
    expect(table.table.schema.instanceTemplate).to.have.property('style');
  });
});
