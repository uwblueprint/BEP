/**
 * Required External Modules and Interfaces
 */

import * as Express from "express";
import * as ApplicationService from "./VolunteerAppService";

/**
 * Router Definition
 */

export const applicationRouter = Express.Router();

/**
 * Controller Definitions
 */

// GET requests/:id currently using the applicationId field

applicationRouter.get("/:id", async (req: Express.Request, res: Express.Response) => {
    // const id: number = parseInt(req.params.id, 10);
    const id: string = req.params.id;

    try {
        const fetchedApplication = await ApplicationService.get(id);

        res.status(200).send(fetchedApplication);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST requests/

applicationRouter.post("/", async (req: Express.Request, res: Express.Response) => {
    try {
        const id = await ApplicationService.create(req.body);
        res.status(201).send({ id });
    } catch (e) {
        res.status(404).send(e.message);
    }
});

//PUT requests

applicationRouter.put('/:id', async (req: Express.Request, res: Express.Response) => {
    try {
        await ApplicationService.update(req.body);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// applicationRouter.put('/:decline', async (req: Express.Request, res: Express.Response) => {
//     console.log('HERE');
//     try {
//         console.log(req.body);
//         const id: string = req.params.id;
//         await ApplicationService.decline(id, req.body);

//         res.sendStatus(200);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });

// applicationRouter.put('/:withdraw', async (req: Express.Request, res: Express.Response) => {
//     console.log('HERE');
//     try {
//         console.log(req.body);
//         const id: string = req.params.id;
//         await ApplicationService.withdraw(id, req.body);

//         res.sendStatus(200);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });


// DELETE requests (not needed because withdrawing is done through update)
// applicationRouter.delete('/:name', async (req: Express.Request, res: Express.Response) => {
//     try {
//         let id: string = req.params.id;
//         await ApplicationService.remove(id)

//         res.sendStatus(200);
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// });