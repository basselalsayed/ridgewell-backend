'use strict';

import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import db from '../database/models';
import routes from './routes';

import { handleErrors, setInteractor } from './middleware';

const app = express();

let corsOptions = {
  origin: process.env.ORIGIN,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

app.use(async (req, res, next) => {
  req.context = {
    db,
    models: db.sequelize.models,
    // user: await models.User.findByLogin('rwieruch'),
  };
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(setInteractor);
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/holidays', routes.holiday);
app.use('/holidays', routes.holiday);
app.use('/notifications', routes.notification);

app.use(handleErrors);

const eraseDatabaseOnSync = true;

db.sequelize
  .sync({ force: eraseDatabaseOnSync })
  .then(async () => {
    eraseDatabaseOnSync && initialize();

    app.listen(
      process.env.PORT,
      console.log(
        '\x1b[36m\n[server]\x1b[0m',
        `\x1b[33mListening on port ${process.env.PORT}\n\x1b[0m`,
      ),
    );
  })
  .catch(err => console.error(err));

const initialize = async () => {
  const { Holiday, HolidayRequest, Role, User } = db.sequelize.models;
  try {
    await Role.create({
      id: 1,
      name: 'user',
    });

    await Role.create({
      id: 2,
      name: 'admin',
    });

    await User.create(
      {
        username: process.env.ADMIN_1,
        email: process.env.ADMIN_1_EMAIL,
        password: process.env.ADMIN_1_PASS,
        Holidays: [
          {
            from: '2020-10-20',
            until: '2020-10-23',
          },
        ],
      },
      { include: [Holiday] },
    ).then(user => user.setRoles([2]));

    await HolidayRequest.create({
      type: 'delete',
      owner: '1',
      holidayId: '1',
    });

    await User.create(
      {
        username: process.env.ADMIN_2,
        email: process.env.ADMIN_2_EMAIL,
        password: process.env.ADMIN_2_PASS,
        Holidays: [
          {
            from: '2020-11-20',
            until: '2020-11-23',
          },
        ],
      },
      { include: [Holiday] },
    ).then(user => user.setRoles([2]));

    await HolidayRequest.create({
      type: 'delete',
      owner: '2',
      holidayId: '2',
    });

    await User.create(
      {
        username: 'user',
        email: 'user@ridgewell.co.uk',
        password: '000000',
        Holidays: [
          {
            from: '2020-10-20',
            until: '2020-10-23',
          },
        ],
      },
      { include: [Holiday] },
    ).then(user => user.setRoles([1]));

    await HolidayRequest.create({
      type: 'new',
      owner: '3',
      holidayId: '3',
    });

    await User.create(
      {
        username: 'user1',
        email: 'user1@ridgewell.co.uk',
        password: '000000',
        Holidays: [
          {
            from: '2020-11-15',
            until: '2020-11-25',
          },
        ],
      },
      { include: [Holiday] },
    );

    await HolidayRequest.create({
      type: 'update',
      from: '2020-11-16',
      until: '2020-11-26',
      owner: '4',
      holidayId: '4',
    });

    await HolidayRequest.findByPk(3).then(hol => {
      hol.setManagerId([1]);
      hol.update({
        resolved: true,
      });
    });

    await User.create({
      username: 'user2',
      email: 'user2@ridgewell.co.uk',
      password: '000000',
    });
    await User.create({
      username: 'user3',
      email: 'user3@ridgewell.co.uk',
      password: '000000',
    });
  } catch (error) {
    console.log('[error]', error);
  }
};
