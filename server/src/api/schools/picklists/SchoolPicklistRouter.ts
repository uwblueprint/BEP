/**
 * Required External Modules and Interfaces
 */

import * as SchoolPicklistService from './SchoolPicklistService';
import * as Express from 'express';

/**
 * Router Definition
 */

export const schoolPicklistRouter = Express.Router();

/**
 * Controller Definitions
 */

// GET schools/:name

schoolPicklistRouter.get('/:name', async (req: Express.Request, res: Express.Response) => {
    const picklistName: string = req.params.name;
    try {
        const picklist: string[] = await SchoolPicklistService.getSchoolPicklist(picklistName);
        res.status(200).send(picklist);
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});
