
/**
 * Data Model Interfaces
 */

import jsforce from 'jsforce';
import User from './UserInterface';
import { conn } from '../server';
import * as express from 'express';


const siteUser: string = "SiteUser__c";

/**
 * Service Methods
 */



 // Basic query for now to retrieve ALL users
export const getUserInfo = async (id: number): Promise<void> => {
    conn.query('SELECT Name FROM SiteUser__c', function(err: Error, result) {
        if (err){
            return console.log(err)
        }
        console.log(result);
        
    })
};

//create new user object in salesforce with fields
export const create = async (name: string, email: string, password: string, phoneNumber: string, lastName: string): Promise<void> => {
    conn.sobject(siteUser).create({ 
        Name: name,
        email__c: email,
        password__c: password,
        phoneNumber__c: phoneNumber,
        lastName__c: lastName
    }, 
    function(err: Error, result) {
        if (err || !result.success) { 
            return console.error(err, result); 
        }
        console.log("created User with ID : " + result.id);
    })
};

// export const update = async (updatedUser: User): Promise<void> => {
//     const updatedUser

//     throw new Error("No record found to update");
// };

// export const remove = async (id: number): Promise<void> => {
//     conn.
//     throw new Error("No record found to delete");
// }; 
