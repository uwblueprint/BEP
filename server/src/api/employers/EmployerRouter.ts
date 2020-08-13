/**
 * Required External Modules and Interfaces
 */

import * as EmployerService from './EmployerService';
import * as Express from 'express';

/**
 * Router Definition
 */

export const employerRouter = Express.Router();

/**
 * Controller Definitions
 */

// GET employers/:id

employerRouter.get('/:id', async (req: Express.Request, res: Express.Response) => {
    const id: string = req.params.id;

    try {
        if (id !== undefined) {
            const fetchedUser = await EmployerService.get(id);
            res.status(200).send(fetchedUser);
        } else {
            throw Error(`Invalid query parameters. Either set "email" parameter or set "type" parameter.`);
        }
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

// POST employers/

employerRouter.post('/', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = await EmployerService.create(req.body);

        res.status(201).send({ id });
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

// PUT employers/

employerRouter.put('/', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = req.body.id;
        await EmployerService.update(req.body);

        res.status(200).send({ id });
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

// DELETE employers/:id

employerRouter.delete('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = req.params.id;
        await EmployerService.remove(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});
