import * as bodyParser from 'body-parser';
// import * as controllers from './controllers';
import { Server } from 'http';
import dotenv from 'dotenv';
import cors from "cors";
import helmet from "helmet";
import express from 'express';
import session from 'express-session';
import jsforce from 'jsforce';
import { requestsRouter } from "./requests/requests.router";


// const jsforce = require('jsforce');
const result = dotenv.config();

if (result.error) {
    throw result.error;
}

const oauth2 = new jsforce.OAuth2({
    loginUrl: process.env.LOGIN_URL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:3030/token'
});

console.log(result.parsed);
class TestServer extends Server {
    private readonly SERVER_STARTED = "Example server started on port: ";

    private accessToken: string;
    private instanceUrl: string;
    private refreshToken: string;

    private conn: jsforce.Connection;

    // open = require('open');

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
        // this.setupControllers();
    }
    

    public start(port): void {
        // this.app.get('*', (req, res) => {
        //     res.send(this.SERVER_STARTED + port);
        // });
        this.app.get('/', (req, res) => {
            console.log('Testing /');
            res.send('Hello world!');
        });
        this.app.get('/auth/login', (req, res) => {
            // Redirect to Salesforce login/authorization page
            res.redirect(oauth2.getAuthorizationUrl({ scope: 'api id web refresh_token full' }));
        });

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

                this.accessToken = conn.accessToken;
                this.instanceUrl = conn.instanceUrl;
                this.refreshToken = conn.refreshToken;

                // this.app.use(session({accessToken: conn.accessToken, instanceUrl: }))
                res.redirect('http://localhost:3030');
            });
            this.conn = conn;
        });

        this.app.get('/test', (req, res) => {
            console.log("in /test: this.conn.accessToken: ", this.accessToken);
            this.conn.query('SELECT Name,Email__c FROM Test__c', function (err, result) {
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

        this.app.listen(port, () => {
            console.log(this.SERVER_STARTED + port);
        });
    }
}
export default TestServer;
