/**
 * Required External Modules and Interfaces
 */

import * as Express from "express";
import * as UserService from "./UserService";
import User from "./UserInterface";

/**
 * Router Definition
 */

export const userRouter = Express.Router();

/**
 * Controller Definitions
 */

// GET requests/:id

userRouter.get("/:id", async (req: Express.Request, res: Express.Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const fetchedUser: User = await UserService.find(id);

        res.status(200).send(fetchedUser);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST requests/

userRouter.post("/create", async (req: Express.Request, res: Express.Response) => {
    try {
        const createdUser: User = req.body.request;
        console.log("body of post req", createdUser);
        await UserService.create(createdUser);

        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT requests/

userRouter.put("/:id", async (req: Express.Request, res: Express.Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {

        await UserService.update(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE requests/:id

userRouter.delete("/:id", async (req: Express.Request, res: Express.Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await UserService.remove(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
}); 
