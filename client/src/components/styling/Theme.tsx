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
      contrastText: "#A7B4BE",
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
    // fontFamily: '"Lato", sans-serif',
    h1: {
      fontFamily: "Arial",
      fontStyle: "normal",
      fontSize: "40px",
      lineHeight: "49px",
      fontWeight: "bold",
    },
    h2: {
      fontStyle: "normal",
      fontWeight: 800,
      fontSize: "30px",
      lineHeight: "33px",
    },
    h3: {
      fontSize: "48px",
      letterSpacing: 0,
      lineHeight: "72px",
      fontWeight: "normal",
    },
    h4: {
      fontSize: "34px",
      letterSpacing: "0.25px",
      lineHeight: "72px",
      fontWeight: "bold",
    },
    h5: {
      fontSize: "24px",
      letterSpacing: 0,
      lineHeight: "36px",
      fontWeight: "normal",
    },
    h6: {
      fontSize: "20px",
      letterSpacing: "0.25px",
      lineHeight: "30px",
      fontWeight: 500,
    },
    body1: {
      fontSize: "16px",
      letterSpacing: "0.5px",
      lineHeight: "22px",
      fontWeight: 500,
    },
    body2: {
      fontSize: "16px",
      letterSpacing: "0.5px",
      lineHeight: "24px",
      fontWeight: "normal",
    },
    subtitle1: {
      fontStyle: "normal",
      fontWeight: 800,
      fontSize: "12px",
      lineHeight: "16px",
      textTransform: "uppercase",
      opacity: 0.5,
    },
    subtitle2: {
      fontSize: "13px",
      letterSpacing: "0.5px",
      fontWeight: 500,
      lineHeight: "24px",
    },
    button: {
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "22px",
      textTransform: "capitalize",
    },
    caption: {
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "12px",
      lineHeight: "16px",
    },
  },
  overrides: {
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "$labelcolor",
        },
      },
    },
    MuiTabs: {
      flexContainer: {
        margin: "1em 0em",
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
      },
      textColorInherit: {
        color: "black",
        "&$selected": {
          color: "#0A79BF",
          backgroundColor: "#f2faff",
          borderRadius: "2px",
        },
      },
    },
    MuiIconButton: {
      root: {
        color: "#0A79BF",
      },
    },
    MuiContainer: {
      root: {
        padding: 0,
        "@media (min-width: 0px)": {
          padding: 0,
        },
      },
    },
    MuiButton: {
      textPrimary: {
        color: "#0A79BF",
      },
    },
    MuiPickersDay: {
      daySelected: {
        color: "#fff",
        backgroundColor: "#0A79BF",
        "&:hover": {
          color: "#000",
          backgroundColor: "#fff",
        },
      },
      current: {
        color: "#000",
      },
      day: {
        "&:hover": {
          backgroundColor: "#D9F0FF",
        },
      },
    },
    MuiInput: {
      underline: {
        "&:before": {
          border: "1px solid #e5e5e5",
          borderRadius: "2px",
          padding: "8px",
          content: "none",
        },
      },
    },
  },
});

export default theme;
