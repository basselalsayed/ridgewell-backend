import db from '../../../database/models';

class Interactor {
  constructor() {
    this.db = db;
    this.models = db.sequelize.models;
  }
}

export { Interactor };
