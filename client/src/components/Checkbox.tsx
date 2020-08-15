import Checkbox from "@material-ui/core/Checkbox";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const outlinedCheckboxStyle = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.secondary.contrastText,
    },
  });

const OutlinedCheckbox = withStyles(outlinedCheckboxStyle)(Checkbox);

export default Checkbox;
export { OutlinedCheckbox };
