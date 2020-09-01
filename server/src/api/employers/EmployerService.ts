/**
 * Data Model Interfaces
 */

import { conn } from '../../server';
import Employer, { isEmployer } from './EmployerInterface';
import { arrayToPicklistString, picklistStringToArray } from '../../util/SalesforcePicklistUtils';

export const employerObjectName: string = 'Employer__c';
const employerFields: string =
    'Name, address__c, city__c, phoneNumber__c, postalCode__c, sectors__c, size__c, ' +
    'socialMedia__c, website__c, Id';

// Map fields of employer model to Salesforce fields.
const employerModelToSalesforceEmployer = (employer: Employer): any => {
    const salesforceEmployer: any = {
        address__c: employer.address,
        city__c: employer.city,
        Id: employer.id,
        Name: employer.name,
        phoneNumber__c: employer.phoneNumber,
        postalCode__c: employer.postalCode,
        sectors__c: arrayToPicklistString(employer.sectors),
        size__c: employer.size,
        socialMedia__c: arrayToPicklistString(employer.socialMedia),
        website__c: employer.website
    };

    return salesforceEmployer;
};

// Map Saleforce record fields to employer model fields.
const salesforceEmployerToEmployerModel = (record: any): Employer => {
    const employer: Employer = {
        address: record.address__c,
        city: record.city__c,
        id: record.Id,
        name: record.Name,
        phoneNumber: record.phoneNumber__c,
        postalCode: record.postalCode__c,
        sectors: picklistStringToArray(record.sectors__c),
        size: record.size__c,
        socialMedia: picklistStringToArray(record.socialMedia__c),
        website: record.website__c
    };

    return employer;
};

/**
 * Service Methods
 */

/**
 * See https://jsforce.github.io/document/ under Query and CRUD for documentation
 */

// Retrieve employer by ID.
export const get = async (id: string): Promise<Employer> => {
    const employer: Employer = conn
        .sobject(employerObjectName)
        .find(
            {
                Id: id
            },
            employerFields
        )
        .limit(1)
        .execute((err: Error, record: any) => {
            if (err) {
                return console.error(err);
            }
            return salesforceEmployerToEmployerModel(record[0]);
        });

    return employer;
};

// Update employer by ID.
export const update = async (employer: Employer): Promise<Employer> => {
    if (!isEmployer(employer)) {
        throw Error('Input is not a valid employer.');
    }

    const res = conn
        .sobject(employerObjectName)
        .update(employerModelToSalesforceEmployer(employer), (err: Error, result: any) => {
            if (err || !result.success) {
                return console.error(err, result);
            }
        });

    return res;
};

// Create new employer and return ID.
export const create = async (employer: Employer): Promise<string> => {
    const employerInfo: { id: string; success: boolean; errors: Error[] } = await conn
        .sobject(employerObjectName)
        .create(employerModelToSalesforceEmployer(employer), (err: Error, result: any) => {
            if (err || !result.success) {
                return console.error(err, result);
            }
        });

    return employerInfo.id;
};

// Delete a employer by ID.
export const remove = async (id: string): Promise<void> => {
    return conn
        .sobject(employerObjectName)
        .find({
            Id: id
        })
        .destroy((err: Error) => {
            if (err) {
                return console.error(err);
            }
        });
};
