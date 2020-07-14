'use strict';

import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import routes from './routes';
import models, { sequelize } from './models';
import { hashSync } from 'bcryptjs';

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
    models,
    // user: await models.User.findByLogin('rwieruch'),
  };
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/holiday', routes.holiday);
app.use('/requests', routes.holidayRequest);

const eraseDatabaseOnSync = true;

sequelize
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
  const { Holiday, HolidayRequest, Role, User } = models;
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
      username: 'bsas',
      email: 'bsas@ridgewell.co.uk',
      password: hashSync(process.env.ADMIN_PASS, 8),
      holidays: [
        {
          from: '2020-07-20',
          until: '2020-07-30',
          confirmed: true,
        },
      ],
      holidayRequests: [{ type: 'delete', holidayId: '1', owner: '1' }],
    },
    { include: [Holiday, HolidayRequest, Role] },
  ).then(user => user.setRoles([2]));

  await User.create(
    {
      username: 'user',
      email: 'user@ridgewell.co.uk',
      password: hashSync('000000', 8),
      holidays: [
        {
          from: '2020-08-20',
          until: '2020-08-30',
        },
      ],
      holidayRequests: [{ type: 'new', holidayId: '2', owner: '2' }],
    },
    { include: [Holiday, HolidayRequest, Role] },
  );
  await User.create(
    {
      username: 'user1',
      email: 'user1@ridgewell.co.uk',
      password: hashSync('000000', 8),
      holidays: [
        {
          from: '2020-08-15',
          until: '2020-08-25',
        },
      ],
    },
    { include: [Holiday, Role] },
  );

  await HolidayRequest.create({
    type: 'update',
    from: '2020-08-21',
    until: '2020-09-10',
    owner: '3',
    holidayId: '3',
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
    password: hashSync('000000', 8),
  });
  await User.create({
    username: 'user3',
    email: 'user3@ridgewell.co.uk',
    password: hashSync('000000', 8),
  });
};
