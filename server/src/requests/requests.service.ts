
/**
 * Data Model Interfaces
 */

import { Request } from "./request.interface";
import { Requests } from "./requests.interface";
import { conn } from "./../server";
import jsforce from 'jsforce';

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
 * OAuth Token verification
 */

//  //Verify session here 
//  const oauth2 = new jsforce.OAuth2({
//     loginUrl: process.env.LOGIN_URL,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     redirectUri: 'http://localhost:3030/token'
// });

// var conn = new jsforce.Connection({ oauth2 : oauth2 });


/**
 * Static variables 
 */

const request: string = "Request__c";


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
    // const id = new Date().valueOf();
    // requests[id] = {
    //     ...newRequest,
    //     id
    // };

    // Query for creating a request
   
   conn.sobject("Request").create({
        Name:"Hi", // newRequest.name,
        ID__c: "02",// newRequest.id,
        // OpenedBy__c: newRequest.openedBy,
        Status__c: "pending"//newRequest.status

    }, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log("Created record id : " + ret.id);
        
    });
};

export const update = async (updatedRequest: Request): Promise<void> => {
    // if (requests[updatedRequest.id]) {
    //     requests[updatedRequest.id] = updatedRequest;
    //     return;
    // }

    // throw new Error("No record found to update");

    // Single record update
    conn.sobject(request).update({ 
        Id : '0017000000hOMChAAO',
        Name : 'Updated Account #1'
    }, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log('Updated Successfully : ' + ret.id);
        // ...
    });
};

export const remove = async (id: number): Promise<void> => {
    const record: Request = requests[id];

    if (record) {
        delete requests[id];
        return;
    }

    throw new Error("No record found to delete");
};