/* global describe */
/* global it */
import { expect } from 'chai';
import Dexie from 'dexie';
import { database } from '../../app/database';

describe('Database', () => {
  it('Database exists', () => {
    Dexie
      .exists('MyOwnPortfolioDB')
      .then(exists => expect(exists).to.equal(true));
  });
});
