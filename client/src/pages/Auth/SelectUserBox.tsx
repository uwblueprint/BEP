import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as EducatorImage } from "../../components/assets/undraw_teacher.svg";
import { ReactComponent as VolunteerImage } from "../../components/assets/undraw_candidate.svg";

import { TextButton, Dialog, DialogTitle } from "../../components/index";
import { Grid } from "@material-ui/core";

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
  selectedUser: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, selectedUser, open } = props;

  const handleCloseSelector = () => {
    onClose(selectedUser);
  };

  const handleSelectionClick = (value: string) => {
    onClose(value);
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
          <TextButton onClick={() => handleSelectionClick("educator")}>
            Educator
            <EducatorImage />
          </TextButton>
        </Grid>
        <Grid item xs={6} className={classes.boxedUser}>
          <TextButton onClick={() => handleSelectionClick("educator")}>
            Volunteer
            <VolunteerImage />
          </TextButton>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default function SelectUserBox(props: any) {
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const handleOpenSelector = () => {
    setOpen(true);
  };

  const handleCloseSelector = (value: string) => {
    setOpen(false);
    props.setUserType(value);
  };

  return (
    <div>
      <TextButton onClick={handleOpenSelector}>
        Don't Have An Account? Sign Up
      </TextButton>
      <SimpleDialog
        selectedUser={selectedUser}
        open={open}
        onClose={handleCloseSelector}
      />
    </div>
  );
}
