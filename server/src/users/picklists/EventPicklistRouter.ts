import * as EventPicklistService from './EventPicklistService';
import * as Express from 'express';

export const eventPicklistRouter = Express.Router();

eventPicklistRouter.get('/:name', async (req: Express.Request, res: Express.Response) => {
    console.log("Hit the opt picklist endpoint!")
    const picklistName: string = req.params.name;
    try {
        const picklist: string[] = await EventPicklistService.getOpportunityPicklist(picklistName + '__c');
        res.status(200).send(picklist);
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }
});

