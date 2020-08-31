import * as EmployerPicklistService from './EmployerPicklistService';
import * as Express from 'express';

/**
 * Router Definition
 */

export const employerPicklistRouter = Express.Router();

/**
 * Controller Definitions
 */

// GET schools/:name

employerPicklistRouter.get('/:name', async (req: Express.Request, res: Express.Response) => {
    const picklistName: string = req.params.name;
    try {
        const picklist: string[] = await EmployerPicklistService.getEmployerPicklist(picklistName);
        res.status(200).send(picklist);
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});