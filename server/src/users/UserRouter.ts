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

// POST requests/

userRouter.post("/create", async (req: Express.Request, res: Express.Response) => {
    try {
        // Type match request body into User interface when Salesforce fields are figured out
        // const userInfo: User = req.body.user;
        let name: string = req.body.name;
        let email: string = req.body.email;
        let password: string = req.body.password;
        let phoneNumber: string = req.body.phoneNumber;
        let lastName: string = req.body.lastName;
        await UserService.create(name, email, password, phoneNumber, lastName);

        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// // PUT requests/

// userRouter.put("/:id", async (req: Express.Request, res: Express.Response) => {
//     const id: number = parseInt(req.params.id, 10);

//     try {

//         await UserService.update(id);

//         res.sendStatus(200);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });

// DELETE requests/:id

userRouter.delete("/:id", async (req: Express.Request, res: Express.Response) => {
    try {
        let id: string = req.params.id;
        await UserService.remove(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
}); 
