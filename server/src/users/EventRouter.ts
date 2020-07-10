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

eventRouter.get('/:name', async (req: Express.Request, res: Express.Response) => {
    // const id: number = parseInt(req.params.id, 10);
    const name: string = req.params.name;

    try {
        const fetchedEvent = await EventService.getEventInfo(name);

        res.status(200).send(fetchedEvent);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

eventRouter.get("/", async(req: Express.Request, res: Express.Response) => {
    try {
        const fetchedEvents = await EventService.getAllEvents();

        res.status(200).send(fetchedEvents);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST requests/

eventRouter.post('/create', async (req: Express.Request, res: Express.Response) => {
    try {
        // Type match request body into Event interface when Salesforce fields are figured out
        // const eventInfo: Event = req.body.event;
        let name: string = req.body.name;
        let isActive: boolean = req.body.isActive;

        await EventService.create(name, isActive);

        res.sendStatus(201);
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