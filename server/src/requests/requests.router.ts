/**
 * Required External Modules and Interfaces
 */

import * as Express from "express";
// import { Request } from "express" as expressRequest;
import * as RequestService from "./requests.service";
import { Request } from "./request.interface";
import { Requests } from "./requests.interface";
import { v4 as uuidv4 } from 'uuid';

/**
 * Router Definition
 */

export const requestsRouter = Express.Router();

/**
 * Controller Definitions
 */

// GET requests/

requestsRouter.get("/", async (req: Express.Request, res: Express.Response) => {
    try {
        var reqs: Array<Request> = await RequestService.findAll();

        res.status(200).send(reqs);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET requests/:id

requestsRouter.get("/:name", async (req: Express.Request, res: Express.Response) => {
    // const id: number = parseInt(req.params.id, 10);
    const name: string = req.params.name;

    try {
        const r: Request = await RequestService.find(name);

        res.status(200).send(r);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST requests/

requestsRouter.post("/", async (req: Express.Request, res: Express.Response) => {
    try {
        const name: string = req.body.name;
        let status: string = req.body.status;
        const user: string = req.body.user;
        // const id: string = uuidv4();

        let request: Request = {id: id, name: name, status: status, openedBy: user};

        await RequestService.create(request);

        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT requests/

requestsRouter.put("/", async (req: Express.Request, res: Express.Response) => {
    try {
        const request: Request = req.body.item;

        await RequestService.update(request);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE requests/:id

requestsRouter.delete("/:name", async (req: Express.Request, res: Express.Response) => {
    try {
        const name: string = req.params.name;
        // const id: number = parseInt(req.params.id, 10);
        await RequestService.remove(name);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});