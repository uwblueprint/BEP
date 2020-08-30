/**
 * Data Model Interfaces
 */

import { conn } from '../../server';
import School, { isSchool } from './SchoolInterface';

export const schoolObjectName: string = 'School__c';
const schoolFields: string =
    'abbreviatedName__c, email__c, Id, city__c, name__c, phoneNumber__c, postalCode__c, province__c, schoolBoard__c, address__c, type__c';

// Map fields of school model to Salesforce fields.
const schoolModelToSalesforceSchool = (school: School): any => {
    const salesforceSchool: any = {
        abbreviatedName__c: school.abbreviatedName,
        email__c: school.email,
        ...(school.email && { email__c: school.email }),
        ...(school.id && { Id: school.id }),
        city__c: school.city,
        Name: school.name,
        name__c: school.name,
        phoneNumber__c: school.phoneNumber,
        postalCode__c: school.postalCode,
        province__c: school.province,
        schoolBoard__c: school.schoolBoard,
        address__c: school.address,
        type__c: school.type
    };

    return salesforceSchool;
};

// Map Saleforce record fields to school model fields.
const salesforceSchoolToSchoolModel = (record: any): School => {
    const school: School = {
        abbreviatedName: record.abbreviatedName__c,
        ...(record.email__c && { email: record.email__c }),
        id: record.Id,
        city: record.city__c,
        name: record.name__c,
        phoneNumber: record.phoneNumber__c,
        postalCode: record.postalCode__c,
        province: record.province__c,
        schoolBoard: record.schoolBoard__c,
        address: record.address__c,
        type: record.type__c
    };

    return school;
};

/**
 * Service Methods
 */

/**
 * See https://jsforce.github.io/document/ under Query and CRUD for documentation
 */

// Retrieve school by ID.
export const get = async (id: string): Promise<School> => {
    const school: School = conn
        .sobject(schoolObjectName)
        .find(
            {
                Id: id
            },
            schoolFields
        )
        .limit(1)
        .execute((err: Error, record: any) => {
            if (err) {
                return console.error(err);
            }
            return salesforceSchoolToSchoolModel(record[0]);
        });

    return school;
};

export const getAll = async (): Promise<School[]> => {
    let schools: Array<School> = [];

    await conn.query(`SELECT ${schoolFields} FROM ${schoolObjectName}`, (err, result) => {
        if (err) {
            return console.error(err);
        }
        schools = result.records.map(record => salesforceSchoolToSchoolModel(record));
    });

    return schools;
};

// Update school by ID.
export const update = async (school: School): Promise<School> => {
    if (!isSchool(school)) {
        throw Error('Input is not a valid school.');
    }

    const updatedSchool: School = conn
        .sobject(schoolObjectName)
        .update(schoolModelToSalesforceSchool(school), (err: Error, result: any) => {
            if (err || !result.success) {
                return console.error(err, result);
            }
        });

    return updatedSchool;
};

// Create new school and return ID.
export const create = async (school: School): Promise<string> => {
    const schoolInfo: { id: string; success: boolean; errors: Error[] } = await conn
        .sobject(schoolObjectName)
        .create(schoolModelToSalesforceSchool(school), (err: Error, result: any) => {
            if (err || !result.success) {
                return console.error(err, result);
            }
        });

    return schoolInfo.id;
};

// Delete a school by ID.
export const remove = async (id: string): Promise<void> => {
    return conn
        .sobject(schoolObjectName)
        .find({
            Id: id
        })
        .destroy((err: Error) => {
            if (err) {
                return console.error(err);
            }
        });
};
