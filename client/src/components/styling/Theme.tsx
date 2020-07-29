import { createMuiTheme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

const theme = createMuiTheme({
  palette: {
    primary: {
      // greys
      light: "#FFFFFF", //white
      main: fade("#000000", 0.1), // box outlines
      dark: "#C4C4C4", // container buttons
    },
    secondary: {
      // blues
      light: "#D9F0FF",
      main: "#0A79BF",
      dark: "#07598C",
    },
    background: {
      default: "#F7FAFC",
    },
    warning: {
      // reds
      main: "#B02222",
    },
    text: {
      primary: "#000000", // Black
      secondary: "#043859", // Dark blue
    },
  },
  typography: {
    h1: {
      fontFamily: "Avenir",
      fontStyle: "normal",
      // fontWeight: "800",
      fontSize: "36px",
      lineHeight: "49px",
    }
  },
  overrides: {
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "$labelcolor"
        }
      }
    }
  }

});

export default theme;
