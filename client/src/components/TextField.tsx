import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const outlinedTextFieldStyle = (theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
    },
  });

const MaterialTextField: React.FunctionComponent<any> = (props) => (
  <TextField {...props}>{props.children}</TextField>
);

const OutlinedTextField = withStyles(outlinedTextFieldStyle)((props: any) => (
  <TextField className={props.classes.root} variant="outlined" {...props}>
    {props.children}
  </TextField>
));

export default MaterialTextField;
export { OutlinedTextField };
