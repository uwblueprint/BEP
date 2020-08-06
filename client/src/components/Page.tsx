import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

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

const PageHeader = withStyles(pageHeaderStyle)((props: any) => (
  <Grid item style={{ height: "25%", padding: "0px 12%", width: "100%" }} {...props}>
    {props.children}
  </Grid>
));

const PageBody = withStyles(pageBodyStyle)((props: any) => (
  <Grid item style={{ height: "75%", padding: "0px 12%", width: "100%" }} {...props}>
    {props.children}
  </Grid>
));

export { PageHeader, PageBody };
