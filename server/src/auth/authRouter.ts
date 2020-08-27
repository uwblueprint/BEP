import * as bcrypt from 'bcrypt';
import * as Express from 'express';
import * as jwt from 'jsonwebtoken';
import UserInterface, { UserType } from './../api/users/UserInterface';
import * as UserService from './../api/users/UserService';

const BCRYPT_ROUNDS = 4;

/**
 * Router Definition
 */

export const authRouter = Express.Router();

/**
 * Controller Definitions
 */

authRouter.post('/register', async (req: Express.Request, res: Express.Response) => {
    try {
        const firstName: string = req.body.firstName;
        const email: string = req.body.email;
        const followedPrograms: string[] = req.body.followedPrograms;
        const isSubscribed: boolean = req.body.isSubscribed;
        const password: string = req.body.password;
        const phoneNumber: string = req.body.phoneNumber;
        const lastName: string = req.body.lastName;
        const preferredPronouns: string = req.body.preferredPronouns;
        const userType: UserType = req.body.userType;

        //Hash Password
        const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);

        const user: UserInterface = {
            email,
            firstName,
            followedPrograms,
            isSubscribed,
            lastName,
            password: hash,
            phoneNumber,
            preferredPronouns,
            userType
        };

        await UserService.create(user).then(response => {
            // tslint:disable-next-line: no-string-literal
            if (response['success']) {
                const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: 5000 });
                res.status(200).send({
                    data: response,
                    token
                });
            }
        });
    } catch (e) {
        res.status(404).send(e.message);
    }
});

authRouter.post('/login', async (req: Express.Request, res: Express.Response) => {
    try {
        const email: string = req.body.email;
        const password: string = req.body.password;

        const fetchUser = await UserService.getUser(email);
        let valid = false;
        if (fetchUser !== undefined) {
            valid = await bcrypt.compare(password, fetchUser.password);
        }

        if (valid) {
            const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: 5000 });
            delete fetchUser.password;
            res.status(200).send({
                Status: 'Authenticated',
                token,
                user: fetchUser
            });
        } else {
            res.status(401).send({
                Message: 'Incorrect Username or Password',
                Status: 'Unauthenticated'
            });
        }
    } catch (e) {
        console.error(e);
    }
});
