import React from "react";
import MaterialButton, { ButtonProps } from "@material-ui/core/Button";

const Button: React.FunctionComponent<ButtonProps> = (props) => (
    <MaterialButton {...props}>{props.children}</MaterialButton>
);

export default Button;
