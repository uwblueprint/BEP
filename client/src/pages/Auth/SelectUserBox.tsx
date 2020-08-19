import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { TextButton, Dialog, DialogTitle } from "../../components/index";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
      <TextButton onClick={() => handleSelectionClick("volunteer")}>
        Volunteer
      </TextButton>
      <TextButton onClick={() => handleSelectionClick("educator")}>
        Educator
      </TextButton>
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
