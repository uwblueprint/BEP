/**
 * Required External Modules and Interfaces
 */

import * as EmailService from './EmailService';
import * as Express from 'express';

/**
 * Router Definition
 */

export const emailRouter = Express.Router();

/**
 * Controller Definitions
 */

// GET employers/:id

emailRouter.get('/:id', async (req: Express.Request, res: Express.Response) => {
    const id: string = req.params.id;

    try {
        if (id !== undefined) {
            const emailContent = await EmailService.get(id);
            res.status(200).send(emailContent);
        } else {
            throw Error(`Invalid query parameters. Either set "id" parameter.`);
        }
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

// POST employers/

emailRouter.post('/', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = await EmailService.create(req.body);
        res.status(201).send({ id });
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

// PUT employers/

emailRouter.put('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = req.body.id;
        await EmailService.update(req.body);

        res.status(200).send({ id });
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

