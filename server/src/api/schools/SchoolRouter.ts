/**
 * Required External Modules and Interfaces
 */

import * as SchoolService from './SchoolService';
import * as Express from 'express';

/**
 * Router Definition
 */

export const schoolRouter = Express.Router();

/**
 * Controller Definitions
 */

// GET schools/:id

schoolRouter.get('/:id', async (req: Express.Request, res: Express.Response) => {
    const id: string = req.params.id;

    try {
        if (id !== undefined) {
            const fetchedSchool = await SchoolService.get(id);
            res.status(200).send(fetchedSchool);
        } else {
            throw Error(`Invalid query parameters. Either set "id" parameter.`);
        }
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});
// GET schools/
schoolRouter.get('/', async (req: Express.Request, res: Express.Response) => {
    try {
        const fetchedSchools = await SchoolService.getAll();
        res.status(200).send(fetchedSchools);
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

// POST schools/

schoolRouter.post('/', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = await SchoolService.create(req.body);

        res.status(201).send({ id });
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

// PUT schools/

schoolRouter.put('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = req.body.id;
        await SchoolService.update(req.body);

        res.status(200).send({ id });
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

// DELETE schools/:id

schoolRouter.delete('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = req.params.id;
        await SchoolService.remove(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});
