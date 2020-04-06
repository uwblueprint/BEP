
/**
 * Data Model Interfaces
 */

import User from './UserInterface';
import { conn } from '../server';
import * as express from 'express';


const siteUser: string = "SiteUser__c";

/**
 * Service Methods
 */



 // Basic query for now to retrieve a user based on first name
export const getUserInfo = async (id: string): Promise<User> => {
    let userInfo: User = conn.sobject(siteUser).find({
        Name: id
    }, "Name, lastName__c, email__c, phoneNumber__c, password__c") 
        .limit(1)
        .execute(function(err: Error, record: any) {
            if (err) {
                return console.error(err);
            }
            let user: User = {
                firstName: record[0].Name,
                lastName: record[0].lastName__c,
                email: record[0].email__c,
                phoneNumber: record[0].phoneNumber__c,
                password: record[0].password__c
            }
            return user;
        });
        console.log(userInfo);
    return userInfo;
};

// create new user object in salesforce with fields 
// Currently fields do not populate unless hard coded strings are passed into the .create() method, not sure if postman issue or something else
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
        console.log("created User with ID : " + result.id + result.Name);
    })
};

// export const update = async (updatedUser: User): Promise<void> => {
//     const updatedUser

//     throw new Error("No record found to update");
// };

// Delete a user by ID (salesforce generated)
export const remove = async (id: string): Promise<void> => {
    conn.sobject(siteUser).destroy(id, function(err: Error, result) {
        if (err || !result.success) {
            return console.error(err, result);
        }
        console.log('Deleted Successfully: ' + result.id)
    })
}; 
