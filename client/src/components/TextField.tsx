import React from "react";
import MaterialTextField, { TextFieldProps } from "@material-ui/core/TextField"

const TextField: React.FunctionComponent<TextFieldProps> = (props) => (
    <MaterialTextField id="filled-basic" {...props}>{props.children}</MaterialTextField>
);

export default TextField