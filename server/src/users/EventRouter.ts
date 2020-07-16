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

// GET requests/:id currently using the Name field (first name) since don't know how to actually grab object id in salesforce

eventRouter.get('/', async (req: Express.Request, res: Express.Response) => {
    // const id: number = parseInt(req.params.id, 10);
    const name: string = req.query.name as string;
    const isEventActive: string = req.query.isEventActive as string;
    const limit: number = req.query.limit as any;
    const offset: number = req.query.offset as any;

    try {
        if (name !== undefined) {
            const fetchedEvent = await EventService.getEventInfo(name);
            res.status(200).send(fetchedEvent);
        } else if (isEventActive === 'true') {
            const fetchedActiveEvents = await EventService.getActiveEvents(limit ? limit : 10, offset ? offset : 0);
            res.status(200).send(fetchedActiveEvents);
        } else if (isEventActive === 'false') {
            const fetchedPastEvents = await EventService.getPastEvents(limit ? limit : 10, offset ? offset : 0);
            res.status(200).send(fetchedPastEvents);
        } else {
            throw Error(`Invalid query parameters. Either set "isEventActive" parameter or put eventName.`);
        }
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

// POST requests/

eventRouter.post('/create', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = await EventService.create(req.body);
        res.status(201).send({ id });
    } catch (e) {
        res.status(404).send(e.message);
    }
});

//PUT requests

eventRouter.put('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        console.log(req.body);
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
        let id: string = req.params.id;
        await EventService.remove(id)

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});