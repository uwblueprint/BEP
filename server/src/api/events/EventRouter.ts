/**
 * Required External Modules and Interfaces
 */

import * as Express from 'express';
import * as EventService from './EventService';
// import Event from './EventInterface';

/**
 * Router Definition
 */

export const eventRouter = Express.Router();

/**
 * Controller Definitions
 */

eventRouter.post('/create', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = await EventService.create(req.body.event);
        res.status(201).send({ id });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

eventRouter.get('/', async (req: Express.Request, res: Express.Response) => {
    const limit: number = req.query.limit as any;
    const offset: number = req.query.offset as any;
    try {
        const fetchedEvents = await EventService.getEvents(limit, offset, 'all');
        res.status(200).send(fetchedEvents);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

eventRouter.get('/active', async (req: Express.Request, res: Express.Response) => {
    try {
        // Return all active events. Limit and offset have no effect.
        const fetchedEvents = await EventService.getEvents(0, 0, 'active');
        res.status(200).send(fetchedEvents);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

eventRouter.get('/past', async (req: Express.Request, res: Express.Response) => {
    const limit: number = req.query.limit as any;
    const offset: number = req.query.offset as any;
    try {
        const fetchedEvents = await EventService.getEvents(limit, offset, 'past');
        res.status(200).send(fetchedEvents);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

eventRouter.get('/:name', async (req: Express.Request, res: Express.Response) => {
    const name: string = req.params.name as string;

    try {
        if (name) {
            const fetchedEvent = await EventService.getEventInfo(name);
            res.status(200).send(fetchedEvent);
        } else {
            throw Error(`Invalid query parameters. Put eventName.`);
        }
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

// POST requests/

//PUT requests

eventRouter.put('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = req.params.id;
        await EventService.update(id, req.body);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE requests

eventRouter.delete('/:name', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = req.params.id;
        await EventService.remove(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
