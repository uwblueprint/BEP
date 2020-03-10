/**
 * Required External Modules and Interfaces
 */

import * as Express from "express";
import jsforce from 'jsforce';
import User from '../models/UserInterface';
import * as UserService from '../services/UserService';

/**
 * Router Definition
 */

 export const userRouter = Express.Router();
 

/**
 * Controller Definitions
 */



// GET items/

// GET items/:id

// POST items/

userRouter.post("/create", async (req: Express.Request, res: Express.Response) => {
    try {
        const name: string = req.body.name;

        await UserService.create(name);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// PUT items/

// DELETE items/:id