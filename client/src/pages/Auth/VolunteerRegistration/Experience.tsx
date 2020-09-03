import React from "react";
import Grid from "@material-ui/core/Grid";

import {
  BlackHeaderTypography,
  BlackTextTypography,
  BlueArrowDropDownIcon,
  OutlinedTextField,
  OutlinedCheckbox,
  OutlinedSelect,
  GreyTextTypography,
} from "../../../components/index";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { ExperienceState, PicklistInfo, RawPicklists } from "./VolunteerRegistration";

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
  handleNestedChangeAutocomplete: any;
  handleNestedChangeMultiAutocomplete: any;
  classes: any;
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
              <Grid item>
                <BlackHeaderTypography
                  style={{ marginBottom: "2em" }}
                  variant="h3"
                >
                  About your work
                </BlackHeaderTypography>
              </Grid>

              <Grid item>
                <BlackHeaderTypography>
                  Employment Status*
                </BlackHeaderTypography>
                <Autocomplete
                  className={this.props.classes.dropDowns}
                  size="small"
                  value={this.props.picklistInfo.employmentStatus}
                  getOptionLabel={(option) => option}
                  options={
                    this.props.picklistInfo.employmentStatus === null
                      ? this.props.picklists.employmentStatus.list
                      : [
                          this.props.picklistInfo.employmentStatus,
                          ...this.props.picklists.employmentStatus.list,
                        ]
                  }
                  onChange={(_event, newValue) =>
                    this.props.handleNestedChangeAutocomplete(
                      "employmentStatus",
                      newValue
                    )
                  }
                  filterSelectedOptions
                  renderInput={(params) => (
                    <OutlinedTextField
                      {...params}
                      variant="outlined"
                      placeholder="Select your employment status"
                      required={true}
                    />
                  )}
                />
              </Grid>

              <Grid item>
                <BlackHeaderTypography>
                  Current Job Title/Position*
                </BlackHeaderTypography>
                <OutlinedTextField
                  placeholder="e.g Product Manager"
                  name="jobTitle"
                  required={true}
                  className={this.props.classes.textField}
                  value={this.props.experience.jobTitle}
                  onChange={this.props.handleNestedChange(
                    this.props.experience
                  )}
                />
              </Grid>

              <Grid item>
                <BlackHeaderTypography>Employer</BlackHeaderTypography>
                <OutlinedSelect
                  name="employerId"
                  value={this.props.experience.employerId}
                  className={this.props.classes.dropDowns}
                  onChange={(event: any) => {
                    this.props.handleNestedChange(this.props.experience)(event);
                    this.setState({
                      ...this.state,
                      createEmployer: event.target.value === "__other",
                    });
                  }}
                  style={{ height: "40px" }}
                  displayEmpty
                  IconComponent={BlueArrowDropDownIcon}
                >
                  <MenuItem value="">
                    <GreyTextTypography>
                      Select your employer
                    </GreyTextTypography>
                  </MenuItem>
                  <MenuItem value="__other">Other</MenuItem>
                  {this.props.employers.map((employer: Employer) => (
                    <MenuItem key={employer.id} value={employer.id}>
                      {employer.name}
                    </MenuItem>
                  ))}
                </OutlinedSelect>
              </Grid>

              {this.state.createEmployer && (
                <React.Fragment>
                  {" "}
                  <Grid item>
                    <BlackHeaderTypography>
                      Organization Name*
                    </BlackHeaderTypography>
                    <OutlinedTextField
                      className={this.props.classes.textField}
                      placeholder="Enter your organization’s name"
                      name="orgName"
                      value={this.props.experience.orgName}
                      onChange={this.props.handleNestedChange(
                        this.props.experience
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <BlackHeaderTypography>
                      Organization Sector
                    </BlackHeaderTypography>
                    <Autocomplete
                      className={this.props.classes.dropDowns}
                      size="small"
                      value={this.props.picklistInfo.sectors}
                      getOptionLabel={(option) => option}
                      options={
                        this.props.picklistInfo.sectors === null
                          ? this.props.picklists.sectors.list
                          : [
                              this.props.picklistInfo.sectors,
                              ...this.props.picklists.sectors.list,
                            ]
                      }
                      onChange={(_event, newValue) =>
                        this.props.handleNestedChangeAutocomplete(
                          "sectors",
                          newValue
                        )
                      }
                      filterSelectedOptions
                      renderInput={(params) => (
                        <OutlinedTextField
                          {...params}
                          variant="outlined"
                          placeholder="Select your preferred pronoun"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <BlackHeaderTypography>
                      Organization Website
                    </BlackHeaderTypography>
                    <OutlinedTextField
                      className={this.props.classes.textField}
                      placeholder="Enter your organization's website"
                      name="orgWebsite"
                      value={this.props.experience.orgWebsite}
                      onChange={this.props.handleNestedChange(
                        this.props.experience
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <BlackHeaderTypography>
                      Organization Social Media
                    </BlackHeaderTypography>
                    <OutlinedTextField
                      className={this.props.classes.textField}
                      placeholder="Enter your organization's social media link"
                      name="orgSocialMedia"
                      value={this.props.experience.orgSocialMedia}
                      onChange={this.props.handleNestedChange(
                        this.props.experience
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <BlackHeaderTypography>
                      Organization Street Address
                    </BlackHeaderTypography>
                    <OutlinedTextField
                      className={this.props.classes.textField}
                      placeholder="e.g Street Number, street name"
                      name="orgStreetAddr"
                      value={this.props.experience.orgStreetAddr}
                      onChange={this.props.handleNestedChange(
                        this.props.experience
                      )}
                    />
                  </Grid>
                  <Grid item container direction="row" spacing={2}>
                    <Grid item>
                      <FormControl>
                        <BlackHeaderTypography>
                          Organization City
                        </BlackHeaderTypography>
                        <OutlinedTextField
                          className={this.props.classes.textField}
                          placeholder="Enter Organization's City"
                          name="orgCity"
                          style={{ width: "232px" }}
                          value={this.props.experience.orgCity}
                          onChange={this.props.handleNestedChange(
                            this.props.experience
                          )}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <BlackHeaderTypography>
                          Organization Postal Code
                        </BlackHeaderTypography>
                        <OutlinedTextField
                          className={this.props.classes.textField}
                          placeholder="A1A 1A1"
                          name="orgPostalCode"
                          style={{ width: "232px" }}
                          value={this.props.experience.orgPostalCode}
                          onChange={this.props.handleNestedChange(
                            this.props.experience
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <BlackHeaderTypography>
                      Organization Phone
                    </BlackHeaderTypography>
                    <OutlinedTextField
                      className={this.props.classes.textField}
                      placeholder="e.g 000 000 0000"
                      type="number"
                      name="orgPhone"
                      value={this.props.experience.orgPhone}
                      onChange={this.props.handleNestedChange(
                        this.props.experience
                      )}
                    />
                  </Grid>
                </React.Fragment>
              )}

              <Grid item>
                <BlackHeaderTypography>
                  Department or Division
                </BlackHeaderTypography>
                <OutlinedTextField
                  className={this.props.classes.textField}
                  placeholder="Eg. Human Resources"
                  name="departmentDivision"
                  value={this.props.experience.departmentDivision}
                  onChange={this.props.handleNestedChange(
                    this.props.experience
                  )}
                />
              </Grid>

              <Grid item>
                <BlackHeaderTypography>
                  Number of Staff in Organization
                </BlackHeaderTypography>
                <Autocomplete
                  className={this.props.classes.dropDowns}
                  size="small"
                  value={this.props.picklistInfo.size}
                  getOptionLabel={(option) => option}
                  options={
                    this.props.picklistInfo.size === null
                      ? this.props.picklists.size.list
                      : [
                          this.props.picklistInfo.size,
                          ...this.props.picklists.size.list,
                        ]
                  }
                  onChange={(_event, newValue) =>
                    this.props.handleNestedChangeAutocomplete(
                      "size",
                      newValue
                    )
                  }
                  filterSelectedOptions
                  renderInput={(params) => (
                    <OutlinedTextField
                      {...params}
                      variant="outlined"
                      placeholder="Select your preferred pronoun"
                    />
                  )}
                />
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
            </div>
            <Divider />
            <div className={this.props.classes.formSection}>
              <Grid item>
                <BlackHeaderTypography
                  style={{ marginBottom: "2em" }}
                  variant="h3"
                >
                  Your knowledge and expertise
                </BlackHeaderTypography>
              </Grid>

              <Grid item>
                <BlackHeaderTypography>
                  Areas of Expertise*
                </BlackHeaderTypography>

                <Autocomplete
                  multiple
                  id="expertiseAreas"
                  size="small"
                  className={this.props.classes.dropDowns}
                  options={this.props.picklists.expertiseAreas.list}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  onChange={(_event, newValue) =>
                    this.props.handleNestedChangeAutocomplete(
                      "expertiseAreas",
                      newValue
                    )
                  }
                  renderInput={(params) => (
                    <OutlinedTextField
                      {...params}
                      variant="outlined"
                      placeholder="Select Activity Areas of Expertise"
                    />
                  )}
                />
              </Grid>

              <Grid
                item
                container
                direction="column"
                className={this.props.classes.underCheckbox}
              >
                <BlackHeaderTypography
                  className={this.props.classes.checkboxSubheader}
                  style={{ paddingTop: "10px", paddingBottom: "8px" }}
                >
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

              <Grid item>
                <BlackHeaderTypography>Languages</BlackHeaderTypography>
                <Autocomplete
                  multiple
                  className={this.props.classes.dropDowns}
                  id="languages"
                  size="small"
                  options={this.props.picklists.languages.list}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  onChange={(_event, newValue) =>
                    this.props.handleNestedChangeAutocomplete(
                      "languages",
                      newValue
                    )
                  }
                  renderInput={(params) => (
                    <OutlinedTextField
                      {...params}
                      variant="outlined"
                      placeholder="Select Additional Languages you speak"
                    />
                  )}
                />
              </Grid>

              <Grid item>
                <BlackHeaderTypography>
                  Description of my Career*
                </BlackHeaderTypography>
                <OutlinedTextField
                  className={this.props.classes.textField}
                  placeholder="1 Sentence"
                  required={true}
                  name="careerDescription"
                  value={this.props.experience.careerDescription}
                  onChange={this.props.handleNestedChange(
                    this.props.experience
                  )}
                />
              </Grid>

              <Grid item>
                <BlackHeaderTypography>
                  How I got involved in my field*
                </BlackHeaderTypography>
                <OutlinedTextField
                  className={this.props.classes.textField}
                  placeholder="1 sentence"
                  required={true}
                  name="fieldInvolvementDescription"
                  value={this.props.experience.fieldInvolvementDescription}
                  onChange={this.props.handleNestedChange(
                    this.props.experience
                  )}
                />
              </Grid>

              <Grid item>
                <BlackHeaderTypography>
                  Other information I'd like schools to read
                </BlackHeaderTypography>
                <OutlinedTextField
                  className={this.props.classes.textField}
                  placeholder="e.g other topics you can talk about, etc"
                  name="extraDescription"
                  value={this.props.experience.extraDescription}
                  onChange={this.props.handleNestedChange(
                    this.props.experience
                  )}
                />
              </Grid>
            </div>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default Experience;
