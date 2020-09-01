import React from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";

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

import Autocomplete from "@material-ui/lab/Autocomplete";
import { ExperienceState } from "./Master";

import Employer from "../../../data/types/employerTypes";

interface IComponentProps {
  currentStep: number;
  experience: ExperienceState;
  employers: Employer[];
  classes: {
    multiSelect: any;
  };
  picklistInfo: {
    localPostSecondaryInstitutions: Map<string, boolean>; //local post secondary alumni
    professionalAssociations: Map<string, boolean>;
    employmentStatus: string;
    sectors: string; // somehow need to get picklist of
    size: string;
    expertiseAreas: string[];
    introductionMethod: string;
    languages: string[];
    volunteerDesiredExternalActivities: Map<string, boolean>;
    volunteerDesiredInternalActivities: Map<string, boolean>;
    postSecondaryTraining: Map<string, boolean>;
    moreInfo: Map<string, boolean>;
    grades: Map<string, boolean>; // grade levels willing to volunteer with
    locations: Map<string, boolean>;
  };
  picklists: {
    expertiseAreas: { list: string[] };
    languages: { list: string[] };
    grades: { list: string[] }; // grade levels willing to volunteer with
    locations: { list: string[] };

    // uncomment these out once you set up all these routes Faizaan
    localPostSecondaryInstitutions: { list: string[] }; //local post secondary alumni
    professionalAssociations: { list: string[] };
    employmentStatus: { list: string[] };
    sectors: { list: string[] }; // somehow need to get picklist of
    size: { list: string[] };
    introductionMethod: { list: string[] };
    volunteerDesiredExternalActivities: { list: string[] };
    volunteerDesiredInternalActivities: { list: string[] };
    postSecondaryTraining: { list: string[] };
  };
  handleChange: any; // () => void????
  handleNestedChange: any;
  handleNestedChangePicklist: any;
  createHandleSelectOption: any;
  handleNestedChangeMultiAutocomplete: any;
}

// const styles = () => ({
//     formSection: {
//       padding: "2.5em 3em 0.5em 3em",
//     },
//     textField: {
//       marginBottom: "26px",
//       marginTop: "4px",
//     },
//     dropDowns: {
//       marginTop: "4px",
//       width: "45%",
//     },
//   });

interface IComponentState {
  experience: {
    jobTitle: string;
    orgName: string;
    orgWebsite: string;
    orgSocialMedia: string; // this seems hard a low priority (need to add)
    orgStreetAddr: string;
    orgCity: string;
    orgPostalCode: string;
    orgPhone: string;
    departmentDivision: string; // currenlty not in userTYpes
    careerDescription: string;
    involveMethod: string; // currently not in userTypes
    extraDescription: string; // other info i'd like schools to read
  };
}

class Experience extends React.Component<IComponentProps, IComponentState> {
  constructor(props: any) {
    super(props);
  }
  render() {
    if (this.props.currentStep !== 2) {
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
                  padding: "3em",
                  backgroundColor: "#fff",
                  borderRadius: "2px",
                  margin: "2em 0em",
                }}
              >
                <Grid item>
                  <BlackHeaderTypography>About Your Work</BlackHeaderTypography>
                </Grid>

                <Grid item direction="column">
                  <FormControl style={{ width: "454px" }}>
                    <BlackHeaderTypography>
                      Employment Status
                    </BlackHeaderTypography>
                    <OutlinedSelect
                      value={this.props.picklistInfo.employmentStatus}
                      displayEmpty
                      disableUnderline={true}
                      onChange={(event: any) =>
                        this.props
                          .handleNestedChangePicklist(this.props.picklistInfo)
                          .bind(
                            event,
                            "employmentStatus"
                          )(event)
                      }
                      style={{ height: "40px" }}
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
                      {/* {this.props.picklists.employmentStatus.list.map(
                        (entry, index) => (
                          <MenuItem key={index} value={entry}>
                            {entry}
                          </MenuItem>
                        )
                      )} */}
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
                    />
                  </FormControl>
                </Grid>

                <Grid item direction="column">
                  <FormControl style={{ width: "454px" }}>
                    <BlackHeaderTypography>Employer</BlackHeaderTypography>
                    <OutlinedSelect
                      name="employerId"
                      value={this.props.experience.employerId}
                      onChange={this.props.handleNestedChange(
                        this.props.experience
                      )}
                      style={{ height: "40px" }}
                      displayEmpty
                      disableUnderline={true}
                    >
                      <MenuItem value="" disabled>
                        Select your employer
                      </MenuItem>
                      {this.props.employers.map((employer: Employer) => (
                        <MenuItem key={employer.id} value={employer.id}>
                          {employer.name}
                        </MenuItem>
                      ))}
                    </OutlinedSelect>
                  </FormControl>
                </Grid>

                <Grid item direction="column">
                  <FormControl style={{ width: "454px" }}>
                    <BlackHeaderTypography>
                      Organization Sector
                    </BlackHeaderTypography>
                    <OutlinedSelect
                      value={this.props.picklistInfo.sectors}
                      name="sectors"
                      displayEmpty
                      disableUnderline={true}
                      onChange={this.props.handleNestedChangePicklist(
                        this.props.picklistInfo
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

                <Grid container direction="row" spacing={2}>
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
                      value=""
                      name="size"
                      displayEmpty
                      disableUnderline={true}
                      onChange={this.props.handleNestedChangePicklist(
                        this.props.picklistInfo
                      )}
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

                <Grid container direction="column">
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
                <Grid item>
                  <BlackTextTypography>
                    Your knowledge and expertise
                  </BlackTextTypography>
                </Grid>

                <Grid item direction="column">
                  <BlackHeaderTypography>
                    Areas of Expertise
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

                <Grid container direction="column">
                  <BlackHeaderTypography>
                    Post Secondary Training I've participated in
                  </BlackHeaderTypography>
                  <Grid className={this.props.classes.multiSelect}>
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
                            <OutlinedCheckbox
                              key={option}
                              value={option}
                              name={option}
                              onChange={this.props.createHandleSelectOption(
                                "postSecondaryTraining"
                              )}
                            />
                          </Grid>
                          <Grid item xs={11}>
                            <BlackTextTypography> {option}</BlackTextTypography>
                          </Grid>
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
                      Description of my Career
                    </BlackHeaderTypography>
                    <OutlinedTextField
                      placeholder="1 Sentence"
                      id="title"
                      style={{ width: "454px" }}
                      value={this.props.experience.careerDescription}
                      onChange={this.props.handleNestedChange(
                        this.props.experience
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item direction="column">
                  <FormControl>
                    <BlackHeaderTypography>
                      How I got involved in my Field
                    </BlackHeaderTypography>
                    <OutlinedTextField
                      placeholder="I sentence"
                      id="title"
                      style={{ width: "454px" }}
                      value={this.props.experience.departmentDivision}
                      onChange={this.props.handleNestedChange(
                        this.props.experience
                      )}
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
                      id="title"
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

export default Experience;
