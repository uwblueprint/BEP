/**
 * Data Model Interfaces
 */

import { conn } from '../../server';
import Email from './EmailInterface';

const emailObjectName: string = 'Email__c';
const emailFields: string = 'EmailContent__c, Name, IsActive__c, Subject__c';

// Map fields of employer model to Salesforce fields.
const emailModelToSalesforceEmail = (email: Email): any => {
    const salesforceEmail: any = {
        EmailContent__c: email.content,
        IsActive__c: email.isActive,
        Name: email.name,
        Subject__c: email.subject
    };

    return salesforceEmail;
};

// Map Saleforce record fields to employer model fields.
const salesforceEmailToEmailModel = (record: any): Email => {
    const email: Email = {
        content: record.EmailContent__c,
        isActive: record.IsActive__c,
        name: record.Name,
        subject: record.Subject__c
    };

    return email;
};

/**
 * Service Methods
 */

/**
 * See https://jsforce.github.io/document/ under Query and CRUD for documentation
 */

// Retrieve employer by ID.
export const get = async (id: string): Promise<Email> => {
    const employer: Email = conn
        .sobject(employerObjectName)
        .find(
            {
                Id: id
            },
            emailFields
        )
        .limit(1)
        .execute((err: Error, record: any) => {
            if (err) {
                return console.error(err);
            }
            return salesforceEmailToEmailModel(record[0]);
        });

    return employer;
};

// Update employer by ID.
export const update = async (employer: Email): Promise<Email> => {
    const updatedEmployer: Email = conn
        .sobject(emailObjectName)
        .update(emailModelToSalesforceEmail(employer), (err: Error, result: any) => {
            if (err || !result.success) {
                return console.error(err, result);
            }
        });

    return updatedEmployer;
};

// Create new employer and return ID.
export const create = async (employer: Email): Promise<string> => {
    const emailInfo: { id: string; success: boolean; errors: Error[] } = await conn
        .sobject(emailObjectName)
        .create(emailModelToSalesforceEmail(employer), (err: Error, result: any) => {
            if (err || !result.success) {
                return console.error(err, result);
            }
        });

    return emailInfo.id;
};
