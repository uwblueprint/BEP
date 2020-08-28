import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
    BlackTextTypography,
    Link
  } from "../components/index";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    padding: "0.5% 5% 0.5% 5%",
    background: "white",
    position: "fixed",
    marginTop: "-8px",
    zIndex: 5
  },
  tabs: {
    backgroundColor: theme.palette.primary.light,
    boxShadow: "0",
    paddingTop: "13px",
  },
}));

export default function Navbar(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Link href="\"><BlackTextTypography>Business & Education Partnership</BlackTextTypography></Link>
        <a onClick={() => { localStorage.clear(); window.location.reload() }}>Logout</a>
    </div>
  );
}
