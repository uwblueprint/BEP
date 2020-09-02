import React from "react";
import Avatar from "@material-ui/core/Avatar";

import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const blueAvatarStyle = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.secondary.main,
    },
  });

const greyAvatarStyle = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#C0CAD1",
    },
  });

const BlueAvatar = withStyles(blueAvatarStyle)((props: any) => (
  <Avatar {...props}>{props.children}</Avatar>
));

const GreyAvatar = withStyles(greyAvatarStyle)((props: any) => (
  <Avatar {...props}>{props.children}</Avatar>
));

export { BlueAvatar, GreyAvatar };
