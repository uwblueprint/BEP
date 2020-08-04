import React from "react";
import Button from "@material-ui/core/Button";
import { WhiteTextTypography } from "./index";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const containedButtonStyle = (theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.secondary.main,
      height: "100%",
    },
  });

const darkContainedButtonStyle = (theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.secondary.dark,
    },
  });

const textButtonStyle = (theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.default,
    },
  });

const ContainedButton = withStyles(containedButtonStyle)((props: any) => (
  <Button {...props}>
    <WhiteTextTypography variant="body1">{props.children}</WhiteTextTypography>
  </Button>
));
const DarkContainedButton = withStyles(darkContainedButtonStyle)(Button);
const TextButton = withStyles(textButtonStyle)(Button);

export { ContainedButton, DarkContainedButton, TextButton, Button };
