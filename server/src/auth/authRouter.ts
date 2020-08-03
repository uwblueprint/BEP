import * as jwt from "jsonwebtoken";
import * as Express from "express";
import * as UserService from "./../api/users/UserService";
import * as bcrypt from "bcrypt";
import UserInterface, { UserType } from "./../api/users/UserInterface";

const BCRYPT_ROUNDS = 4

/**
 * Router Definition
 */

export const authRouter = Express.Router()

/**
 * Controller Definitions
 */

authRouter.post("/register", async (req: Express.Request, res: Express.Response) => {
    try {
        let firstName: string = req.body.firstName
        let email: string = req.body.email;
        let followedPrograms: string[] = req.body.followedPrograms;
        let isSubscribed: boolean = req.body.isSubscribed;
        let password: string = req.body.password;
        let phoneNumber: string = req.body.phoneNumber;
        let lastName: string = req.body.lastName;
        let preferredPronouns: string = req.body.preferredPronouns;
        let userType: UserType = req.body.userType;


        //Hash Password
        const hash = await bcrypt.hash(password, BCRYPT_ROUNDS)

        let user: UserInterface = {
            firstName: firstName,
            email: email,
            followedPrograms: followedPrograms,
            isSubscribed: isSubscribed,
            lastName: lastName,
            password: hash,
            phoneNumber: phoneNumber,
            preferredPronouns: preferredPronouns,
            userType: userType
        }
        
        await UserService.create(user).then(response => {

            if (response["success"] == true) {
                let token = jwt.sign({email: email}, process.env.SECRET_KEY, {expiresIn: 500});
                res.status(200).send({
                    "data": response,
                    "token": token
                });

            }
        });


    } catch (e) {
        res.status(404).send(e.message)
    }
});

authRouter.post('/login', async (req: Express.Request, res: Express.Response) => {
    try {
        let email: string = req.body.email;
        let password: string = req.body.password;

        const fetchUser = await UserService.getUser(email)
        let valid = false
        if (fetchUser != undefined) {
            valid = await bcrypt.compare(password, fetchUser.password)
            console.log("The comparison was:" + valid)
        }

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