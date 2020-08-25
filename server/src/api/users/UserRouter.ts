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

// GET users/?email&type&limit&offset

userRouter.get('/', async (req: Express.Request, res: Express.Response) => {
    const email: string = req.query.email as string;
    const type: string = req.query.type as string;
    const limit: number = req.query.limit as any;
    const offset: number = req.query.offset as any;

    try {
        if (email !== undefined) {
            // If email provided in query parameters, return user with email address.
            const fetchedUser = await UserService.getUser({ email });
            res.status(200).send(fetchedUser);
        } else if (type === 'volunteer') {
            // If query parameters specify "volunteer", then return a paginated list of volunteers.
            const users = await UserService.getVolunteers(limit ? limit : 10, offset ? offset : 0);
            res.status(200).send(users);
        } else {
            throw Error(`Invalid query parameters. Either set "email" parameter or set "type" parameter.`);
        }
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

// POST users/

userRouter.post('/', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = await UserService.create(req.body);

        res.status(201).send({ id });
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
