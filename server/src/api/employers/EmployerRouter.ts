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
            const fetchedEmployer = await EmployerService.get(id);
            res.status(200).send(fetchedEmployer);
        } else {
            throw Error(`Invalid query parameters. Either set "id" parameter.`);
        }
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

employerRouter.get('/', async (req: Express.Request, res: Express.Response) => {
    try {
        const employers = await EmployerService.getAll();
        res.status(200).send(employers);
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

employerRouter.put('/:id', async (req: Express.Request, res: Express.Response) => {
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
