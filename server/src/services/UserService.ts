
/**
 * Data Model Interfaces
 */

import jsforce from 'jsforce';
import User from '../models/UserInterface';

/**
 * OAuth Token verification
 */

 //Verify session here 
 const oauth2 = new jsforce.OAuth2({
    loginUrl: process.env.LOGIN_URL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:3030/token'
});

var conn = new jsforce.Connection({ oauth2 : oauth2 });


/**
 * Static variables 
 */

const siteUser: string = "SiteUser__c";

/**
 * Service Methods
 */


    export const create = async(newUser: string): Promise<void> => {
     // Query for creating a user
    
    conn.sobject(siteUser).create({
        Name: newUser

    }), function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log("Created record id : " + ret.id);
        
 }

//  export const findByid = async(userId: number): Promise<User> => {
//      // Query for finding a User by Id
//     const foundUser: User = conn.sobject(siteUser).findOne("");
//     return foundUser;
//  }

//  export const changeStatus = async(userId: number): Promise(User) => {
//      // change a user's status
//     let foundUser: User = findByid(userId);
//     //setUserStatus(1)

//  }
 }
