import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  ContainedSelect,
  ContainedButton,
  DarkContainedButton,
  OutlinedTextField,
  BlackTextTypography,
  PageHeader,
  PageBody,
} from "../../components/index";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export default function EducatorRegistration() {
  const [userEmail, setUserEmail] = useState<string>("");

  return (
    <React.Fragment>
      <PageBody>
        <div>Register for an educator account</div>
        <BlackTextTypography>Account Information</BlackTextTypography>
        <OutlinedTextField
          placeholder="e.g. name@email.com"
          onChange={() => setUserEmail(userEmail)}
        />
        <BlackTextTypography>Account Password</BlackTextTypography>
        <OutlinedTextField
          placeholder="e.g. name@email.com"
          onChange={() => setUserEmail(userEmail)}
        />
        <BlackTextTypography>Confirm Password</BlackTextTypography>
        <OutlinedTextField
          placeholder="e.g. name@email.com"
          onChange={() => setUserEmail(userEmail)}
        />
        <BlackTextTypography>First Name</BlackTextTypography>
        <OutlinedTextField
          placeholder="e.g. name@email.com"
          onChange={() => setUserEmail(userEmail)}
        />
        <BlackTextTypography>Last Name</BlackTextTypography>
        <OutlinedTextField
          placeholder="e.g. name@email.com"
          onChange={() => setUserEmail(userEmail)}
        />
        <BlackTextTypography>School Board</BlackTextTypography>
        <OutlinedTextField
          placeholder="e.g. name@email.com"
          onChange={() => setUserEmail(userEmail)}
        />
        <BlackTextTypography>School</BlackTextTypography>
        <OutlinedTextField
          placeholder="e.g. name@email.com"
          onChange={() => setUserEmail(userEmail)}
        />
        <BlackTextTypography>Position</BlackTextTypography>
        <OutlinedTextField
          placeholder="e.g. name@email.com"
          onChange={() => setUserEmail(userEmail)}
        />
        <BlackTextTypography>Phone Number</BlackTextTypography>
        <OutlinedTextField
          placeholder="e.g. name@email.com"
          onChange={() => setUserEmail(userEmail)}
        />
        <BlackTextTypography>
          Which activities are you interested in?
        </BlackTextTypography>
        <OutlinedTextField
          placeholder="e.g. name@email.com"
          onChange={() => setUserEmail(userEmail)}
        />
        <BlackTextTypography>How did you hear about us</BlackTextTypography>
        <OutlinedTextField
          placeholder="e.g. name@email.com"
          onChange={() => setUserEmail(userEmail)}
        />
      </PageBody>
    </React.Fragment>
  );
}
