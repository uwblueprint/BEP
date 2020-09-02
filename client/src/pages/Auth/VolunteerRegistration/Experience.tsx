import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import {
  BlackHeaderTypography,
  BlackTextTypography,
  OutlinedTextField,
  OutlinedCheckbox,
  OutlinedSelect,
} from "../../../components/index";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { ExperienceState, PicklistInfo, RawPicklists } from "./Master";

import Employer from "../../../data/types/employerTypes";

interface IComponentProps {
  currentStep: number;
  experience: ExperienceState;
  employers: Employer[];
  picklistInfo: PicklistInfo;
  picklists: RawPicklists;
  handleChange: any; // () => void????
  handleNestedChange: any;
  handleNestedChangePicklist: any;
  createHandleSelectOption: any;
  handleNestedChangeMultiAutocomplete: any;
  classes: {
    formSection: any;
    textField: any;
    dropDowns: any;
  };
}

interface IComponentState {
  // experience: {
  //   jobTitle: string;
  //   orgName: string;
  //   orgWebsite: string;
  //   orgSocialMedia: string; // this seems hard a low priority (need to add)
  //   orgStreetAddr: string;
  //   orgCity: string;
  //   orgPostalCode: string;
  //   orgPhone: string;
  //   departmentDivision: string; // currenlty not in userTYpes
  //   careerDescription: string;
  //   involveMethod: string; // currently not in userTypes
  //   extraDescription: string; // other info i'd like schools to read
  // };
  createEmployer: boolean;
}

const styles = () => ({
  formSection: {
    padding: "2.5em 3em 0.5em 3em",
  },
  textField: {
    marginBottom: "26px",
    marginTop: "4px",
    width: "45%",
  },
  dropDowns: {
    marginTop: "4px",
    width: "45%",
    marginBottom: "26px",
  },
});

class Experience extends React.Component<IComponentProps, IComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      createEmployer: false,
    };
  }
  render() {
    if (this.props.currentStep !== 2) {
      // Prop: The current step
      return null;
    }
    // The markup for the Step 2 UI
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
                  padding: "3em",
                  backgroundColor: "#fff",
                  borderRadius: "2px",
                  margin: "2em 0em",
                }}
              >
                <Grid item>
                  <BlackHeaderTypography>Your Activities</BlackHeaderTypography>
                </Grid>

                <Grid item direction="column">
                  <FormControl style={{ width: "454px" }}>
                    <BlackHeaderTypography>
                      Employment Status*
                    </BlackHeaderTypography>
                    <OutlinedSelect
                      value={this.props.picklistInfo.employmentStatus}
                      displayEmpty
                      disableUnderline={true}
                      onChange={this.props.handleNestedChangePicklist(
                        "employmentStatus"
                      )}
                      style={{ height: "40px" }}
                      required={true}
                    >
                      <MenuItem value="" disabled>
                        Select your employment status
                      </MenuItem>
                      {Array.from(
                        this.props.picklists.employmentStatus.list.entries(),
                        (entry) => entry
                      ).map((entry, index) => (
                        <MenuItem key={index} value={entry[1]}>
                          {entry[1]}
                        </MenuItem>
                      ))}
                    </OutlinedSelect>
                  </FormControl>
                </Grid>

                <Grid item direction="column">
                  <FormControl>
                    <BlackHeaderTypography>
                      Current Job Title/Position*
                    </BlackHeaderTypography>
                    <OutlinedTextField
                      placeholder="e.g Product Manager"
                      name="jobTitle"
                      style={{ width: "454px" }}
                      value={this.props.experience.jobTitle}
                      onChange={this.props.handleNestedChange(
                        this.props.experience
                      )}
                      required={true}
                    />
                  </FormControl>
                </Grid>

                <Grid item direction="column">
                  <FormControl style={{ width: "454px" }}>
                    <BlackHeaderTypography>Employer</BlackHeaderTypography>
                    <OutlinedSelect
                      name="employerId"
                      value={this.props.experience.employerId}
                      onChange={(event: any) => {
                        this.props.handleNestedChange(this.props.experience)(
                          event
                        );
                        this.setState({
                          ...this.state,
                          createEmployer: event.target.value === "__other",
                        });
                      }}
                      style={{ height: "40px" }}
                      displayEmpty
                      disableUnderline={true}
                    >
                      <MenuItem value="">Select your employer</MenuItem>
                      <MenuItem value="__other">Other</MenuItem>
                      {this.props.employers.map((employer: Employer) => (
                        <MenuItem key={employer.id} value={employer.id}>
                          {employer.name}
                        </MenuItem>
                      ))}
                    </OutlinedSelect>
                  </FormControl>
                </Grid>

                {this.state.createEmployer && (
                  <React.Fragment>
                    {" "}
                    <Grid item direction="column">
                      <FormControl>
                        <BlackHeaderTypography>
                          Organization Name
                        </BlackHeaderTypography>
                        <OutlinedTextField
                          placeholder="Enter your organization’s name"
                          name="orgName"
                          style={{ width: "454px" }}
                          value={this.props.experience.orgName}
                          onChange={this.props.handleNestedChange(
                            this.props.experience
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item direction="column">
                      <FormControl style={{ width: "454px" }}>
                        <BlackHeaderTypography>
                          Organization Sector
                        </BlackHeaderTypography>
                        <OutlinedSelect
                          value={this.props.picklistInfo.sectors}
                          displayEmpty
                          disableUnderline={true}
                          onChange={this.props.handleNestedChangePicklist(
                            "sectors"
                          )}
                          style={{ height: "40px" }}
                        >
                          <MenuItem value="" disabled>
                            Select your Organization's Sector
                          </MenuItem>
                          {Array.from(
                            this.props.picklists.sectors.list.entries(),
                            (entry) => entry
                          ).map((entry, index) => (
                            <MenuItem key={index} value={entry[1]}>
                              {entry[1]}
                            </MenuItem>
                          ))}
                        </OutlinedSelect>
                      </FormControl>
                    </Grid>
                    <Grid item direction="column">
                      <FormControl>
                        <BlackHeaderTypography>
                          Organization Website
                        </BlackHeaderTypography>
                        <OutlinedTextField
                          placeholder="Enter your organization's website"
                          name="orgWebsite"
                          style={{ width: "454px" }}
                          value={this.props.experience.orgWebsite}
                          onChange={this.props.handleNestedChange(
                            this.props.experience
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item direction="column">
                      <FormControl>
                        <BlackHeaderTypography>
                          Organization Social Media
                        </BlackHeaderTypography>
                        <OutlinedTextField
                          placeholder="Enter your organization's social media link"
                          name="orgSocialMedia"
                          style={{ width: "454px" }}
                          value={this.props.experience.orgSocialMedia}
                          onChange={this.props.handleNestedChange(
                            this.props.experience
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item direction="column">
                      <FormControl>
                        <BlackHeaderTypography>
                          Organization Street Address
                        </BlackHeaderTypography>
                        <OutlinedTextField
                          placeholder="e.g Street Number, street name"
                          name="orgStreetAddr"
                          style={{ width: "454px" }}
                          value={this.props.experience.orgStreetAddr}
                          onChange={this.props.handleNestedChange(
                            this.props.experience
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item container direction="row" spacing={2}>
                      <Grid item direction="column">
                        <FormControl>
                          <BlackHeaderTypography>
                            Organization City
                          </BlackHeaderTypography>
                          <OutlinedTextField
                            placeholder="Enter Organization's City"
                            name="orgCity"
                            style={{ width: "220px" }}
                            value={this.props.experience.orgCity}
                            onChange={this.props.handleNestedChange(
                              this.props.experience
                            )}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item direction="column">
                        <FormControl>
                          <BlackHeaderTypography>
                            Organization Postal Code
                          </BlackHeaderTypography>
                          <OutlinedTextField
                            placeholder="A1A 1A1"
                            name="orgPostalCode"
                            style={{ width: "220px" }}
                            value={this.props.experience.orgPostalCode}
                            onChange={this.props.handleNestedChange(
                              this.props.experience
                            )}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item direction="column">
                      <FormControl>
                        <BlackHeaderTypography>
                          Organization Phone
                        </BlackHeaderTypography>
                        <OutlinedTextField
                          placeholder="e.g 000 000 0000"
                          type="number"
                          name="orgPhone"
                          style={{ width: "454px" }}
                          value={this.props.experience.orgPhone}
                          onChange={this.props.handleNestedChange(
                            this.props.experience
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </React.Fragment>
                )}

                <Grid item direction="column">
                  <FormControl>
                    <BlackHeaderTypography>
                      Department or Division
                    </BlackHeaderTypography>
                    <OutlinedTextField
                      placeholder="Eg. Human Resources"
                      name="departmentDivision"
                      style={{ width: "454px" }}
                      value={this.props.experience.departmentDivision}
                      onChange={this.props.handleNestedChange(
                        this.props.experience
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item direction="column">
                  <FormControl style={{ width: "454px" }}>
                    <BlackHeaderTypography>
                      Number of Staff in Organization
                    </BlackHeaderTypography>
                    <OutlinedSelect
                      value={this.props.picklistInfo.size}
                      displayEmpty
                      disableUnderline={true}
                      onChange={this.props.handleNestedChangePicklist("size")}
                      style={{ height: "40px" }}
                    >
                      <MenuItem value="" disabled>
                        Select the number of staff in your organization
                      </MenuItem>
                      {Array.from(
                        this.props.picklists.size.list.entries(),
                        (entry) => entry
                      ).map((entry, index) => (
                        <MenuItem key={index} value={entry[1]}>
                          {entry[1]}
                        </MenuItem>
                      ))}
                    </OutlinedSelect>
                  </FormControl>
                </Grid>

                <Grid item container direction="column">
                  <FormControlLabel
                    control={
                      <OutlinedCheckbox
                        name="shareWithEmployer"
                        checked={this.props.experience.shareWithEmployer}
                        onChange={this.props.handleNestedChange(
                          this.props.experience
                        )}
                      />
                    }
                    label={
                      <BlackHeaderTypography>
                        Share volunteer activity with employer
                      </BlackHeaderTypography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <OutlinedCheckbox
                        name="shareEmployerInfo"
                        checked={this.props.experience.shareEmployerInfo}
                        onChange={this.props.handleNestedChange(
                          this.props.experience
                        )}
                      />
                    }
                    label={
                      <BlackHeaderTypography>
                        List employer on BEP public facing website
                      </BlackHeaderTypography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <OutlinedCheckbox
                        name="isVolunteerCoordinator"
                        checked={this.props.experience.isVolunteerCoordinator}
                        onChange={this.props.handleNestedChange(
                          this.props.experience
                        )}
                      />
                    }
                    label={
                      <BlackHeaderTypography>
                        I am a contact for coordinating involvement and/or
                        recruiting other volunteers in my company
                      </BlackHeaderTypography>
                    }
                  />
                </Grid>
                <Divider />
                <Grid item>
                  <BlackHeaderTypography>
                    Your knowledge and expertise
                  </BlackHeaderTypography>
                </Grid>

                <Grid item direction="column">
                  <BlackHeaderTypography>
                    Areas of Expertise*
                  </BlackHeaderTypography>
                  <Autocomplete
                    multiple
                    id="expertiseAreas"
                    options={this.props.picklists.expertiseAreas.list}
                    getOptionLabel={(option) => option}
                    filterSelectedOptions
                    onChange={(_event, newValue) =>
                      this.props.handleNestedChangeMultiAutocomplete(
                        "expertiseAreas",
                        newValue
                      )
                    }
                    renderInput={(params) => (
                      <OutlinedTextField
                        {...params}
                        style={{ width: "454px" }}
                        variant="outlined"
                        placeholder="Select Activity Areas of Expertise"
                      />
                    )}
                  />
                </Grid>

                <Grid item container direction="column">
                  <BlackHeaderTypography>
                    Post Secondary Training I've participated in
                  </BlackHeaderTypography>
                  <Grid item>
                    {this.props.picklistInfo.postSecondaryTraining &&
                      Array.from(
                        this.props.picklistInfo.postSecondaryTraining.entries(),
                        (entry) => entry
                      ).map(([option, isSelected]) => (
                        <Grid
                          container
                          key={option}
                          spacing={0}
                          justify="flex-end"
                          alignItems="center"
                        >
                          <Grid item xs={1}>
                            <FormControlLabel
                              control={
                                <OutlinedCheckbox
                                  key={option}
                                  value={option}
                                  name={option}
                                  onChange={this.props.createHandleSelectOption(
                                    "postSecondaryTraining"
                                  )}
                                />
                              }
                              label={
                                <BlackTextTypography>
                                  {" "}
                                  {option}
                                </BlackTextTypography>
                              }
                            />
                          </Grid>
                          <Grid item xs={11}></Grid>
                        </Grid>
                      ))}
                  </Grid>
                </Grid>

                <Grid item direction="column">
                  <FormControl>
                    <BlackHeaderTypography>Languages</BlackHeaderTypography>
                    <Autocomplete
                      multiple
                      id="languages"
                      options={this.props.picklists.languages.list}
                      getOptionLabel={(option) => option}
                      filterSelectedOptions
                      onChange={(_event, newValue) =>
                        this.props.handleNestedChangeMultiAutocomplete(
                          "languages",
                          newValue
                        )
                      }
                      renderInput={(params) => (
                        <OutlinedTextField
                          {...params}
                          style={{ width: "454px" }}
                          variant="outlined"
                          placeholder="Select Additional Languages you speak"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item direction="column">
                  <FormControl>
                    <BlackHeaderTypography>
                      Description of my career*
                    </BlackHeaderTypography>
                    <OutlinedTextField
                      placeholder="1 Sentence"
                      name="careerDescription"
                      style={{ width: "454px" }}
                      value={this.props.experience.careerDescription}
                      onChange={this.props.handleNestedChange(
                        this.props.experience
                      )}
                      required={true}
                    />
                  </FormControl>
                </Grid>

                <Grid item direction="column">
                  <FormControl>
                    <BlackHeaderTypography>
                      How I got involved in my field*
                    </BlackHeaderTypography>
                    <OutlinedTextField
                      placeholder="1 sentence"
                      name="fieldInvolvementDescription"
                      style={{ width: "454px" }}
                      value={this.props.experience.fieldInvolvementDescription}
                      onChange={this.props.handleNestedChange(
                        this.props.experience
                      )}
                      required={true}
                    />
                  </FormControl>
                </Grid>

                <Grid item direction="column">
                  <FormControl>
                    <BlackHeaderTypography>
                      Other information I'd like schools to read
                    </BlackHeaderTypography>
                    <OutlinedTextField
                      placeholder="e.g other topics you can talk about, etc"
                      name="extraDescription"
                      style={{ width: "454px" }}
                      value={this.props.experience.extraDescription}
                      onChange={this.props.handleNestedChange(
                        this.props.experience
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Experience);
