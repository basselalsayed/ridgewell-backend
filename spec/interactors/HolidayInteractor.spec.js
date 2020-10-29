import { expect } from 'chai';
import { yellow } from 'chalk';

import { HolidayInteractor, Interactor } from '../../src/utils/interactors';

describe(yellow('src/utils/interactors/HolidayInteractor'), () => {
  let holiday;

  before(() => {
    holiday = new HolidayInteractor();
  });

  it('is instance of interactor', () => {
    expect(holiday).to.be.an.instanceof(Interactor);
  });
});
