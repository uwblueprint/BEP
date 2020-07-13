import { conn } from '../server';

const siteUser: string = 'SiteUser__c';

export const getPicklist = async (picklistType: string): Promise<string[]> => {
    let picklist: string[] = [];
    // const picklistFields: string[] = [
    //     'coopPlacementMode__c',
    //     'coopPlacementTime__c',
    //     'educatorDesiredActivities__c',
    //     'expertiseAreas__c',
    //     'followedPrograms__c',
    //     'grades__c',
    //     'introductionMethod__c',
    //     'languages__c',
    //     'localPostSecondaryInstitutions__c',
    //     'locations__c',
    //     'postSecondaryTraining__c',
    //     'professionalAssociations__c',
    //     'volunteerDesiredExternalActivities__c',
    //     'volunteerDesiredInternalActivities__c'
    // ];
    await conn.metadata.read('CustomObject', [siteUser], function(err, res) {
        if (err) {
            return console.error(err);
        }

        res.fields.forEach(field => {
            if (field.fullName == picklistType)
                picklist = field.valueSet.valueSetDefinition.value.map(picklistEntry => picklistEntry.label);
        });
    });
    return picklist;
};
