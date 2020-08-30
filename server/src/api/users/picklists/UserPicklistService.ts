import { siteUser } from '../UserService';
import { getPicklist } from '../../../util/SalesforcePicklistUtils';

export const getUserPicklist = async (picklistName: string): Promise<string[]> => {
    const picklist = await getPicklist(siteUser, picklistName);
    if (!picklist) {
        throw new Error(`${picklistName} is not a valid picklist type.`);
    }
    return picklist;
};
