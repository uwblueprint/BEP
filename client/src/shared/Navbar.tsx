import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
    BlackTextTypography,
    Link
  } from "../components/index";

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "0.5% 0",
    margin: "0 5%",
    background: "white",
  },
});

export default function Navbar(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Link href="\"><BlackTextTypography>Business & Education Partnership</BlackTextTypography></Link>
    </div>
  );
}
