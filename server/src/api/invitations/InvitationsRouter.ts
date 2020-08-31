/**
 * Required External Modules and Interfaces
 */

import * as Express from 'express';
import * as InvitationsService from './InvitationsService';

/**
 * Router Definition
 */

export const invitationRouter = Express.Router();

/**
 * Controller Definitions
 */

// GET requests/:id currently using the applicationId field

invitationRouter.get('/', async (req: Express.Request, res: Express.Response) => {
    const id: string = req.query.id as string;
    const relatedTo: string = req.query.relatedTo as string;

    if (!id) {
        throw Error(`Invalid query parameters. Must set "id" parameter.`);
    }

    try {
        if (relatedTo === 'volunteer') {
            const invitations = await InvitationsService.getVolunteerApplications(id);
            res.status(200).send(invitations);
        } else if (relatedTo === 'event') {
            const invitations = await InvitationsService.getEventApplications(id);
            res.status(200).send(invitations);
        } else {
            const invitations = await InvitationsService.get(id);
            res.status(200).send(invitations);
        }
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST requests/

invitationRouter.post('/', async (req: Express.Request, res: Express.Response) => {
    try {
        const id = await InvitationsService.create(req.body);
        res.status(201).send({ id });
    } catch (e) {
        res.status(404).send(e.message);
    }
});

//PUT requests

invitationRouter.put('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        await InvitationsService.update(req.body);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
