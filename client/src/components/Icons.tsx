import MaterialExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MaterialCloseIcon from "@material-ui/icons/Close";
import MaterialSearchIcon from "@material-ui/icons/Search";
import MaterialInfoIcon from "@material-ui/icons/Info";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const blackExpandMoreIconStyle = (theme: Theme) =>
  createStyles({
    root: {
      fill: theme.palette.text.primary,
    },
  });

const secondaryMainExpandMoreIconStyle = (theme: Theme) =>
  createStyles({
    root: {
      fill: theme.palette.secondary.main,
    },
  });

const whiteCloseIconStyle = (theme: Theme) =>
  createStyles({
    root: {
      fill: theme.palette.primary.light,
    },
  });

const blueSearchIconStyle = (theme: Theme) =>
  createStyles({
    root: {
      fill: theme.palette.secondary.main,
    },
  });

const secondaryMainContrastInfoIconStyle = (theme: Theme) =>
  createStyles({
    root: {
      fill: theme.palette.secondary.contrastText,
    },
  });

const BlackExpandMoreIcon = withStyles(blackExpandMoreIconStyle)(
  MaterialExpandMoreIcon
);
const SecondaryMainExpandMoreIcon = withStyles(
  secondaryMainExpandMoreIconStyle
)(MaterialExpandMoreIcon);
const WhiteCloseIcon = withStyles(whiteCloseIconStyle)(MaterialCloseIcon);
const BlueSearchIcon = withStyles(blueSearchIconStyle)(MaterialSearchIcon);
const SecondaryMainContrastInfoIcon = withStyles(
  secondaryMainContrastInfoIconStyle
)(MaterialInfoIcon);

export {
  BlackExpandMoreIcon,
  BlueSearchIcon,
  SecondaryMainContrastInfoIcon,
  SecondaryMainExpandMoreIcon,
  WhiteCloseIcon,
};
