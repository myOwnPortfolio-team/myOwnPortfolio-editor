/* global describe */
/* global it */
import { expect } from 'chai';
import Dexie from 'dexie';
import { database } from '../../app/database';

describe('Database', () => {
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
    expect(table.schema.instanceTemplate).to.have.property('name');
    expect(table.schema.instanceTemplate).to.have.property('sha');
    expect(table.schema.instanceTemplate).to.have.property('content');
    expect(table.schema.instanceTemplate).to.have.property('properties');
    expect(table.schema.instanceTemplate).to.have.property('style');
  });
});
