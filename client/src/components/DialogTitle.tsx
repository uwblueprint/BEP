import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";

import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const dialogTitleStyle = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.light,
    },
  });

const OutlinedDialogTitle = withStyles(dialogTitleStyle)((props: any) => (
  <DialogTitle {...props}>{props.children}</DialogTitle>
));

export { OutlinedDialogTitle };
export default DialogTitle;
