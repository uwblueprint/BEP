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
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    schoolBoard: "",
    schoolName: "",
    position: "",
    phoneNumber: 0,
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      <PageBody>
        <div>Register for an educator account</div>
        <BlackTextTypography>Account Information</BlackTextTypography>
        <OutlinedTextField
          required
          placeholder="e.g. name@email.com"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <BlackTextTypography>Account Password</BlackTextTypography>
        <OutlinedTextField
          placeholder="At least 8 characters"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <BlackTextTypography>Confirm Password</BlackTextTypography>
        <OutlinedTextField
          placeholder="At least 8 characters"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
        />
        <BlackTextTypography>First Name</BlackTextTypography>
        <OutlinedTextField
          placeholder="Enter first name"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
        />
        <BlackTextTypography>Last Name</BlackTextTypography>
        <OutlinedTextField
          placeholder="Enter last name"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
        />
        <BlackTextTypography>School Board</BlackTextTypography>
        <ContainedSelect
          placeholder="Selected your school board"
          name="schoolBoard"
          value={state.schoolBoard}
          onChange={handleChange}
        />
        <BlackTextTypography>School</BlackTextTypography>
        <ContainedSelect
          value={state.schoolName}
          name="schoolName"
          placeholder="Select your school's name"
          onChange={handleChange}
        />
        <BlackTextTypography>Position</BlackTextTypography>
        <ContainedSelect
          placeholder="Select your position at the school"
          name="position"
          value={state.position}
          onChange={handleChange}
        />
        <BlackTextTypography>Phone Number</BlackTextTypography>
        <OutlinedTextField
          placeholder="At least 8 characters"
          name="position"
          value={state.phoneNumber}
          onChange={handleChange}
        />
        {/* <BlackTextTypography>
          Which activities are you interested in?
        </BlackTextTypography>
        <OutlinedTextField
          placeholder="e.g. name@email.com"
          onChange={handleChange}
        />
        <BlackTextTypography>How did you hear about us</BlackTextTypography>
        <OutlinedTextField
          placeholder="e.g. name@email.com"
          onChange={handleChange}
        /> */}
      </PageBody>
    </React.Fragment>
  );
}
