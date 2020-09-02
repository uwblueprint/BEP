import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";

import {
  BlackHeaderTypography,
  BlackTextTypography,
  OutlinedTextField,
  OutlinedCheckbox,
  OutlinedSelect,
} from "../../../components/index";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

import Autocomplete from "@material-ui/lab/Autocomplete";

import { PicklistInfo, InvolvementState, RawPicklists } from "./Master";

interface IComponentProps {
  currentStep: number;
  picklistInfo: PicklistInfo;
  involvement: InvolvementState;
  picklists: RawPicklists;
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

    const displayPicklistOptions = (
      picklistMap: Map<string, boolean>,
      picklistName: string
    ) => {
      return Array.from(picklistMap.entries(), (entry) => entry).map(
        ([option, isSelected]) => (
          <Grid
            item
            container
            xs={12}
            key={option}
            spacing={0}
            justify="flex-start"
            // justify="flex-end"
            alignItems="center"
          >
            <FormControlLabel
              control={
                <OutlinedCheckbox
                  key={option}
                  value={option}
                  name={option}
                  onChange={this.props.createHandleSelectOption(picklistName)}
                />
              }
              label={
                <BlackTextTypography style={{ width: "100%" }}>
                  {" "}
                  {option}
                </BlackTextTypography>
              }
            />
          </Grid>
        )
      );
    };
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
                  <BlackHeaderTypography>Your Activities</BlackHeaderTypography>
                </Grid>
                <Grid item>
                  <BlackHeaderTypography>
                    Ways I/my company would like to volunteer with schools*
                  </BlackHeaderTypography>
                </Grid>

                <Grid item container direction="column">
                  <Grid item>
                    <BlackHeaderTypography>
                      Inside Schools
                    </BlackHeaderTypography>
                  </Grid>
                  <Grid item className={this.props.classes.multiSelect}>
                    {displayPicklistOptions(
                      this.props.picklistInfo
                        .volunteerDesiredInternalActivities,
                      "volunteerDesiredInternalActivities"
                    )}
                  </Grid>
                  <Grid item>
                    <BlackHeaderTypography>
                      Outside Schools
                    </BlackHeaderTypography>
                  </Grid>
                  <Grid item className={this.props.classes.multiSelect}>
                    {displayPicklistOptions(
                      this.props.picklistInfo
                        .volunteerDesiredExternalActivities,
                      "volunteerDesiredExternalActivities"
                    )}
                  </Grid>
                </Grid>
                {this.props.picklistInfo.volunteerDesiredExternalActivities.get(
                  "Provide Co-op Placement"
                ) && (
                  <Grid item container direction="column">
                    <Grid item>
                      <BlackHeaderTypography>
                        Co-op placement details
                      </BlackHeaderTypography>
                    </Grid>
                    <Grid item>
                      <BlackHeaderTypography>
                        When are you willing to host a student? (check all that
                        apply)
                      </BlackHeaderTypography>
                    </Grid>
                    <Grid item className={this.props.classes.multiSelect}>
                      {displayPicklistOptions(
                        this.props.picklistInfo.coopPlacementTime,
                        "coopPlacementTime"
                      )}
                    </Grid>
                    <Grid item>
                      <BlackHeaderTypography>
                        How are you willing to host a student? (check all that
                        apply)
                      </BlackHeaderTypography>
                    </Grid>
                    <Grid item className={this.props.classes.multiSelect}>
                      {displayPicklistOptions(
                        this.props.picklistInfo.coopPlacementMode,
                        "coopPlacementMode"
                      )}
                    </Grid>
                    <Grid item>
                      <BlackHeaderTypography>
                        Are you already affiliated with a particular school
                        board or school for the purposes of co-op placements?
                      </BlackHeaderTypography>
                    </Grid>
                    <Grid item>
                      <OutlinedSelect
                        value={
                          this.props.picklistInfo.coopPlacementSchoolAffiliation
                        }
                        displayEmpty
                        disableUnderline={true}
                        onChange={this.props.handleNestedChangePicklist(
                          "coopPlacementSchoolAffiliation"
                        )}
                        style={{ height: "40px" }}
                      >
                        <MenuItem value="" disabled>
                          Select school board if applicable
                        </MenuItem>
                        {Array.from(
                          this.props.picklists.coopPlacementSchoolAffiliation.list.entries(),
                          (entry) => entry
                        ).map((entry, index) => (
                          <MenuItem key={index} value={entry[1]}>
                            {entry[1]}
                          </MenuItem>
                        ))}
                      </OutlinedSelect>
                    </Grid>
                  </Grid>
                )}

                <Grid item container direction="column">
                  <Grid item>
                    <BlackHeaderTypography>
                      Areas willing to volunteer*
                    </BlackHeaderTypography>
                  </Grid>
                  <Grid item className={this.props.classes.multiSelect}>
                    {displayPicklistOptions(
                      this.props.picklistInfo.locations,
                      "locations"
                    )}
                  </Grid>
                  <Grid item>
                    <BlackHeaderTypography>
                      Grade levels willing to volunteer with*
                    </BlackHeaderTypography>
                  </Grid>
                  <Grid item className={this.props.classes.multiSelect}>
                    {displayPicklistOptions(
                      this.props.picklistInfo.grades,
                      "grades"
                    )}
                  </Grid>
                  <Grid item>
                    <BlackHeaderTypography>
                      Why do you want to get involved with the BEP?*
                    </BlackHeaderTypography>
                  </Grid>
                  <Grid item className={this.props.classes.multiSelect}>
                    <OutlinedTextField
                      multiline
                      rows={8}
                      maxRows={8}
                      placeholder="Enter answer..."
                      style={{ width: "454px" }}
                      name="reasonsForVolunteering"
                      value={this.props.involvement.reasonsForVolunteering}
                      onChange={this.props.handleNestedChange(
                        this.props.involvement
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <BlackHeaderTypography>
                      What advice would you give to young people who are making
                      decisions about their future careers?
                    </BlackHeaderTypography>
                  </Grid>
                  <Grid item className={this.props.classes.multiSelect}>
                    <OutlinedTextField
                      placeholder="1 Sentence"
                      style={{ width: "454px" }}
                      name="adviceForStudents"
                      value={this.props.involvement.adviceForStudents}
                      onChange={this.props.handleNestedChange(
                        this.props.involvement
                      )}
                    />
                  </Grid>
                </Grid>
                <Divider />
                <Grid item container direction="column">
                  <Grid item>
                    <BlackHeaderTypography>
                      Connections & Conditions
                    </BlackHeaderTypography>
                  </Grid>
                  <Grid item>
                    <BlackHeaderTypography>
                      How did you hear about us?*
                    </BlackHeaderTypography>
                  </Grid>
                  <Grid item>
                    <OutlinedSelect
                      value={this.props.picklistInfo.introductionMethod}
                      displayEmpty
                      disableUnderline={true}
                      onChange={this.props.handleNestedChangePicklist(
                        "introductionMethod"
                      )}
                      style={{ height: "40px" }}
                    >
                      <MenuItem value="" disabled>
                        e.g. Event, internet search, etc.
                      </MenuItem>
                      {Array.from(
                        this.props.picklists.introductionMethod.list.entries(),
                        (entry) => entry
                      ).map((entry, index) => (
                        <MenuItem key={index} value={entry[1]}>
                          {entry[1]}
                        </MenuItem>
                      ))}
                    </OutlinedSelect>
                  </Grid>
                  <Grid item>
                    <BlackHeaderTypography>
                      Which BEP programs would you like more information about?
                    </BlackHeaderTypography>
                  </Grid>
                  <Grid item className={this.props.classes.multiSelect}>
                    {displayPicklistOptions(
                      this.props.picklistInfo.followedPrograms,
                      "followedPrograms"
                    )}
                  </Grid>
                </Grid>
                <Grid item container direction="column">
                  <Divider />
                  <Grid item>
                    <FormControlLabel
                      control={
                        <OutlinedCheckbox
                          name="isSubscribed"
                          checked={this.props.involvement.isSubscribed}
                          onChange={this.props.handleNestedChange(
                            this.props.involvement
                          )}
                        />
                      }
                      label={
                        <BlackHeaderTypography>
                          I would like to subscribe to the BEP newsletter
                        </BlackHeaderTypography>
                      }
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <OutlinedCheckbox
                          name="agreeConditions"
                          checked={this.props.involvement.agreeConditions}
                          onChange={this.props.handleNestedChange(
                            this.props.involvement
                          )}
                        />
                      }
                      label={
                        <BlackHeaderTypography>
                          I agree to the BEP terms and conditions*
                        </BlackHeaderTypography>
                      }
                    />
                  </Grid>
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
