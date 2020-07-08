import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'Bye World',
    userId: '2',
  },
};

app.get('/users', (req, res) => res.send(Object.values(users)));

app.get('/users/:userId', (req, res) => res.send(users[req.params.userId]));

app.post('/users', (req, res) => res.send('POST HTTP method on user resource'));

app.put('/users/:userId', (req, res) =>
  res.send(`PUT HTTP method on user/${req.params.userId} resource`),
);

app.delete('/users/:userId', (req, res) =>
  res.send(`DELETE HTTP method on user/${req.params.userId} resource`),
);

app.get('/messages', (req, res) => res.send(Object.values(messages)));

app.get('/messages/:messageId', (req, res) =>
  res.send(messages[req.params.messageId]),
);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
