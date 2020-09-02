import React from "react";
import Select from "@material-ui/core/Select";

import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const containedSelectStyle = (theme: Theme) =>
  createStyles({
    select: {
      backgroundColor: theme.palette.background.default,
      focused: {
        backgroundColor: theme.palette.secondary.light,
      },
      active: {
        backgroundColor: theme.palette.secondary.light,
      },

      "& .MuiSelect-select.MuiSelect-select": {
        paddingRight: "4px",
      },
    },
  });

const outlinedSelectStyle = (theme: Theme) =>
  createStyles({
    select: {
      borderColor: theme.palette.primary.main,
    },
  });

const ContainedSelect = withStyles(containedSelectStyle)((props: any) => (
  <Select
    MenuProps={{
      getContentAnchorEl: null,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      style: { width: "50%", height: "50%" },
    }}
    className={props.classes.select}
    {...props}
  >
    {props.children}
  </Select>
));

const OutlinedSelect = withStyles(outlinedSelectStyle)((props: any) => (
  <Select
    MenuProps={{
      getContentAnchorEl: null,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      style: { width: "50%", height: "50%" },
    }}
    className={props.classes.select}
    {...props}
    variant="outlined"
    // IconComponent={ExpandMoreIcon}
  >
    {props.children}
  </Select>
));

export { ContainedSelect, OutlinedSelect, Select };
