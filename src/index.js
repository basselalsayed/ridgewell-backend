import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import routes from './routes';
import models, { sequelize } from './models';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use((req, res, next) => {
  req.context = {
    models,
    user: models.users[1],
  };
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});
