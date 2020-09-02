import React from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

import {
  BlackHeaderTypography,
  BlackTextTypography,
  OutlinedTextField,
  OutlinedCheckbox,
} from "../../../components/index";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

import Autocomplete from "@material-ui/lab/Autocomplete";

interface IComponentProps {
  currentStep: number;
  picklistInfo: {
    localPostSecondaryInstitutions: string[]; //local post secondary alumni
    professionalAssociations: string[];
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
  involvement: {
    reasonsForVolunteering: string;
    futureAdvice: string;
    introductionMethod: string;
    isSubscribed: boolean;
    agreeConditions: boolean;
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
  classes: any;
}

interface IComponentState {
  test: string;
}

class Involvement extends React.Component<IComponentProps, IComponentState> {
  render() {
    if (this.props.currentStep !== 3) {
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
                <Grid item>
                  <BlackHeaderTypography>About Your Work</BlackHeaderTypography>
                </Grid>
                <Grid item>
                  <BlackHeaderTypography>
                    Ways I/my company would like to volunteer with schools
                  </BlackHeaderTypography>
                </Grid>

                <Grid container direction="column">
                  <BlackHeaderTypography>Inside Schools</BlackHeaderTypography>
                  <Grid className={this.props.classes.multiSelect}>
                    {Array.from(
                      this.props.picklistInfo.volunteerDesiredInternalActivities.entries(),
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
                              "volunteerDesiredInternalActivities"
                            )}
                          />
                        </Grid>
                        <Grid item xs={11}>
                          <BlackTextTypography> {option}</BlackTextTypography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                  <BlackHeaderTypography>Outside Schools</BlackHeaderTypography>
                  <Grid className={this.props.classes.multiSelect}>
                    {Array.from(
                      this.props.picklistInfo.volunteerDesiredExternalActivities.entries(),
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
                              "volunteerDesiredExternalActivities"
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
                <Grid container direction="column">
                  <BlackHeaderTypography>
                    Co-op placement details
                  </BlackHeaderTypography>
                  <BlackHeaderTypography>
                    When are you willing to host a student? (check all that
                    apply)
                  </BlackHeaderTypography>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Involvement;
