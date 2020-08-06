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

eventRouter.get("/", async (req: Express.Request, res: Express.Response) => {
    const limit: number = req.query.limit as any;
    const offset: number = req.query.offset as any;
    try {
        const fetchedEvents = await EventService.getAllEvents(limit, offset);
        res.status(200).send(fetchedEvents);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

eventRouter.get('/applications', async (req: Express.Request, res: Express.Response) => {
    const name: string = req.query.name as string;

    console.log("Hit applications endpoint")

    try {
        if (name !== undefined) {
            const applications = await EventService.getApplications(name);
            res.status(200).json({
                applications
            });
        } else {
            throw Error(`Invalid query parameters. Please set "name" parameter`);
        }
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

eventRouter.patch('/applications/updatestate', async (req: Express.Request, res: Express.Response) => {
    const type: string = req.body.type as string;
    const eventName: string = req.body.event_name as string;
    const applicantName: string = req.body.applicant_name as string;

    if (type === "accept") {
        EventService.acceptApplicant(eventName, applicantName, true)
    } else if (type === "deny") {
        EventService.acceptApplicant(eventName, applicantName, false)
    } else {
        res.status(400).send({ msg: "Bad Request" })
    }
})

eventRouter.get('/invitations', async (req: Express.Request, res: Express.Response) => {
    const name: string = req.query.name as string;

    console.log("Hit invitations endpoint")

    try {
        if (name !== undefined) {
            const invitations = await EventService.getInvitations(name);
            res.status(200).json({
                invitations
            });
        } else {
            throw Error(`Invalid query parameters. Please set "name" parameter`);
        }
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

eventRouter.get('/volunteers', async (req: Express.Request, res: Express.Response) => {
    const name: string = req.query.name as string;

    console.log("Hit volunteers endpoint")

    try {
        if (name !== undefined) {
            const volunteers = await EventService.getVolunteers(name);
            res.status(200).json({
                volunteers
            });
        } else {
            throw Error(`Invalid query parameters. Please set "name" parameter`);
        }
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

eventRouter.get('/:name', async (req: Express.Request, res: Express.Response) => {
    // const id: number = parseInt(req.params.id, 10);
    //const name: string = req.query.name as string;

    const name: string = req.params.name as string

    try {
        if (name !== undefined) {
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