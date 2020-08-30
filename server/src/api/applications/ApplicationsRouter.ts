/**
 * Required External Modules and Interfaces
 */

import * as Express from 'express';
import * as ApplicationService from './ApplicationsService';

/**
 * Router Definition
 */

export const applicationRouter = Express.Router();

/**
 * Controller Definitions
 */

// GET requests/:id currently using the applicationId field

applicationRouter.get('/', async (req: Express.Request, res: Express.Response) => {
    const id: string = req.query.id as string;
    const relatedTo: string = req.query.relatedTo as string;

    if (!id) {
        throw Error(`Invalid query parameters. Must set "id" parameter.`);
    }

    try {
        if (relatedTo === 'volunteer') {
            const applications = await ApplicationService.getVolunteerApplications(id);
            res.status(200).send(applications);
        } else if (relatedTo === 'event') {
            const applications = await ApplicationService.getEventApplications(id);
            res.status(200).send(applications);
        } else {
            const application = await ApplicationService.get(id);
            res.status(200).send(application);
        }
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST requests/

applicationRouter.post('/', async (req: Express.Request, res: Express.Response) => {
    try {
        const id = await ApplicationService.create(req.body);
        res.status(201).send({ id });
    } catch (e) {
        res.status(404).send(e.message);
    }
});

//PUT requests

applicationRouter.put('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        await ApplicationService.update(req.body);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
