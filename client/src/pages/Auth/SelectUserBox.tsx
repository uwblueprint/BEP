import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as EducatorImage } from "../../components/assets/undraw_teacher.svg";
import { ReactComponent as VolunteerImage } from "../../components/assets/undraw_candidate.svg";

import { TextButton, Dialog, DialogTitle } from "../../components/index";
import { Grid } from "@material-ui/core";

import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  boxedUser: {
    border: "3px solid #0A79BF",
    borderRadius: "2.93603px",
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
        <Grid item xs={6} className={classes.boxedUser}>
          <Link to="/educator-registration">
            Educator
            <EducatorImage />
          </Link>
        </Grid>
        <Grid item xs={6} className={classes.boxedUser}>
          <Link to="/volunteer-registration">
            Volunteer
            <VolunteerImage />
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
      <TextButton onClick={handleOpenSelector}>
        Don't Have An Account? Sign Up
      </TextButton>
      <SimpleDialog open={open} onClose={handleCloseSelector} />
    </div>
  );
}
