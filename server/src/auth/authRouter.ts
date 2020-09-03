import * as bcrypt from 'bcrypt';
import * as Express from 'express';
import * as jwt from 'jsonwebtoken';

import * as UserService from './../api/users/UserService';
import SchoolInterface from '../api/schools/SchoolInterface';
import User, { UserType, isUser } from '../api/users/UserInterface';
import Educator, { isEducator } from '../api/users/EducatorInterface';
import Volunteer, { isVolunteer } from '../api/users/VolunteerInterface';

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
        const user: User = req.body;

        if (!isUser(user) || (!isVolunteer(user) && !isEducator(user))) {
            throw Error('Input is not a valid user.');
        }

        // Hash Password
        const hash = await bcrypt.hash(user.password, BCRYPT_ROUNDS);
        user.password = hash;

        await UserService.create(user).then(response => {
            try {
                // const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: 5000 });
                res.status(200).send({
                    data: response
                    // token
                });
            } catch (e) {
                res.status(500).send(e.message);
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

        const fetchUser = await UserService.getUser({ email });
        let valid = false;
        if (fetchUser != undefined) {
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
