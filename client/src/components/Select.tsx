import React from "react";
import MaterialSelect from "@material-ui/core/Select";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const containedSelectStyle = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      "&$selected": {
        // this is to refer to the prop provided by M-UI
        backgroundColor: theme.palette.secondary.light, // updated backgroundColor
      },
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
