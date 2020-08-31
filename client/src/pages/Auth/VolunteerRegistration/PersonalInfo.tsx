import React from "react";

import {
  ContainedSelect,
  ContainedButton,
  DarkContainedButton,
  TextButton,
  Dialog,
  DialogTitle,
  PageBody,
  OutlinedTextField,
  BlackHeaderTypography,
  BlackTextTypography,
} from "../../../components/index";

interface IComponentProps {
  currentStep: number;
  personalInfo: any;
  picklistInfo: any;
  handleNestedChange: any;
  handleChange: any; // () => void????
}

interface IComponentState {
  test: string;
}

class PersonalInfo extends React.Component<IComponentProps, IComponentState> {
  render() {
    if (this.props.currentStep !== 1) {
      // Prop: The current step
      return null;
    }

    // The markup for the Step 1 UI
    return (
      <div>
        <BlackHeaderTypography style={{ marginBottom: "2em" }}>
          Account Information
        </BlackHeaderTypography>

        <BlackHeaderTypography>Email*</BlackHeaderTypography>
        <OutlinedTextField
          placeholder="e.g. name@email.com"
          name="email"
          value={this.props.personalInfo.email}
          onChange={this.props.handleNestedChange(this.props.personalInfo)}
          required={true}
          isRequired="true"
        />
        <BlackHeaderTypography>Account Password*</BlackHeaderTypography>
        <OutlinedTextField
          placeholder="At least 8 characters"
          name="password"
          type="password"
          autoComplete="current-password"
          value={this.props.personalInfo.password}
          onChange={this.props.handleNestedChange(this.props.personalInfo)}
        />
        <BlackHeaderTypography>Confirm Password*</BlackHeaderTypography>
        <OutlinedTextField
          placeholder="At least 8 characters"
          name="confirmPassword"
          value={this.props.personalInfo.confirmPassword}
          type="password"
          autoComplete="current-password"
          onChange={this.props.handleNestedChange(this.props.personalInfo)}
        />
      </div>
      //   <div className="form-group">
      //     <label htmlFor="email">Email address</label>
      //     <input
      //       className="form-control"
      //       id="email"
      //       name="email"
      //       type="text"
      //       placeholder="Enter email"
      //       value={this.props.personalInfo.email} // Prop: The email input data
      //       onChange={this.props.handleNestedChange(this.props.personalInfo)} // Prop: Puts data into state
      //     />
      //   </div>
    );
  }
}

export default PersonalInfo;
