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

eventRouter.patch('/applications/updatestate', async (req: Express.Request, res: Express.Response) => {
    const type: string = req.body.type as string;
    const eventName: string = req.body.event_name as string;
    const applicantName: string = req.body.applicant_name as string;

    if (type === 'accept') {
        EventService.acceptApplicant(eventName, applicantName, true);
    } else if (type === 'deny') {
        EventService.acceptApplicant(eventName, applicantName, false);
    } else {
        res.status(400).send({ msg: 'Bad Request' });
    }
});

eventRouter.get('/invitations', async (req: Express.Request, res: Express.Response) => {
    const name: string = req.query.name as string;

    try {
        if (name) {
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

// eventRouter.get('/volunteers', async (req: Express.Request, res: Express.Response) => {
//     const name: string = req.query.name as string;

//     try {
//         if (name) {
//             const volunteers = await EventService.getVolunteers(name);
//             res.status(200).json({
//                 volunteers
//             });
//         } else {
//             throw Error(`Invalid query parameters. Please set "name" parameter`);
//         }
//     } catch (e) {
//         res.status(500).send({ msg: e.message });
//     }
// });

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
