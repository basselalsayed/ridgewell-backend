import db from '../../../database/models';

class Interactor {
  constructor() {
    Object.assign(this, db, db.sequelize.models);
  }
}

export { Interactor };
