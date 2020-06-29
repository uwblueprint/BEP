/**
 * Required External Modules and Interfaces
 */

import * as Express from 'express';
// import { Request } from "express" as expressRequest;
import * as RequestService from './requests.service';
import { Request } from './request.interface';
import { Requests } from './requests.interface';

/**
 * Router Definition
 */

export const requestsRouter = Express.Router();

/**
 * Controller Definitions
 */

// GET requests/

requestsRouter.get('/', async (req: Express.Request, res: Express.Response) => {
    try {
        const reqs: Requests = await RequestService.findAll();

        res.status(200).send(reqs);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET requests/:id

requestsRouter.get('/:id', async (req: Express.Request, res: Express.Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const r: Request = await RequestService.find(id);

        res.status(200).send(r);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST requests/

requestsRouter.post('/', async (req: Express.Request, res: Express.Response) => {
    try {
        const request: Request = req.body.request;
        console.log('body of post req', request);

        await RequestService.create(request);

        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT requests/

requestsRouter.put('/', async (req: Express.Request, res: Express.Response) => {
    try {
        const request: Request = req.body.item;

        await RequestService.update(request);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE requests/:id

requestsRouter.delete('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await RequestService.remove(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
