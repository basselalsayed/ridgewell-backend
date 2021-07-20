'use strict';

import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import db from './database/models';
import routes from './routes';

import { handleErrors, setInteractor } from './middleware';
import initialize from './initialize';

const app = express();
app.get('/ping', (req, res) => {
  res.send('pong');
});

const origins = process.env.ORIGINS.split(',');

let corsOptions = {
  origin: (origin, cb) => {
    const canPass = origins.includes(origin);
    return cb(!canPass, origins);
  },
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

app.use(setInteractor);
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/holidays', routes.holiday);
app.use('/requests', routes.holidayRequest);
app.use('/notifications', routes.notification);

app.use(handleErrors);

const eraseDatabaseOnSync = JSON.parse(process.env.ERASE);

db.sequelize
  .sync({ force: eraseDatabaseOnSync, logging: false })
  .then(async () => {
    if (eraseDatabaseOnSync) await initialize();

    app.listen(
      process.env.PORT,
      console.log(
        '\x1b[36m\n[server]\x1b[0m',
        `\x1b[33mListening on port ${process.env.PORT}\n\x1b[0m`,
      ),
    );
  })
  .catch(err => console.error(err));
