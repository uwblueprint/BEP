import * as bodyParser from 'body-parser';
// import * as controllers from './controllers';
import { Server } from 'http';
import dotenv from 'dotenv';
import cors from "cors";
import helmet from "helmet";
import express from 'express';
import session from 'express-session';
import { requestsRouter } from "./requests/requests.router";
// import { authRouter } from "./auth/auth.router";
import jsforce from 'jsforce';

// const jsforce = require('jsforce');
const result = dotenv.config();

let conn;

if (result.error) {
    throw result.error;
}

console.log(result.parsed);

class TestServer extends Server {
    private readonly SERVER_STARTED = "Example server started on port: ";

    public app = express();

    constructor() {
        super();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(session({ secret: 'S3CRE7', resave: true, saveUninitialized: true }));

        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use("/requests", requestsRouter);

        // Authenticate to Salesforce
        conn = new jsforce.Connection({
            oauth2: {
                loginUrl: process.env.LOGIN_URL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                redirectUri: 'http://localhost:3030/auth/token'
            }
        });
        conn.login(process.env.SALESFORCE_USERNAME, process.env.SALESFORCE_PASSWORD, (err, userInfo) => {
            if (err) { 
                return console.error("err in salesforce login", err); 
            }
            // Now you can get the access token and instance URL information.
            // Save them to establish connection next time.
            console.log("connection login successful");
            // logged in user property
        });
    }

    public start(port): void {
        this.app.get('/', (req, res) => {
            console.log("testing /")
            res.send("hello world")
        })
        this.app.listen(port, () => {
            console.log(this.SERVER_STARTED + port);
        });

        this.app.get('/test', (req, res) => {
            conn.query('SELECT Name,Email__c FROM Test__c', function (err, result) {
                if (err) {
                    console.log("query error");
                    return console.error(err);
                }
                console.log('total : ' + result.totalSize);
                console.log('fetched : ' + result.records.length);
                console.log(result.records);
            });
            res.send("test OK");
        });
    }
}

export {
    TestServer,
    conn
}

