import React from "react";
import MaterialSelect, { SelectProps } from "@material-ui/core/Select";

const Button: React.FunctionComponent<SelectProps> = (props) => (
  <MaterialSelect {...props}>{props.children}</MaterialSelect>
);

export default Button;