import React from "react";
import Button from "@material-ui/core/Button";
import { WhiteTextTypography, SecondaryMainTextTypography } from "./index";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const containedButtonStyle = (theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.secondary.main,
      "&:disabled": {
        background: theme.palette.secondary.contrastText,
      },
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
    <WhiteTextTypography variant="button">{props.children}</WhiteTextTypography>
  </Button>
));
const DarkContainedButton = withStyles(darkContainedButtonStyle)(Button);
const TextButton = withStyles(textButtonStyle)((props: any) => (
  <Button {...props}>
    <SecondaryMainTextTypography variant="button" color="primary">
      {props.children}
    </SecondaryMainTextTypography>
  </Button>
));

const OutlinedButton = (props: any) => (
  <Button {...props} variant="outlined">
    <SecondaryMainTextTypography>{props.children}</SecondaryMainTextTypography>
  </Button>
);

export {
  ContainedButton,
  DarkContainedButton,
  TextButton,
  Button,
  OutlinedButton,
};
