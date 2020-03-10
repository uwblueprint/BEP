
// /**
//  * Data Model Interfaces
//  */

// import jsforce, { Connection } from 'jsforce';
// import User from '../models/UserInterface';

// /**
//  * OAuth Token verification
//  */

//  //Verify session here 

// const conn: Connection = 

// /**
//  * Static variables 
//  */

// const siteUser: string = "SiteUser__c";

// /**
//  * Service Methods
//  */

//  export const create = async(newUser: User): Promise<void> => {
//      // Query for creating a user
    
//     conn.sobject(siteUser).create(
//         Name: newUser.lastName,
//     );
//  }

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

