
/**
 * Data Model Interfaces
 */

import { Request } from "./request.interface";
import { Requests } from "./requests.interface";

/**
 * In-Memory Store - for LOCAL TESTING
 */

const requests: Requests = {
    1: {
        id: 1,
        name: "a"
    }, 
    2: {
        id: 2,
        name: "b"
    },
    3: {
        id: 3,
        name: "c"
    },
}
/**
 * Service Methods
 */

export const findAll = async (): Promise<Requests> => {
    return requests;
};

export const find = async (id: number): Promise<Request> => {
    const record: Request = requests[id];

    if (record) {
        return record;
    }

    throw new Error("No record found");
};

export const create = async (newRequest: Request): Promise<void> => {
    const id = new Date().valueOf();
    requests[id] = {
        ...newRequest,
        id
    };
};

export const update = async (updatedRequest: Request): Promise<void> => {
    if (requests[updatedRequest.id]) {
        requests[updatedRequest.id] = updatedRequest;
        return;
    }

    throw new Error("No record found to update");
};

export const remove = async (id: number): Promise<void> => {
    const record: Request = requests[id];

    if (record) {
        delete requests[id];
        return;
    }

    throw new Error("No record found to delete");
};