/**
 * Required External Modules and Interfaces
 */

import * as Express from 'express';
import * as EventVolunteerService from './EventVolunteerService';

/**
 * Router Definition
 */

export const eventVolunteerRouter = Express.Router();

/**
 * Controller Definitions
 */

// GET requests/

eventVolunteerRouter.get('/', async (req: Express.Request, res: Express.Response) => {
    const id: string = req.query.id as string;
    const relatedTo: string = req.query.relatedTo as string;

    if (!id) {
        throw Error(`Invalid query parameters. Must set "id" parameter.`);
    }

    try {
        if (relatedTo === 'volunteer') {
            const eventVolunteers = await EventVolunteerService.getEventVolunteersForVolunteer(id);
            res.status(200).send(eventVolunteers);
        } else if (relatedTo === 'event') {
            const eventVolunteers = await EventVolunteerService.getEventVolunteersForEvent(id);
            res.status(200).send(eventVolunteers);
        } else {
            const eventVolunteers = await EventVolunteerService.get(id);
            res.status(200).send(eventVolunteers);
        }
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST requests/

eventVolunteerRouter.post('/', async (req: Express.Request, res: Express.Response) => {
    try {
        const id = await EventVolunteerService.create(req.body);
        res.status(201).send({ id });
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// DELETE requests

eventVolunteerRouter.delete('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: string = req.params.id;
        await EventVolunteerService.remove(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
