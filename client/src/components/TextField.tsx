import React from "react";
import TextField, { InputProps } from "@material-ui/core/Input";

const MaterialTextField: React.FunctionComponent<InputProps> = (props) => (
  <TextField {...props}>{props.children}</TextField>
);

export default MaterialTextField;
