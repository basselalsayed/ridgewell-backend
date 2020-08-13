import { expect } from 'chai';
import { match, stub, restore } from 'sinon';

import { mockReq, mockHoliday, res } from './mocks';

import * as Helpers from '../../src/controllers/helpers';

import { allHolidaysService } from '../../src/services/holiday';

describe('src/services/holiday', () => {
  const req = {
    body: {},
    ...mockReq,
  };

  context('gets all holidays', () => {
    let sendStub;
    before(async () => {
      sendStub = stub(Helpers, 'send').returns(true);
      await allHolidaysService(req, res);
    });

    after(restore);

    it('called Holidays.findAll', async () => {
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

    it('called send', async () => {
      expect(sendStub).to.have.been.called;
    });
  });

  context('error gets all holidays', () => {
    let handleErrorStub;
    before(async () => {
      mockHoliday.findAll = stub().throws();
      handleErrorStub = stub(Helpers, 'handleError');

      await allHolidaysService(req, res);
    });

    after(restore);

    it('called handleError', async () => {
      expect(handleErrorStub).to.have.been.called;
    });
  });
});
