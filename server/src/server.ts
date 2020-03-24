import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
// import * as controllers from './controllers';
import { Server } from 'http';
import dotenv from 'dotenv';
import cors from "cors";
import helmet from "helmet";
import express from 'express';
import session from 'express-session';
<<<<<<< HEAD
import jsforce from 'jsforce';
import { requestsRouter } from "./requests/requests.router";


// const jsforce = require('jsforce');
=======
// import { requestsRouter } from "./requests/requests.router";
import jsforce from 'jsforce';

>>>>>>> 29ef92502fe1d4b8f1e4aebf74a1d62f661834a8
const result = dotenv.config();

let conn;

if (result.error) {
  throw result.error;
}

<<<<<<< HEAD
const oauth2 = new jsforce.OAuth2({
  loginUrl: process.env.LOGIN_URL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'http://localhost:3030/token'
});

=======
>>>>>>> 29ef92502fe1d4b8f1e4aebf74a1d62f661834a8
console.log(result.parsed);

<<<<<<< HEAD
    // private accessToken: string;
    // private instanceUrl: string;
    // private refreshToken: string;

    private conn: jsforce.Connection;

    // open = require('open');
=======
class BackendServer extends Server {
    private readonly SERVER_STARTED = "Example server started on port: ";
>>>>>>> 29ef92502fe1d4b8f1e4aebf74a1d62f661834a8

  public app = express();
  private readonly SERVER_STARTED = 'Example server started on port: ';

    constructor() {
        super();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(session({ secret: 'S3CRE7', resave: true, saveUninitialized: true }));

        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
<<<<<<< HEAD
        this.app.use("/requests", requestsRouter);
        // this.setupControllers();
    }

    public start(port): void {
        this.app.get('/', (req, res) => {
            console.log('Testing /');
            res.send('Hello world!');
        });
        this.app.get('/auth/login', (req, res) => {
            // Redirect to Salesforce login/authorization page
            // Connected app settings FIXED so doesn't need a salesforce USER login
            // Will directly re-direct you to /token

            // TODO: handle re-authentication when oauth token TIMES OUT 
            // (check settings to see how long time is)
            res.redirect(oauth2.getAuthorizationUrl({ scope: 'api id web refresh_token full' }));
=======
        // this.app.use("/requests", requestsRouter);

        // Authenticate to Salesforce
        conn = new jsforce.Connection({
            oauth2: {
                loginUrl: process.env.LOGIN_URL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                redirectUri: process.env.REDIRECT_URI
            }
        });
        conn.login(process.env.SALESFORCE_USERNAME, process.env.SALESFORCE_PASSWORD, (err, userInfo) => {
            if (err) {
                return console.error("err in salesforce login", err);
            }
            console.log("salesforce connection established successfully");
>>>>>>> 29ef92502fe1d4b8f1e4aebf74a1d62f661834a8
        });
    }

<<<<<<< HEAD
        this.app.get('/token', (req, res) => {
            const conn = new jsforce.Connection({ oauth2: oauth2 });
            const code = req.query.code;
            conn.authorize(code, (err, userInfo) => {
                if (err) {
                    return console.error('This error is in the auth callback: ' + err);
                }

                console.log('\nAuthentication successful!\n');
                console.log('Access Token: ' + conn.accessToken);
                console.log('Instance URL: ' + conn.instanceUrl);
                console.log('refreshToken: ' + conn.refreshToken);
                console.log('User ID: ' + userInfo.id);
                console.log('Org ID: ' + userInfo.organizationId);

                res.redirect('http://localhost:3030');
            });
            this.conn = conn;
        });

        this.app.get('/test', (req, res) => {
            this.conn.query('SELECT Name,Email__c FROM Test__c', function (err, result) {
=======
    public start(port: string): void {
        this.app.get('/', (req, res) => {
            console.log("testing /")
            res.send("hello world")
        })

        // Sanity check test method
        this.app.get('/test', (req, res) => {
            conn.query('SELECT Name,Email__c FROM Test__c', (err, result) => {
>>>>>>> 29ef92502fe1d4b8f1e4aebf74a1d62f661834a8
                if (err) {
                    console.log("query error");
                    return console.error(err);
                }
                console.log('total : ' + result.totalSize);
                console.log('fetched : ' + result.records.length);
                console.log(result.records);
                res.send(result.records);
            });
            res.send("test OK");
        });

        this.app.listen(port, () => {
            console.log(this.SERVER_STARTED + port);
        });
    }
}

<<<<<<< HEAD
export default TestServer;
=======
export {
    BackendServer,
    conn
}






>>>>>>> 29ef92502fe1d4b8f1e4aebf74a1d62f661834a8
