import React from "react";
import Button from "@material-ui/core/Button";
import {
  WhiteTextTypography,
  SecondaryContrastTextTypography,
  SecondaryMainTextTypography,
} from "./index";
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

const outlinedButtonStyle = (theme: Theme) =>
  createStyles({
    root: {
      borderColor: theme.palette.secondary.main,
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

const OutlinedButton = withStyles(outlinedButtonStyle)((props: any) => (
  <Button {...props} variant="outlined">
    {props.disabled ? (
      <SecondaryContrastTextTypography>
        {props.children}
      </SecondaryContrastTextTypography>
    ) : (
      <SecondaryMainTextTypography>
        {props.children}
      </SecondaryMainTextTypography>
    )}
  </Button>
));

export {
  ContainedButton,
  DarkContainedButton,
  TextButton,
  Button,
  OutlinedButton,
};
