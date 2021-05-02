import 'mocha';
import {expect} from 'chai';

import {pipe, noPipe} from '../src/ejercicio-2';

describe('Test block on notes', () => {
  it('Pipe method', () => {
    expect(pipe('prueba.txt', true, true, true));
  });

  it('No pipe method', () => {
    expect(2).to.be.equal(2);
  });
});
