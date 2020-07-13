/**
 * Required External Modules and Interfaces
 */

import * as UserPicklistService from './UserPicklistService';
import * as Express from 'express';

/**
 * Router Definition
 */

export const userPicklistRouter = Express.Router();

/**
 * Controller Definitions
 */

// GET users/:type

userPicklistRouter.get('/:type', async (req: Express.Request, res: Express.Response) => {
    const picklistType: string = req.params.type;
    try {
        const picklist: string[] = await UserPicklistService.getPicklist(picklistType);
        res.status(200).send(picklist);
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});
