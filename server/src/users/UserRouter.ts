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

// GET users/?email

userRouter.get('/', async (req: Express.Request, res: Express.Response) => {
    const email: string = req.query.email as string;

    try {
        const fetchedUser = await UserService.getUser(email);

        res.status(200).send(fetchedUser);
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

// POST users/

userRouter.post('/', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = await UserService.create(req.body);

        res.status(201)
            .set('Location', `/api/user/${id}`)
            .end();
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

// PUT users/:id

userRouter.put('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = req.params.id;
        await UserService.update(id, req.body);

        res.status(200).send({ id: id });
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

// DELETE users/:id

userRouter.delete('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        let id: string = req.params.id;
        await UserService.remove(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});
