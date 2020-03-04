// import math from './mathematic';
// import {serverController} from './controllers/index';
import TestServer from './server'
// import bodyParser from 'body-parser';

// console.log('The answer is: ' + math.add(2, 2));

// const app = express();
const port = process.env.PORT || 8000;


const server = new TestServer();
server.start(port);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// // app.get('api/users/:id', getUser);

// app.listen(port, () => console.log("Hello world"));
