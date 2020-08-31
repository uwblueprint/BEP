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

// GET users/:name

userPicklistRouter.get('/:name', async (req: Express.Request, res: Express.Response) => {
    const picklistName: string = req.params.name;
    try {
        const picklist: string[] = await UserPicklistService.getPicklist(picklistName);
        res.status(200).send(picklist);
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

userPicklistRouter.get('/opportunity/:name', async (req: Express.Request, res: Express.Response) => {
    console.log("Hit the opt picklist endpoint!")
    const picklistName: string = req.params.name;
    try {
        const picklist: string[] = await UserPicklistService.getOpportunityPicklist(picklistName + '__c');
        res.status(200).send(picklist);
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});
