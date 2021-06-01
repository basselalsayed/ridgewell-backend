import { addDays } from 'date-fns';
import db from './database/models';
import {
  HolidayInteractor,
  RequestInteractor,
  UserInteractor,
} from './utils/interactors';

export default async () => {
  const { Role } = db.sequelize.models;
  const userInteractor = new UserInteractor();
  const holidayInteractor = new HolidayInteractor();
  const requestInteractor = new RequestInteractor();
  const today = new Date();
  try {
    await Role.create({
      id: 1,
      name: 'user',
    });

    await Role.create({
      id: 2,
      name: 'admin',
    });

    const admin1 = await userInteractor.newUser({
      username: process.env.ADMIN_1,
      email: process.env.ADMIN_1_EMAIL,
      password: process.env.ADMIN_1_PASS,
      roles: ['admin'],
    });

    const admin2 = await userInteractor.newUser({
      username: process.env.ADMIN_2,
      email: process.env.ADMIN_2_EMAIL,
      password: process.env.ADMIN_2_PASS,
      roles: ['admin'],
    });

    const user1 = await userInteractor.newUser({
      username: 'user',
      email: 'user@ridgewell.co.uk',
      password: '000000',
    });

    const user2 = await userInteractor.newUser({
      username: 'user1',
      email: 'user1@ridgewell.co.uk',
      password: '000000',
    });

    const holiday1 = await holidayInteractor.newHoliday(
      true,
      today,
      addDays(today, 9),
      admin1.id,
    );
    const holiday2 = await holidayInteractor.newHoliday(
      false,
      addDays(today, 6),
      addDays(today, 8),
      user1.id,
    );

    const holiday3 = await holidayInteractor.newHoliday(
      true,
      addDays(today, 36),
      addDays(today, 48),
      admin2.id,
    );

    const holiday4 = await holidayInteractor.newHoliday(
      true,
      addDays(today, 14),
      addDays(today, 21),
      user2.id,
    );

    await requestInteractor.newUpdate({
      from: addDays(today, 18),
      until: addDays(today, 26),
      holidayId: holiday4.id,
      owner: user2.id,
    });

    await requestInteractor.confirmRequest(
      holiday1.HolidayRequests[0].id,
      admin2.id,
    );
  } catch (error) {
    console.log('[Initialization error]: ', error);
  }
};
