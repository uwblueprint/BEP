import { conn } from '../../../server';
import { getPicklist } from '../../../util/SalesforcePicklistUtils';

const siteUser: string = 'SiteUser__c';
const event: string = 'Event__c';

export const getGlobalPicklist = async (picklistName: string): Promise<string[]> => {
    let picklist: string[] = [];

    await conn.metadata.read('GlobalValueSet', [picklistName], function(err, res) {
        if (err) return console.error(err);

        picklist = res.customValue ? res.customValue.map(value => value.label) : [];
    });
    return picklist;
};

export const getUserPicklist = async (picklistName: string): Promise<string[]> => {
    const picklist = await getPicklist(siteUser, picklistName);
    if (!picklist) {
        throw new Error(`${picklistName} is not a valid picklist type.`);
    }
    return picklist;
};

export const getOpportunityPicklist = async (picklistName: string): Promise<string[]> => {
    let picklist: string[] = [];
    const picklistFields: string[] = ['activityType__c', 'preferredSector__c', 'gradeOfStudents__c'];
    if (!picklistFields.includes(picklistName)) throw new Error(`${picklistName} is not a valid picklistType.`);

    await conn.metadata
        .read('CustomObject', [event], async function(err, res) {
            if (err) return console.error(err);
        })
        .then(res => {
            return Promise.all(
                res.fields.map(
                    async (field): Promise<string[]> => {
                        if (field.fullName == picklistName) {
                            return field.valueSet.valueSetDefinition
                                ? field.valueSet.valueSetDefinition.value.map(picklistEntry => picklistEntry.label)
                                : await getGlobalPicklist(field.valueSet.valueSetName);
                        }
                        return [];
                    }
                )
            );
        })
        .then((res: string[][]) => {
            res.forEach((picklistValues: string[]) => {
                if (picklistValues.length !== 0) picklist = picklistValues;
            });
        });

    return picklist;
};
