import Button from "@material-ui/core/Button";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const containedButtonStyle = (theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.secondary.main,
    },
  });

const darkContainedButtonStyle = (theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.secondary.dark,
    },
  });

const textButtonStyle = (theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.default,
    },
  });

const ContainedButton = withStyles(containedButtonStyle)(Button);
const DarkContainedButton = withStyles(darkContainedButtonStyle)(Button);
const TextButton = withStyles(textButtonStyle)(Button);

export default Button;
export { ContainedButton, DarkContainedButton, TextButton };
