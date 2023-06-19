import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import numberParser from './numberParser.js';
import { store } from "./store.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
let responseInprocess = false;
let timerId;
app.post('/api/v1/users', (req, res) => {
    if (responseInprocess) {
        clearTimeout(timerId);
    }
    responseInprocess = true;
    const email = req.body?.email;
    const number = req.body?.number;
    const parsedNumber = numberParser(number);
    const relevantUsers = store.filter((user) => {
        if (!parsedNumber) {
            return user?.email === email;
        }
        return user?.email === email && user?.number === parsedNumber;
    });
    timerId = setTimeout(() => {
        responseInprocess = false;
        res.json(relevantUsers);
    }, 5000);
});
app.use((req, res) => {
    const title = 'Error Request';
    res
        .status(404)
        .send(title);
});
//# sourceMappingURL=index.js.map