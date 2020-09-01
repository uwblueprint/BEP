import React from "react";
import Dialog from "@material-ui/core/Dialog";

import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const dialogStyle = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.light,
    },
  });

const OutlinedDialog = withStyles(dialogStyle)((props: any) => (
  <Dialog {...props}>{props.children}</Dialog>
));

export { OutlinedDialog };
export default Dialog;
