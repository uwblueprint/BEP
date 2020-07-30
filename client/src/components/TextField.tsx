import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const outlinedTextFieldStyle = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.light,
    },
  });

const MaterialTextField: React.FunctionComponent<any> = (props) => (
  <TextField {...props}>{props.children}</TextField>
);

const OutlinedTextField = withStyles(outlinedTextFieldStyle)((props: any) => (
  <TextField
    inputProps={{ style: { height: "40px", padding: "0" } }}
    variant="outlined"
    {...props}
  >
    {props.children}
  </TextField>
));

export default MaterialTextField;
export { OutlinedTextField };
