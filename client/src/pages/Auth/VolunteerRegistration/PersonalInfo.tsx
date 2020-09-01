import React from "react";

import { withStyles } from "@material-ui/core/styles";

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
import Autocomplete from "@material-ui/lab/Autocomplete";

import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

interface IComponentProps {
  currentStep: number;
  personalInfo: any;
  picklistInfo: any;
  handleNestedChange: any;
  handleChange: any; // () => void????
  classes: {
    formSection: any;
    textField: any;
    dropDowns: any;
  };
}

interface IComponentState {
  test: string;
}

const styles = () => ({
  formSection: {
    padding: "2.5em 3em 0.5em 3em",
  },
  textField: {
    marginBottom: "26px",
    marginTop: "4px",
  },
  dropDowns: {
    marginTop: "4px",
    width: "45%",
  },
});

class PersonalInfo extends React.Component<IComponentProps, IComponentState> {
  render() {
    if (this.props.currentStep !== 1) {
      // Prop: The current step
      return null;
    }

    // The markup for the Step 1 UI
    return (
      <React.Fragment>
        <div className="form-group">
          <div style={{ height: "100vh" }}>
            <Grid container style={{ height: "100%" }}>
              <Grid
                container
                spacing={4}
                direction="column"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "2px",
                  margin: "2em 0em",
                }}
              >
                <div className={this.props.classes.formSection}>
                  <Grid item>
                    <BlackHeaderTypography style={{ marginBottom: "2em" }}>
                      Account Information
                    </BlackHeaderTypography>
                  </Grid>

                  <Grid item direction="column">
                    <BlackHeaderTypography>Email*</BlackHeaderTypography>
                    <OutlinedTextField
                      placeholder="e.g. name@email.com"
                      name="email"
                      value={this.props.personalInfo.email}
                      className={this.props.classes.textField}
                      onChange={this.props.handleNestedChange(
                        this.props.personalInfo
                      )}
                      required={true}
                      isRequired="true"
                    />
                  </Grid>

                  <Grid item direction="column">
                    <BlackHeaderTypography>
                      Account Password*
                    </BlackHeaderTypography>
                    <OutlinedTextField
                      placeholder="At least 8 characters"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={this.props.personalInfo.password}
                      className={this.props.classes.textField}
                      onChange={this.props.handleNestedChange(
                        this.props.personalInfo
                      )}
                    />
                  </Grid>
                  <Grid item direction="column">
                    <BlackHeaderTypography>
                      Confirm Password*
                    </BlackHeaderTypography>
                    <OutlinedTextField
                      placeholder="At least 8 characters"
                      name="confirmPassword"
                      value={this.props.personalInfo.confirmPassword}
                      className={this.props.classes.textField}
                      type="password"
                      autoComplete="current-password"
                      onChange={this.props.handleNestedChange(
                        this.props.personalInfo
                      )}
                    />
                  </Grid>
                </div>
                <Divider />

                <div className={this.props.classes.formSection}>
                  <Grid item direction="column">
                    <BlackHeaderTypography>First Name*</BlackHeaderTypography>
                    <OutlinedTextField
                      placeholder="e.g. John"
                      name="firstName"
                      value={this.props.personalInfo.firstName}
                      className={this.props.classes.textField}
                      type="firstName"
                      onChange={this.props.handleNestedChange(
                        this.props.personalInfo
                      )}
                    />
                  </Grid>

                  <Grid item direction="column">
                    <BlackHeaderTypography>Last Name*</BlackHeaderTypography>
                    <OutlinedTextField
                      placeholder="e.g. Doe"
                      name="lastName"
                      value={this.props.personalInfo.lastName}
                      className={this.props.classes.textField}
                      type="lastName"
                      onChange={this.props.handleNestedChange(
                        this.props.personalInfo
                      )}
                    />

                    {/* <Autocomplete
                      className={this.props.classes.dropDowns}
                      id="tags-outlined"
                      size="small"
                      value={this.state.schoolInfo.type}
                      options={
                        this.state.schoolInfo.type === null
                          ? this.props.picklists.type.list
                          : [
                              this.state.schoolInfo.type,
                              ...this.props.picklists.type.list,
                            ]
                      }
                      filterSelectedOptions
                      onChange={(_event, newValue) => {
                        this.setState({
                          schoolInfo: {
                            ...this.state.schoolInfo,
                            type: newValue,
                          },
                        });
                      }}
                      renderInput={(params) => (
                        <OutlinedTextField
                          {...params}
                          variant="outlined"
                          placeholder="Preferred Sectors"
                        />
                      )}
                    /> */}

                    <BlackHeaderTypography>
                      Preferred Pronouns*
                    </BlackHeaderTypography>
                    <FormControl
                      required
                      className={this.props.classes.dropDowns}
                    >
                      <Select
                        value={this.props.personalInfo.preferredPronouns}
                        onChange={this.props.handleNestedChange(
                          this.props.personalInfo
                        )}
                        name="preferredPronouns"
                        displayEmpty
                        disableUnderline={true}
                        // className={this.props.classes.selectField}
                      >
                        <MenuItem value="" disabled>
                          Select your preferred pronoun
                        </MenuItem>
                        <MenuItem value="she/her">She/Her</MenuItem>
                        <MenuItem value="he/him">He/Him</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PersonalInfo);
