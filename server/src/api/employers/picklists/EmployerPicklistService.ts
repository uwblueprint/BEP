import { employerObjectName } from '../EmployerService';
import { getPicklist } from '../../../util/SalesforcePicklistUtils';

export const getEmployerPicklist = async (picklistName: string): Promise<string[]> => {
    const picklist = await getPicklist(employerObjectName, picklistName);
    if (!picklist) {
        throw new Error(`${picklistName} is not a valid picklist type.`);
    }
    return picklist;
};
