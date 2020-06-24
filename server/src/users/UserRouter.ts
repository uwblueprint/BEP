/**
 * Required External Modules and Interfaces
 */

import * as Express from "express";
import * as UserService from "./UserService";

/**
 * Router Definition
 */

export const userRouter = Express.Router();

/**
 * Controller Definitions
 */

// GET requests/:id currently using the Name field (first name) since don't know how to actually grab object id in salesforce

userRouter.get("/:name", async (req: Express.Request, res: Express.Response) => {
    // const id: number = parseInt(req.params.id, 10);
    const name: string = req.params.name;

    try {
        const fetchedUser = await UserService.getUserInfo(name);

        res.status(200).send(fetchedUser);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// DELETE Request

userRouter.delete("/:name", async (req: Express.Request, res: Express.Response) => {
    try {
        let id: string = req.params.id;
        await UserService.remove(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});


