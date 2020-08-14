import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const outlinedTextFieldStyle = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.light,
    },
  });

const OutlinedTextField = withStyles(outlinedTextFieldStyle)((props: any) => (
  <TextField
    variant="outlined"
    {...props}
  >
    {props.children}
  </TextField>
));

export { OutlinedTextField, TextField };
