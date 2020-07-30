import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import { PageHeaderTypography } from "./Typography";

const pageHeaderStyle = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.light,
      height: "191px",
    },
  });

const pageBodyStyle = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
    },
  });

const pageBodyGutterStyle = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
    },
  });

const pageHeaderGutterStyle = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.light,
    },
  });

const PageHeaderGutter = withStyles(pageHeaderGutterStyle)((props: any) => (
  <Grid item sm={1} {...props}>
    {props.children}
  </Grid>
));

const PageBodyGutter = withStyles(pageBodyGutterStyle)((props: any) => (
  <Grid item {...props}>
    {props.children}
  </Grid>
));

const PageHeader = withStyles(pageHeaderStyle)((props: any) => (
  <Grid container direction="row" {...props}>
    <PageHeaderGutter sm={1} />
    <Grid
      item
      container
      xs={12}
      sm={10}
      direction="column"
      alignItems="flex-start"
      justify="flex-end"
    >
      <PageHeaderTypography>{props.header}</PageHeaderTypography>
      <Grid item xs={2} />
    </Grid>
    <PageHeaderGutter sm={1} />
  </Grid>
));

const PageBody = withStyles(pageBodyStyle)((props: any) => (
  <Grid container direction="row" style={{ height: "100%" }}>
    <PageBodyGutter sm={1} />
    <Grid item xs={12} sm={10} {...props}>
      {props.children}
    </Grid>
    <PageBodyGutter sm={1} />
  </Grid>
));

export { PageHeader, PageBody, PageBodyGutter, PageHeaderGutter };
