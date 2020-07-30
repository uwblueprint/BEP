import React from "react";
import MaterialSelect from "@material-ui/core/Select";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const containedSelectStyle = (theme: Theme) =>
  createStyles({
    root: {
      // color: theme.palette.background.default,
      // color: theme.palette.secondary.light,
   
    },
    select: {
      // "&:focus": {
      //   backgroundColor: theme.palette.background.default,
      // },

      backgroundColor: theme.palette.background.default,
      focused: {
        backgroundColor: theme.palette.secondary.light,
      },
      active: {
        backgroundColor: theme.palette.secondary.light,
      },
      // "&:before": {
      //   backgroundColor: theme.palette.secondary.light, // updated backgroundColor
      // },
      // "&:after": {
      //   backgroundColor: theme.palette.secondary.light, // updated backgroundColor
      // },
    },
  });

const ContainedSelect = withStyles(containedSelectStyle)((props: any) => (
  <MaterialSelect
    MenuProps={{
      getContentAnchorEl: null,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      style: { width: "50%", height: "50%" },
    }}
    {...props}
  >
    {props.children}
  </MaterialSelect>
));

export { ContainedSelect };
