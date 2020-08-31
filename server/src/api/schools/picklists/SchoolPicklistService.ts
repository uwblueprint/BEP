import { schoolObjectName } from '../SchoolService';
import { getPicklist } from '../../../util/SalesforcePicklistUtils';

export const getSchoolPicklist = async (picklistName: string): Promise<string[]> => {
    const picklist = await getPicklist(schoolObjectName, picklistName);
    if (!picklist) {
        throw new Error(`${picklistName} is not a valid picklist type.`);
    }
    return picklist;
};
