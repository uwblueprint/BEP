import React from "react";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
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

const WhiteTextTypography = withStyles(whiteTextStyle)((props: any) => (
  <Typography {...props}>{props.children}</Typography>
));

const BlackTextTypography = withStyles(blackTextStyle)((props: any) => (
  <Typography {...props}>{props.children}</Typography>
));

const SecondaryMainTextTypography = withStyles(secondaryMainTextStyle)((props: any) => (
  <Typography {...props}>{props.children}</Typography>
));

export { WhiteTextTypography, BlackTextTypography, SecondaryMainTextTypography };