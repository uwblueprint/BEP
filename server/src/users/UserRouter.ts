/**
 * Required External Modules and Interfaces
 */

import * as UserService from './UserService';
import * as Express from 'express';

/**
 * Router Definition
 */

export const userRouter = Express.Router();

/**
 * Controller Definitions
 */

// GET requests/

userRouter.get('/:id', async (req: Express.Request, res: Express.Response) => {
    // const id: number = parseInt(req.params.id, 10);
    const id: string = req.params.id;

    try {
        const fetchedUser = await UserService.getUserInfo(id);

        res.status(200).send(fetchedUser);
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

// POST requests/

userRouter.post('/', async (req: Express.Request, res: Express.Response) => {
    try {
        // Type match request body into User interface when Salesforce fields are figured out
        // const userInfo: User = req.body.user;
        let name: string = req.body.name;
        let email: string = req.body.email;
        let password: string = req.body.password;
        let phoneNumber: string = req.body.phoneNumber;
        let lastName: string = req.body.lastName;
        await UserService.create(name, email, password, phoneNumber, lastName);

        res.sendStatus(201);
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

// PUT requests/

userRouter.put('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = req.params.id;
        await UserService.update(id, req.body);

        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: e.message });
    }
});

// DELETE requests/:id using name for now

userRouter.delete('/:name', async (req: Express.Request, res: Express.Response) => {
    try {
        let id: string = req.params.id;
        await UserService.remove(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});
