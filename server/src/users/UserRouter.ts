/**
 * Required External Modules and Interfaces
 */

import * as Express from "express";
import * as UserService from "./UserService";
const passport = require('passport');
import LocalStrategy from "passport-local";
import * as UserInterface from "./UserInterface"
import * as bcrypt from "bcrypt";
import { RestApi } from "jsforce";

const BCRYPT_ROUNDS = 4


// import User from "./UserInterface";

/**
 * Router Definition
 */

export const userRouter = Express.Router();

/**
 * Controller Definitions
 */

// GET requests/:id currently using the Name field (first name) since don't know how to actually grab object id in salesforce

// userRouter.get("/:name", async (req: Express.Request, res: Express.Response) => {
//     // const id: number = parseInt(req.params.id, 10);
//     const name: string = req.params.name;

//     try {
//         const fetchedUser = await UserService.getUserInfo(name);

//         res.status(200).send(fetchedUser);
//     } catch (e) {
//         res.status(404).send(e.message);
//     }
// });

// // POST requests/

// userRouter.post("/create", async (req: Express.Request, res: Express.Response) => {
//     try {
//         // Type match request body into User interface when Salesforce fields are figured out
//         // const userInfo: User = req.body.user;
//         let name: string = req.body.name;
//         let email: string = req.body.email;
//         let password: string = req.body.password;
//         let phoneNumber: string = req.body.phoneNumber;
//         let lastName: string = req.body.lastName;
//         await UserService.create(name, email, password, phoneNumber, lastName);

//         res.sendStatus(201);
//     } catch (e) {
//         res.status(404).send(e.message);
//     }
// });

// // PUT requests/


// // DELETE requests/:id using name for now

userRouter.delete("/:name", async (req: Express.Request, res: Express.Response) => {
    try {
        let id: string = req.params.id;
        await UserService.remove(id);

        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
}); 

userRouter.post("/register", async (req: Express.Request, res: Express.Response) => {
    try {
        let firstName: string = req.body.firstName
        let email: string = req.body.email;
        let password: string = req.body.password;
        let phoneNumber: string = req.body.phoneNumber;
        let lastName: string = req.body.lastName;
        let personalPronouns: string = req.body.personalPronouns
        let userType: string = req.body.userType


        //Hash Password
        const hash = await bcrypt.hash(password, BCRYPT_ROUNDS)
        
        await UserService.create(firstName + " " + lastName, firstName, email, hash, phoneNumber, lastName, personalPronouns, userType).then(response => {
            res.status(200).send({
                "Data": response
            });
        });


    } catch (e) {
        res.status(404).send(e.message)
    }
});

userRouter.post('/login', async (req: Express.Request, res: Express.Response) => {
    try {
        let email: string = req.body.email;
        let password: string = req.body.password;

        const fetchUser = await UserService.getUserInfo(email)
        console.log(fetchUser.password)
        const valid = await bcrypt.compare(password, fetchUser.password)
        console.log("The comparison was:" + valid)

        if (valid) {
            res.status(200).send({
                "Status":"Authenticated"
            })
        } else {
            res.status(401).send({
                "Status":"Unauthenticated",
                "Message":"Incorrect Username or Password"
            }) 
        }


    } catch (e) {
        console.error(e)
    }
});

//Test UserRouter for Sanity Checks
userRouter.get("/hello_world", async (req: Express.Request, res: Express.Response) => {
    res.json({"message" : "hello World"});
});

userRouter


