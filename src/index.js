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

    app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${process.env.PORT}!`),
    );
  })
  .catch(err => console.error(err));

const initialize = async () => {
  await models.Role.create({
    id: 1,
    name: 'user',
  });

  await models.Role.create({
    id: 2,
    name: 'admin',
  });

  await models.User.create(
    {
      username: 'bsas',
      email: 'bsas',
      password: hashSync(process.env.ADMIN_PASS, 8),
      holidays: [
        {
          from: '2020-07-20',
          until: '2020-07-30',
          userId: '1',
        },
      ],
    },
    { include: [models.Holiday, models.Role] },
  ).then(user => user.setRoles([2]));

  await models.HolidayRequest.create({
    type: 'delete',
    holidayId: '1',
    userId: 1,
  });

  await models.User.create({
    username: 'user',
    email: 'user',
    password: hashSync('000000', 8),
  });
};
