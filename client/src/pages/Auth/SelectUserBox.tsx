import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as EducatorImage } from "../../components/assets/undraw_teacher.svg";
import { ReactComponent as VolunteerImage } from "../../components/assets/undraw_candidate.svg";

import {
  TextButton,
  Dialog,
  DialogTitle,
  SecondaryMainTextTypography,
} from "../../components/index";
import { Grid } from "@material-ui/core";

import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  boxedUser1: {
    border: "3px solid #0A79BF",
    borderRadius: "2.93603px",
    margin: "0px 12px 24px 24px",
  },
  boxedUser2: {
    border: "3px solid #0A79BF",
    borderRadius: "2.93603px",
    margin: "0px 24px 24px 12px",
  },
  eduImage: {
    width: "91%",
    marginBottom: "-141px",
  },
  volImage: {
    marginBottom: "-16px",
    width: "90%",
  },
  link: {
    textDecoration: "none",
    textAlign: "center",
  },
  userText: {
    fontWeight: 700,
    padding: "1em",
  },
});

export interface SimpleDialogProps {
  open: boolean;
  onClose: any;
}

function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleCloseSelector = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleCloseSelector}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Which one are you?</DialogTitle>

      <Grid container direction="row">
        <Grid item xs={5} className={classes.boxedUser1}>
          <Link to="/educator-registration" className={classes.link}>
            <Grid>
              <SecondaryMainTextTypography className={classes.userText}>
                Educator
              </SecondaryMainTextTypography>
            </Grid>
            <Grid>
              <EducatorImage className={classes.eduImage} />
            </Grid>
          </Link>
        </Grid>
        <Grid item xs={5} className={classes.boxedUser2}>
          <Link to="/volunteer-registration" className={classes.link}>
            <Grid>
              {" "}
              <SecondaryMainTextTypography className={classes.userText}>
                Volunteer
              </SecondaryMainTextTypography>
            </Grid>
            <Grid>
              <VolunteerImage className={classes.volImage} />
            </Grid>
          </Link>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default function SelectUserBox(props: any) {
  const [open, setOpen] = React.useState(false);

  const handleOpenSelector = () => {
    setOpen(true);
  };

  const handleCloseSelector = () => {
    setOpen(false);
  };

  return (
    <div>
      <TextButton onClick={handleOpenSelector} style={{ fontSize: "0.8em", background: "white" }}>
        Don't Have An Account? Sign Up
      </TextButton>
      <SimpleDialog open={open} onClose={handleCloseSelector} />
    </div>
  );
}
