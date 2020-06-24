/* tslint:disable */
import * as bodyParser from 'body-parser';

// import * as controllers from './controllers';
import { Server } from 'http';
import cors from "cors";
import helmet from "helmet";
import express from 'express';
import session from 'express-session';
import jsforce from 'jsforce';
import { userRouter } from './users/UserRouter';
import { requestsRouter } from './requests/requests.router';
import {verifyWebToken} from './middleware/jwt'
import { authRouter } from './auth/authRouter'

let result;

// Display environment variables
if (process.env.NODE_ENV !== 'production'){ 

    const dotenv = require('dotenv');
    
    result = dotenv.config();

    if (result.error) {
        throw result.error;
    }
      
    console.log(result.parsed);
}
let conn;


class BackendServer extends Server {

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
        });
    }

    public start(port: string): void {
        // Sanity check test method
        this.app.get('/test', (req, res) => {
            conn.query('SELECT Name,Email__c FROM Test__c', (err, result) => {
                if (err) {
                    console.log("query error");
                    return console.error(err);
                }
                console.log(result.records);
                res.send(result.records);
            });
        });
        this.app.use("/api/auth", authRouter)
        this.app.use("/api/requests", requestsRouter);
        //If in development, do not mount JWT auth middleware to users route
        if (process.env.NODE_ENV == 'development') {
            this.app.use("api/user/", userRouter);
        } else {
            this.app.use("api/user/userRouter", verifyWebToken(), userRouter);
        }

        //Uncomment soon. Test method to prevent non-logged in users from accessing '/'
        // this.app.get('/', (req, res)  => {
        //     if (!req.user) {
        //         res.send(
        //             {"Not Allowed"}
        //         )
        //     }
        // });

        this.app.listen(port, () => {
            console.log(this.SERVER_STARTED + port);
        });
    }
}

export {
    BackendServer,
    conn
}






