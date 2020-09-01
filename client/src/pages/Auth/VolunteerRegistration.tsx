import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import {
  ContainedSelect,
  ContainedButton,
  DarkContainedButton,
  TextButton,
  Dialog,
  DialogTitle,
} from "../../components/index";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export default function VolunteerRegistration() {
  return (
    <React.Fragment>
      <Link to="/">Back</Link>

      <div>This is the volunteer reigstration</div>
    </React.Fragment>
  );
}
