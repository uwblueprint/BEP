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
    },
    h3: {
      fontSize: '48px',
      letterSpacing: 0,
      lineHeight: '72px',
      fontWeight: 'normal',
    },
    h4: {
      fontSize: '34px',
      letterSpacing: '0.25px',
      lineHeight: '72px',
      fontWeight: 'bold',
    },
    h5: {
      fontSize: '24px',
      letterSpacing: 0,
      lineHeight: '36px',
      fontWeight: 'normal',
    },
    h6: {
      fontSize: '20px',
      letterSpacing: '0.25px',
      lineHeight: '30px',
      fontWeight: 500,
    },
    body1: {
      fontSize: '16px',
      letterSpacing: '0.5px',
      lineHeight: '22px',
      fontWeight: 500,
    },
    body2: {
      fontSize: '16px',
      letterSpacing: '0.5px',
      lineHeight: '24px',
      fontWeight: 'normal',
    },
    subtitle1: {
      fontSize: '13px',
      letterSpacing: '0.5px',
      fontWeight: 700,
      lineHeight: '24px',
      textTransform: 'uppercase',
      opacity: 0.5
    },
    subtitle2: {
      fontSize: '13px',
      letterSpacing: '0.5px',
      fontWeight: 500,
      lineHeight: '24px',
      textTransform: 'lowercase'
    }
  }
});

export default theme;
