import * as bcrypt from 'bcrypt';
import * as Express from 'express';
import * as jwt from 'jsonwebtoken';

import * as UserService from './../api/users/UserService';
import SchoolInterface from '../api/schools/SchoolInterface';
import { UserType } from '../api/users/UserInterface';
import EducatorInterface from '../api/users/EducatorInterface';

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
        const email: string = req.body.email;
        const firstName: string = req.body.firstName;
        const isSubscribed: boolean = req.body.isSubscribed;
        const password: string = req.body.password;
        const phoneNumber: string = req.body.phoneNumber;
        const lastName: string = req.body.lastName;
        const preferredPronouns: string = req.body.preferredPronouns;
        const userType: UserType = req.body.userType;
        const position: string = req.body.position;
        const school: SchoolInterface = req.body.school;
        const moreInfo: string[] = req.body.moreInfo;
        const introductionMethod: string = req.body.introductionMethod;
        const educatorDesiredActivities: string[] = req.body.educatorDesiredActivities;

        // Hash Password
        const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);

        const user: EducatorInterface = {
            educatorDesiredActivities,
            email,
            firstName,
            introductionMethod,
            isSubscribed,
            lastName,
            moreInfo,
            password: hash,
            phoneNumber,
            position,
            preferredPronouns,
            school,
            userType
        };

        await UserService.create(user).then(response => {
            try {
                if (response['success']) {
                    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: 5000 });
                    res.status(200).send({
                        data: response,
                        token
                    });
                }
            } catch (e) {
                res.send(e.message);
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
