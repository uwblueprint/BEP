import { conn } from '../../../server';

const siteUser: string = 'SiteUser__c';

export const getGlobalPicklist = async (picklistName: string): Promise<string[]> => {
    let picklist: string[] = [];

    await conn.metadata.read('GlobalValueSet', [picklistName], function(err, res) {
        if (err) return console.error(err);
        picklist = res.customValue ? res.customValue.map(value => value.label) : [];
    });
    return picklist;
};

export const getPicklist = async (picklistName: string): Promise<string[]> => {
    let picklist: string[] = [];
    const picklistFields: string[] = [
        'coopPlacementMode__c',
        'coopPlacementTime__c',
        'educatorDesiredActivities__c',
        'expertiseAreas__c',
        'followedPrograms__c',
        'grades__c',
        'introductionMethod__c',
        'languages__c',
        'localPostSecondaryInstitutions__c',
        'locations__c',
        'postSecondaryTraining__c',
        'professionalAssociations__c',
        'volunteerDesiredExternalActivities__c',
        'volunteerDesiredInternalActivities__c'
    ];

    const globalPicklists: string[] = [
        'desiredExternalActivities__c',
        'desiredInternalActivities__c',
        'allActivities__c'
    ];

    if (picklistFields.includes(picklistName)) {
        await conn.metadata
            .read('CustomObject', [siteUser], async function(err, res) {
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
    } else if (globalPicklists.includes(picklistName)) {
        picklist = await getGlobalPicklist(picklistName.replace(/__c$/, ''));
    } else {
        throw new Error(`${picklistName} is not a valid picklistType.`);
    }

    return picklist;
};
