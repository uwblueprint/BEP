
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

export const findAll = async (): Promise<Request[]> => {
    var requestArray = new Array<Request>();
    const query = await conn.query('SELECT Name, Id, Status__c, acceptedBy__c, OpenedBy__c FROM Request__c', function(err, request) {
        if (err) { return console.error(err); }
        request.records.forEach(element => {
            let r = {ID: element.Id, name: element.Name, status: element.Status__c, openedBy: element.OpenedBy__c}
            requestArray.push(r)

        });
        return requestArray;
    });
    return requestArray;
};

export const find = async (name: string): Promise<Request> => {

    const query = await conn.sobject("Request__c").retrieve(id, function(err, request) {
        if (err) { return console.error(err); }
        console.log("Name : " + request.Name);
        // ...
    });
    
};

// WIP: requests currently do not work with non-hard coded values. Need to figure this out.
export const create = async (newRequest: Request): Promise<void> => {
   const query = await conn.sobject("Request").create({
        Name: newRequest.name,
        ID__c: newRequest.id,
        OpenedBy__c: newRequest.openedBy,
        Status__c: newRequest.status

    }, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log("Created record id : " + ret.id);
        
    });
};

export const update = async (updatedRequest: Request): Promise<void> => {
    const query = await conn.sobject(request).update({
        // currently only updates name and status
        Name__c: updatedRequest.name,
        Status__c: updatedRequest.status
    }, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log('Updated Successfully : ' + ret.id);
        // ...
    });
};


export const remove = async (name: string): Promise<void> => {
    conn.sobject(request).find({
        Name: name
    }).destroy(function (err: Error, result) {
        if (err) {
            return console.log(err);
        }
        console.log(result);
        console.log('Deleted User with ID: ' + result[0].id);
    })
}; 
