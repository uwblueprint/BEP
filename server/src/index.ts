import math from './mathematic';
import express from 'express';
import bodyParser from 'body-parser';
import { userInfo } from 'os';

// console.log('The answer is: ' + math.add(2, 2));

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.get('api/users/:id', getUser);

app.listen(port, () => console.log("Hello world"));