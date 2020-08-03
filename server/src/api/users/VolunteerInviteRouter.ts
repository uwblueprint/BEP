import * as Express from "express";
import * as VolunteerInviteService from "./VolunteerInviteService";

export const inviteRouter = Express.Router();

inviteRouter.get("/:id", async (req: Express.Request, res: Express.Response) => {
    const id: string = req.params.id;
    try {
        const fetchedInvite = await VolunteerInviteService.getInvite(id);
        res.status(200).send(fetchedInvite);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

inviteRouter.post("/create", async (req: Express.Request, res: Express.Response) => {
    try {
        let opportunityName: string = req.body.opportunityName;
        let volunteerName: string = req.body.volunteerName;
        let inviterName: string = req.body.inviterName;
        let inviteStatus: string = req.body.inviteStatus;
        await VolunteerInviteService.create(opportunityName, volunteerName, inviterName, inviteStatus);
        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

inviteRouter.delete('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        let id: string = req.params.id;
        await VolunteerInviteService.remove(id);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

inviteRouter.put('/:accept', async (req: Express.Request, res: Express.Response) => {
    try {
        let id: string = req.params.id;
        await VolunteerInviteService.accept(id);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

inviteRouter.put('/:decline', async (req: Express.Request, res: Express.Response) => {
    try {
        let id: string = req.params.id;
        await VolunteerInviteService.decline(id);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
