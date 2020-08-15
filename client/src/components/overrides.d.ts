import { Overrides } from '@material-ui/core/styles/overrides';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';

type overridesNameToClassKey = {
    [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module '@material-ui/core/styles/overrides' {
    export interface ComponentNameToClassKey extends overridesNameToClassKey { }
}
// import { MuiPickersComponentsToClassName } from '@material-ui/pickers/src/typings/overrides';

// declare module '@material-ui/core/styles/overrides' {
//     export interface ComponentNameToClassKey extends MuiPickersComponentsToClassName { }
// }
// import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';

// type overridesNameToClassKey = {
//     [P in keyof Required<MuiPickersOverrides>]: keyof MuiPickersOverrides[P];
// };

// type CustomType = {
//     MuiPickersToolbar: {
//         toolbar: { backgroundColor: '#fff' }
//     }
// };

// declare module '@material-ui/core/styles/overrides' {
//     interface ComponentNameToClassKey extends overridesNameToClassKey { }
//     export interface ComponentNameToClassKey extends CustomType { }
// }