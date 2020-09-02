import React from "react";

import {
  OutlinedTextField,
  BlackHeaderTypography,
} from "../../../components/index";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

import { RawPicklists, PicklistInfo, PersonalInfoState } from "./Master";

interface IComponentProps {
  currentStep: number;
  picklists: RawPicklists;
  personalInfo: PersonalInfoState;
  picklistInfo: PicklistInfo;
  handleNestedChange: any;
  handleChange: any; // () => void????
  handleNestedChangeMultiAutocomplete: any;

  classes: any;
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
      <React.Fragment>
        <div style={{ height: "100%" }}>
          <Grid
            container
            direction="column"
            style={{
              backgroundColor: "#fff",
              borderRadius: "2px",
            }}
          >
            <div className={this.props.classes.formSection}>
              <BlackHeaderTypography style={{ marginBottom: "2em" }}>
                Account Information
              </BlackHeaderTypography>

              <BlackHeaderTypography>Email*</BlackHeaderTypography>
              <OutlinedTextField
                placeholder="e.g. name@email.com"
                required={true}
                name="email"
                value={this.props.personalInfo.email}
                className={this.props.classes.textField}
                onChange={this.props.handleNestedChange(
                  this.props.personalInfo
                )}
              />

              <BlackHeaderTypography>Account Password*</BlackHeaderTypography>
              <OutlinedTextField
                placeholder="At least 8 characters"
                required={true}
                name="password"
                type="password"
                autoComplete="current-password"
                value={this.props.personalInfo.password}
                className={this.props.classes.textField}
                onChange={this.props.handleNestedChange(
                  this.props.personalInfo
                )}
              />
              <BlackHeaderTypography>Confirm Password*</BlackHeaderTypography>
              <OutlinedTextField
                placeholder="At least 8 characters"
                required={true}
                name="confirmPassword"
                value={this.props.personalInfo.confirmPassword}
                className={this.props.classes.textField}
                type="password"
                autoComplete="current-password"
                onChange={this.props.handleNestedChange(
                  this.props.personalInfo
                )}
              />
            </div>
            <Divider />

            <div className={this.props.classes.formSection}>
              <Grid item>
                <BlackHeaderTypography style={{ marginBottom: "2em" }}>
                  About You
                </BlackHeaderTypography>
              </Grid>
              <BlackHeaderTypography>First Name*</BlackHeaderTypography>
              <OutlinedTextField
                placeholder="e.g. John"
                required={true}
                name="firstName"
                value={this.props.personalInfo.firstName}
                className={this.props.classes.textField}
                type="firstName"
                onChange={this.props.handleNestedChange(
                  this.props.personalInfo
                )}
              />
              <BlackHeaderTypography>Last Name*</BlackHeaderTypography>
              <OutlinedTextField
                placeholder="e.g. Doe"
                required={true}
                name="lastName"
                value={this.props.personalInfo.lastName}
                className={this.props.classes.textField}
                type="lastName"
                onChange={this.props.handleNestedChange(
                  this.props.personalInfo
                )}
              />
              <BlackHeaderTypography>Preferred Pronouns</BlackHeaderTypography>

              <Autocomplete
                className={this.props.classes.dropDowns}
                size="small"
                value={this.props.picklistInfo.preferredPronouns}
                getOptionLabel={(option) => option}
                options={
                  this.props.picklistInfo.preferredPronouns === null
                    ? this.props.picklists.preferredPronouns.list
                    : [
                        this.props.picklistInfo.preferredPronouns,
                        ...this.props.picklists.preferredPronouns.list,
                      ]
                }
                onChange={(_event, newValue) =>
                  this.props.handleNestedChangeMultiAutocomplete(
                    "preferredPronouns",
                    newValue
                  )
                }
                filterSelectedOptions
                renderInput={(params) => (
                  <OutlinedTextField
                    {...params}
                    variant="outlined"
                    required={true}
                    placeholder="Select your preferred pronoun"
                  />
                )}
              />
              <BlackHeaderTypography>Phone Number*</BlackHeaderTypography>
              <OutlinedTextField
                className={this.props.classes.textField}
                required={true}
                placeholder="At least 8 characters"
                name="phoneNumber"
                value={this.props.personalInfo.phoneNumber}
                onChange={this.props.handleNestedChange(
                  this.props.personalInfo
                )}
              />

              <BlackHeaderTypography>Linkedin URL</BlackHeaderTypography>
              <OutlinedTextField
                className={this.props.classes.textField}
                placeholder="At least 8 characters"
                name="linkedinUrl"
                value={this.props.personalInfo.linkedinUrl}
                onChange={this.props.handleNestedChange(
                  this.props.personalInfo
                )}
              />

              <BlackHeaderTypography>
                Local Post-Secondary Alumni
              </BlackHeaderTypography>

              <Autocomplete
                multiple
                id="localPostSecondaryInstitutions"
                options={
                  this.props.picklists.localPostSecondaryInstitutions.list
                }
                size="small"
                className={this.props.classes.dropDowns}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                onChange={(_event, newValue) =>
                  this.props.handleNestedChangeMultiAutocomplete(
                    "localPostSecondaryInstitutions",
                    newValue
                  )
                }
                renderInput={(params) => (
                  <OutlinedTextField
                    {...params}
                    variant="outlined"
                    placeholder="Select alma mater if applicable"
                  />
                )}
              />
              <BlackHeaderTypography>
                Memberships in Other Professional Associations/Unions
              </BlackHeaderTypography>
              <Autocomplete
                multiple
                id="professionalAssociations"
                options={this.props.picklists.professionalAssociations.list}
                size="small"
                className={this.props.classes.dropDowns}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                onChange={(_event, newValue) =>
                  this.props.handleNestedChangeMultiAutocomplete(
                    "professionalAssociations",
                    newValue
                  )
                }
                renderInput={(params) => (
                  <OutlinedTextField
                    {...params}
                    variant="outlined"
                    placeholder="Select associations"
                  />
                )}
              />
            </div>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default PersonalInfo;
