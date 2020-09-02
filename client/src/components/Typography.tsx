import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const whiteTextStyle = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.light,
    },
  });

const blackTextStyle = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
    },
  });

const secondaryMainTextStyle = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.secondary.main,
    },
  });

const greyBackgroundTextStyle = (theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.secondary.light,
    },
  });

const redTextStyle = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.warning.main,
    },
  });

const blackHeaderTextStyle = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
      fontWeight: 700,
    },
  });
const secondaryContrastTextStyle = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.secondary.contrastText,
    },
  });

const greyTextStyle = (theme: Theme) =>
  createStyles({
    root: {
      color: "#9c9c9c",
    },
  });

const WhiteTextTypography = withStyles(whiteTextStyle)((props: any) => (
  <Typography {...props}>{props.children}</Typography>
));

const BlackTextTypography = withStyles(blackTextStyle)((props: any) => (
  <Typography {...props}>{props.children}</Typography>
));

const BlackHeaderTypography = withStyles(blackHeaderTextStyle)((props: any) => (
  <Typography {...props}>{props.children}</Typography>
));

const SecondaryMainTextTypography = withStyles(
  secondaryMainTextStyle
)((props: any) => <Typography {...props}>{props.children}</Typography>);

const GreyBackgroundTextTypography = withStyles(
  greyBackgroundTextStyle
)((props: any) => <Typography {...props}>{props.children}</Typography>);

const RedTextTypography = withStyles(redTextStyle)((props: any) => (
  <Typography {...props}>{props.children}</Typography>
));

const SecondaryContrastTextTypography = withStyles(
  secondaryContrastTextStyle
)((props: any) => <Typography {...props}>{props.children}</Typography>);

const GreyTextTypography = withStyles(
  greyTextStyle
)((props: any) => <Typography {...props}>{props.children}</Typography>);

export {
  BlackTextTypography,
  BlackHeaderTypography,
  GreyBackgroundTextTypography,
  GreyTextTypography,
  RedTextTypography,
  SecondaryContrastTextTypography,
  SecondaryMainTextTypography,
  WhiteTextTypography,
};
