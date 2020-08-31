import { conn } from '../server';

// Converts between Salesforce picklist (string of object delimited by semicolons) and arrays.
const arrayToPicklistString = (arr: Array<string>): string => {
    return arr.reduce((acc, item) => acc + item + ';', '').replace(/;$/, '')}; // Remove trailing semicolon.
const picklistStringToArray = (str: string): Array<string> => (str ? str.split(';') : []);

const getGlobalPicklist = async (picklistName: string): Promise<Array<string> | null> => {
    let picklist: Array<string> = null;

    await conn.metadata.read('GlobalValueSet', [picklistName], (err, res) => {
        if (err) {
            return console.error(err);
        }
        if (res.customValue) {
            picklist = res.customValue.map(value => value.label);
        }
    });
    return picklist;
};

const getPicklist = async (objectName: string, picklistName: string): Promise<Array<string> | null> => {
    let picklist: Array<string> = null;
    await conn.metadata
        .read('CustomObject', [objectName], (err, res) => {
            if (err) {
                return console.error(err);
            }
        })
        .then(res => {
            return Promise.all(
                res.fields.map(
                    async (field): Promise<Array<string>> => {
                        if (field.fullName === picklistName + '__c') {
                            return field.valueSet.valueSetDefinition
                                ? field.valueSet.valueSetDefinition.value.map(picklistEntry => picklistEntry.label)
                                : await getGlobalPicklist(field.valueSet.valueSetName);
                        }
                        return [];
                    }
                )
            );
        })
        .then((res: Array<Array<string>>) => {
            res.forEach((picklistValues: Array<string>) => {
                if (picklistValues.length !== 0) {
                    picklist = picklistValues;
                }
            });
        });

    if (!picklist) {
        picklist = await getGlobalPicklist(picklistName);
    }

    return picklist;
};

export { arrayToPicklistString, getGlobalPicklist, getPicklist, picklistStringToArray };
