import { MuiPickersToolbar } from '@material-ui/pickers/src/typings/overrides';
import { PickerToolbarStyles } from '../Toolbar';


type Classes<T> = T extends string: never;

declare module '@material-ui/core/styles/overrides' {
    export interface MuiPickersComponentsToClassName extends MuiPickersToolbar {
        MuiPickersToolbar: Classes<typeof PickerToolbarStyles>;
    }
}