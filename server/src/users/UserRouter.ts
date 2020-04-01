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

userRouter.get("/", async (req: Express.Request, res: Express.Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const fetchedUser = await UserService.getUserInfo(id);

        res.status(200).send(fetchedUser);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST requests/

userRouter.post("/create", async (req: Express.Request, res: Express.Response) => {
    try {
        // Type match request body into User interface when Salesforce fields are figured out
        // const createdUser: User = req.body.request;
        let name: string = req.params.name;
        let email: string = req.params.email;
        let password: string = req.params.password;
        let phoneNumber: string = req.params.phoneNumber;
        let lastName: string = req.params.lastName;
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

// // DELETE requests/:id

// userRouter.delete("/:id", async (req: Express.Request, res: Express.Response) => {
//     try {
//         const id: number = parseInt(req.params.id, 10);
//         await UserService.remove(id);

//         res.sendStatus(200);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// }); 
