
/**
 * Data Model Interfaces
 */

import jsforce from 'jsforce';
import User from './UserInterface';
import { conn } from '../server';


const siteUser: string = "SiteUser__c";

/**
 * Service Methods
 */


export const getUserInfo = async (id: number): Promise<User> => {
    const user: User = null; //Retrieve from SalesForce based on id (unsure because of him/her auth)

    if (user) {
        return user;
    }

    throw new Error("No record found");
};

// not sure if needed since him/her auth
export const create = async (newUser: User): Promise<void> => {

};

export const update = async (updatedUser: User): Promise<void> => {
    const updatedUser

    throw new Error("No record found to update");
};

export const remove = async (id: number): Promise<void> => {
    conn.
    throw new Error("No record found to delete");
}; 
