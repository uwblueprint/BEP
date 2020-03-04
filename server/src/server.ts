import * as bodyParser from 'body-parser';
// import * as controllers from './controllers';
import { Server } from 'http';
// import * as express from 'express';
const express = require('express');

const jsforce = require('jsforce');
const morgan = require('morgan');
const session = require('express-session');

import dotenv from 'dotenv';

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

    // open = require('open');

    public app = express();

    constructor() {
        super();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(session({ secret: 'S3CRE7', resave: true, saveUninitialized: true }));
        // this.setupControllers();
    }
    // private setupControllers(): void {
    //     const ctlInstances = [];
    //
    //     // for (const name in controllers) {
    //     //     if (controllers.hasOwnProperty(name)) {
    //     //         const controller = (controllers as any)[name];
    //     //         ctlInstances.push(new controller());
    //     //     }
    //     // }
    //     // super.addControllers(ctlInstances);
    // }

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
            conn.authorize(code, function (err, userInfo) {
                if (err) {
                    return console.error('This error is in the auth callback: ' + err);
                }
                console.log('\nAuthentication successful!\n');
                console.log('Access Token: ' + conn.accessToken);
                console.log('Instance URL: ' + conn.instanceUrl);
                console.log('refreshToken: ' + conn.refreshToken);
                console.log('User ID: ' + userInfo.id);
                console.log('Org ID: ' + userInfo.organizationId);

                req.session.accessToken = conn.accessToken;
                req.session.instanceUrl = conn.instanceUrl;
                req.session.refreshToken = conn.refreshToken;

                res.redirect('http://localhost:3030');
            });
        });
        this.app.get('/test', (req, res) => {
            let conn = new jsforce.Connection({
                oauth2: { oauth2 },
                accessToken: req.session.accessToken,
                instanceUrl: req.session.instanceUrl
            });
            // Single record creation
            conn.sobject('Test__c').create({ Name: 'My Account #1', Email__c: 'test@tests.com' }, function (err, ret) {
                if (err || !ret.success) {
                    return console.error(err, ret);
                }
                console.log('Created record id : ' + ret.id);
            });
            // GET QUERY
            // var records = [];
            conn.query('SELECT Name,Email__c FROM Test__c', function (err, result) {
                if (err) {
                    return console.error(err);
                }
                console.log('total : ' + result.totalSize);
                console.log('fetched : ' + result.records.length);
                console.log(result.records);
            });
        });
        this.app.listen(port, () => {
            console.log(this.SERVER_STARTED + port);
        });
    }
}
export default TestServer;
