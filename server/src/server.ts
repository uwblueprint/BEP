import * as bodyParser from 'body-parser';
import * as controllers from './controllers';

class Server extends Server {
    private readonly SERVER_STARTED = "Example server started on port: ";

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();
    }

    private setupControllers(): void {
        const ctlInstances = [];

        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlInstances.push(new controller());
            }
        }
        super.addControllers(ctlInstances);
    }

    public start(port: number) void {
        this.app.get('*', (req,res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            //can log stuff if needed
        });
    }
}
export default Server;
