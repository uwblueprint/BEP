/**
 * Data Model Interfaces
 */

import { conn } from '../../server';
import Email from './EmailInterface';

const emailObjectName: string = 'Email__c';
const emailFields: string = 'emailContent__c, Name, isActive__c, subject__c';

// Map fields of email model to Salesforce fields.
const emailModelToSalesforceEmail = (email: Email): any => {
    const salesforceEmail: any = {
        emailContent__c: email.content,
        isActive__c: email.isActive,
        Name: email.name,
        subject__c: email.subject
    };

    return salesforceEmail;
};

// Map Saleforce record fields to email model fields.
const salesforceEmailToEmailModel = (record: any): Email => {
    const email: Email = {
        content: record.emailContent__c,
        isActive: record.isActive__c,
        name: record.Name,
        subject: record.subject__c
    };

    return email;
};

/**
 * Service Methods
 */

/**
 * See https://jsforce.github.io/document/ under Query and CRUD for documentation
 */

// Retrieve email by ID.
export const get = async (id: string): Promise<Email> => {
    const email: Email = conn
        .sobject(emailObjectName)
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
            if (record.length === 0) {
                throw Error(`No email with ID ${id} found.`);
            }
            return salesforceEmailToEmailModel(record[0]);
        });

    return email;
};

export const getAll = async (): Promise<Array<Email>> => {
    let emails: Array<Email> = [];
    let emailPromises: Array<Promise<Email>> = [];
    await conn.query(`SELECT ${emailFields} FROM ${emailObjectName}`, (err, result) => {
        if (err) {
            return console.error(err);
        }
        emailPromises = result.records.map(record => salesforceEmailToEmailModel(record));
    });

    await Promise.all(emailPromises).then(resolvedEmails => {
        emails = resolvedEmails;
    });

    return emails;
};

// Update email by ID.
export const update = async (email: Email): Promise<void> => {
    await conn.sobject(emailObjectName).update(emailModelToSalesforceEmail(email), (err: Error, result: any) => {
        if (err || !result.success) {
            return console.error(err, result);
        }
    });
};

// Create new email and return ID.
export const create = async (email: Email): Promise<string> => {
    const emailInfo: { id: string; success: boolean; errors: Error[] } = await conn
        .sobject(emailObjectName)
        .create(emailModelToSalesforceEmail(email), (err: Error, result: any) => {
            if (err || !result.success) {
                return console.error(err, result);
            }
        });

    return emailInfo.id;
};
