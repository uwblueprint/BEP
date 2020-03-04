import * as bodyParser from 'body-parser';
// import * as controllers from './controllers';
import { Server } from 'http';
import * as express from 'express';
// import {XMLHttpRequest} from 'xmlhttprequest-ts';

class TestServer extends Server {
    private readonly SERVER_STARTED = "Example server started on port: ";

    // open = require('open');

    public app = express();

    constructor() {
        super();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
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
        this.app.get('*', (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            console.log(this.SERVER_STARTED + port);
            // var xml = new XMLHttpRequest();
            // xml.open("POST",'http://127.0.0.1:'+ port);
            // xml.send();
        })
    }
}
export default TestServer;
