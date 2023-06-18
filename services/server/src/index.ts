import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import numberParser from './numberParser.js';
import { store, User } from "./store.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors({origin: process.env.ALLOWED_ORIGIN}));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

let responseInprocess = false;
let timerId: any;

app.post('/api/v1/users', (req: Request, res: Response) => {
  if (responseInprocess) {
    clearTimeout(timerId);
    console.log('!!!clear')
  }

  responseInprocess = true;

  console.log('!',req.body, '!')

  const email = req.body?.email;
  const number = req.body?.number;

  const parsedNumber = numberParser(number);

  const relevantUsers: User[] = store.filter((user) => {
    if (!parsedNumber) {
      return user?.email === email
    }
    return user?.email === email && user?.number === parsedNumber;
  });

  timerId = setTimeout(() => {
    responseInprocess = false;
    res.json(relevantUsers);
  }, 5000);

});

app.use((req: Request, res: Response) => {
  const title = 'Error Request';
  res
    .status(404)
    .send(title);
});
