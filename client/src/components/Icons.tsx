import MaterialExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MaterialCloseIcon from '@material-ui/icons/Close';
import MaterialSearchIcon from "@material-ui/icons/Search";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const expandMoreIconStyle = (theme: Theme) =>
  createStyles({
    root: {
      fill: theme.palette.text.secondary,
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

const ExpandMoreIcon = withStyles(expandMoreIconStyle)(MaterialExpandMoreIcon);
const WhiteCloseIcon = withStyles(whiteCloseIconStyle)(MaterialCloseIcon);
const BlueSearchIcon = withStyles(blueSearchIconStyle)(MaterialSearchIcon);

export { ExpandMoreIcon, WhiteCloseIcon, BlueSearchIcon };
