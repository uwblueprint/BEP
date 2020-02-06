import { Request, Response } from  'express';
import { get } from 'http';

@Controller('api')
export class serverController {
    @get()
    private getMessage(req: Request, res: Response) {
        console.log("message");
        res.status(200).json({
            message: "message",
        });
    }
}