import { expect } from 'chai';
import { match, stub, restore } from 'sinon';

import { mockReq, mockHoliday, res } from './mocks';

import * as Helpers from '../../src/controllers/helpers';

import {
  allHolidaysService,
  getHolidayService,
  updateHolidayService,
} from '../../src/services/holiday';

describe('src/services/holiday', () => {
  const req = {
    body: { confirmed: true },
    params: { holidayId: 1 },
    ...mockReq,
  };

  let sendStub;

  before(async () => {
    sendStub = stub(Helpers, 'send').returns(true);
  });

  after(restore);

  context('allHolidaysService', () => {
    before(async () => {
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

  context('allHolidaysService [Error]', () => {
    let handleErrorStub;
    before(async () => {
      handleErrorStub = stub(Helpers, 'handleError');
      mockHoliday.findAll = stub().throws();

      await allHolidaysService(req, res);
    });

    after(restore);

    it('called handleError', async () => {
      expect(handleErrorStub).to.have.been.called;
    });
  });

  context('getHolidayService', () => {
    before(async () => {
      await getHolidayService(req, res);
    });

    after(restore);

    it('called called Holiday.findByPk', async () => {
      expect(mockHoliday.findByPk).to.have.been.calledWith(
        match(req.params.holidayId),
      );
    });

    it('called send', async () => {
      expect(sendStub).to.have.been.called;
    });
  });

  context('getHolidayService [Error]', () => {
    let handleErrorStub;
    before(async () => {
      handleErrorStub = stub(Helpers, 'handleError');
      mockHoliday.findByPk = stub().throws();

      await getHolidayService(req, res);
    });

    after(restore);

    it('called handleError', async () => {
      expect(handleErrorStub).to.have.been.called;
    });
  });

  context('updateHolidayService', () => {
    before(async () => {
      await updateHolidayService(req, res);
    });

    after(restore);

    it('calls sequelize.transaction', () => {
      expect(req.context.db.sequelize.transaction).to.have.been.calledWith(
        match(
          async () =>
            await req.context.models.Holiday.update(
              { ...req.body.holiday },
              {
                where: { id: req.params.holidayId },
              },
            ),
        ),
      );
    });

    it('calls Holiday.update', () => {
      expect(mockHoliday.update).to.have.been.called;
    });

    it('called send', async () => {
      expect(sendStub).to.have.been.called;
    });
  });

  context('updateHolidayService [Error]', () => {
    let handleErrorStub;
    before(async () => {
      handleErrorStub = stub(Helpers, 'handleError');
      req.context.db.sequelize.transaction = stub().throws();
      await updateHolidayService(req, res);
    });

    after(restore);

    it('called handleError', async () => {
      expect(handleErrorStub).to.have.been.called;
    });
  });

  xcontext('newHolidayService', () => {
    before(async () => {
      await newHolidayService(req, res);
    });

    after(restore);

    it('calls sequelize.transaction', () => {
      expect(req.context.db.sequelize.transaction).to.have.been.called;
      // With(
      //   match(
      //     async () =>
      //       await req.context.models.Holiday.update(
      //         { ...req.body.holiday },
      //         {
      //           where: { id: req.params.holidayId },
      //         },
      //       ),
      //   ),
      // );
    });

    it('calls Holiday.findAll', () => {
      expect(mockHoliday.findAll).to.have.been.called;
    });
    it('calls Holiday.create', () => {
      expect(mockHoliday.create).to.have.been.called;
    });

    it('called send', async () => {
      expect(sendStub).to.have.been.called;
    });
  });

  xcontext('newHolidayService [Error]', () => {
    let handleErrorStub;
    before(async () => {
      handleErrorStub = stub(Helpers, 'handleError');
      mockHoliday.create = stub().throws();
      await newHolidayService(req, res);
    });

    after(restore);

    it('called handleError', async () => {
      expect(handleErrorStub).to.have.been.called;
    });
  });
});
