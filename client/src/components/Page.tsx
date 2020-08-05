import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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

const appBarStyle = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.light,
    },
  });

const PageHeaderGutter = withStyles(pageHeaderGutterStyle)((props: any) => (
  <Grid item {...props}>
    {props.children}
  </Grid>
));

const PageBodyGutter = withStyles(pageBodyGutterStyle)((props: any) => (
  <Grid item {...props}>
    {props.children}
  </Grid>
));

const PageHeader = withStyles(pageHeaderStyle)((props: any) => (
  <Grid
    container
    direction="row"
    justify="flex-start"
    alignItems="flex-end"
    {...props}
  >
    <PageHeaderGutter sm={2} />
    <Grid item xs={10} sm={8} >
      <Typography variant="h1" {...props} style={{ height: "70%", maxWidth: 1000, margin: 0 }}>
        {props.header}
      </Typography>
    </Grid>
    <PageHeaderGutter sm={2} />
  </Grid>
));

const PageBody = withStyles(pageBodyStyle)((props: any) => (
  <Grid container direction="row" style={{ height: "100%" }}>
    <PageBodyGutter sm={2} />
    <Grid item xs={10} sm={8} {...props}>
      {props.children}
    </Grid>
    <PageBodyGutter sm={2} />
  </Grid>
));



export { PageHeader, PageBody, PageBodyGutter, PageHeaderGutter };
