import React from "react";
import TextField from "@material-ui/core/TextField";

const MaterialTextField: React.FunctionComponent<any> = (props) => (
  <TextField {...props}>{props.children}</TextField>
);

export default MaterialTextField;
