import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";

import {
  PageBody,
  BlackTextTypography,
  SecondaryMainTextTypography
} from "../../components/index";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export default function VolunteerRegistration() {
  return (
      <div style={{ height: "92vh" }}>
        <Grid
          item
          xs={12}
          style={{
            background: "white",
            height: "60vh",
            marginTop: "10vh",
            padding: "5%",
            paddingTop: "10vh",
            borderRadius: "1%",
            textAlign: "center"
          }}
        >
            <Typography variant="h1">
              <BlackTextTypography style={{ fontSize: "0.7em", lineHeight: "50px"}}>
                We are currently working on volunteer registration. <br></br>
                Please check again soon. <br></br>
              </BlackTextTypography>
            </Typography>
            <Link to="/educator-registration">
              <SecondaryMainTextTypography
                style={{ fontSize: "0.9em", marginTop: "4%" }}
              >
                Registration for Educators
              </SecondaryMainTextTypography>
            </Link>
            <Link to="/">
              <SecondaryMainTextTypography
                style={{ fontSize: "0.9em", marginTop: "1%" }}
              >
                Return to Login
              </SecondaryMainTextTypography>
            </Link>
        </Grid>
      </div>
  );
}
