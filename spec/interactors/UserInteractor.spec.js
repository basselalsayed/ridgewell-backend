import { expect } from 'chai';
import chalk from 'chalk';

import { Interactor, UserInteractor } from '../../src/utils/interactors';

describe(chalk.yellow('src/utils/interactors/UserInteractor'), () => {
  it('is instance of interactor', () => {
    const user = new UserInteractor();
    expect(user).to.be.an.instanceof(Interactor);
  });
});
