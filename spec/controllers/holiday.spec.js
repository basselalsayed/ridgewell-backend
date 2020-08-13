import { expect } from 'chai';
import { match, resetHistory, stub, restore } from 'sinon';
import { helpers } from 'faker';

import { mockReq, mockHoliday, res } from './mocks';

import * as Helpers from '../../src/controllers/helpers';
import { getAll } from '../../src/controllers/holiday';

describe('src/controllers/holiday', () => {
  const req = {
    body: {},
    ...mockReq,
  };

  context('gets all holidays', () => {
    after(resetHistory);

    it('called Holidays.findAll', async () => {
      await getAll(req, res);

      expect(mockHoliday.findAll).to.have.been.calledWith(
        match({
          include: [
            {
              model: req.context.models.HolidayRequest,
              attributes: ['id', 'type', 'from', 'until', 'resolved'],
            },
            {
              model: req.context.models.User,
              attributes: ['username', 'email'],
            },
          ],
        }),
      );
    });
  });

  xcontext('stub', () => {
    let bcryptStub;
    let validStub;
    let invalidStub;

    beforeEach(async () => {
      validStub = stub(Helpers, 'validPass').callsFake(true);
    });
    beforeEach(async () => {});

    afterEach(restore);

    xit('called validPass', async () => {
      expect(validStub).to.have.been.called;
    });
  });
});
