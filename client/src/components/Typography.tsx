import React from "react";
import MaterialTypography, {
  TypographyProps,
} from "@material-ui/core/Typography";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const h1Style = (theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.secondary.main,
    },
  });

const PageHeaderTypography: React.FunctionComponent<TypographyProps> = (props) => (
  <MaterialTypography variant="h1" {...props}>{props.children}</MaterialTypography>
);

export { PageHeaderTypography };
