import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import models from './models';

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

app.get('/session', (req, res) =>
  res.send(req.context.models.users[req.user.id]),
);

app.get('/users', (req, res) =>
  res.send(Object.values(req.context.models.users)),
);

app.get('/users/:userId', (req, res) =>
  res.send(req.context.models.users[req.params.userId]),
);

app.post('/users', (req, res) => res.send('POST HTTP method on user resource'));

app.put('/users/:userId', (req, res) =>
  res.send(`PUT HTTP method on user/${req.params.userId} resource`),
);

app.delete('/users/:userId', (req, res) =>
  res.send(`DELETE HTTP method on user/${req.params.userId} resource`),
);

app.get('/messages', (req, res) =>
  res.send(Object.values(req.context.models.messages)),
);

app.get('/messages/:messageId', (req, res) =>
  res.send(req.context.models.messages[req.params.messageId]),
);

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.user.id,
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
