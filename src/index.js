'use strict';

import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import routes from './routes';
import models, { sequelize } from './models';

const app = express();

app.use(cors());

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

const eraseDatabaseOnSync = true;

sequelize
  .sync({ force: eraseDatabaseOnSync })
  .then(async () => {
    if (eraseDatabaseOnSync) initial();

    app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${process.env.PORT}!`),
    );
  })
  .catch(err => console.error(err));

const initial = async () => {
  await models.Role.create({
    id: 1,
    name: 'user',
  });

  await models.Role.create({
    id: 2,
    name: 'admin',
  });

  await models.User.create({
    username: 'rwieruch',
    email: 'rwieruch',
    password: '000000',
    //   holidays: [
    //     {
    //       from: new Date().getDate(),
    //       until: new Date('20/07/2020').getDate(),
    //     },
    //   ],
    // },
    // {
    //   include: [models.Holiday],
  });
  await models.User.create(
    {
      username: 'ddavids',
      email: 'ddavids',
      password: '000000',
      // messages: [
      //   {
      //     text: 'Happy to release ...',
      //   },
      //   {
      //     text: 'Published a complete ...',
      //   },
      // ],
    },
    // {
    //   include: [models.Message],
    // },
  );
};
