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

import {
  PicklistInfo,
  InvolvementState,
  RawPicklists,
} from "./Master";

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
      picklistName: string,
      selectMultiple: boolean
    ) => {
      return Array.from(picklistMap.entries(), (entry) => entry).map(
        ([option, isSelected]) => (
          <Grid
            container
            xs={12}
            key={option}
            spacing={0}
            justify="flex-start"
            alignItems="center"
          >
            <FormControlLabel
              control={
                <OutlinedCheckbox
                  key={option}
                  value={option}
                  name={option}
                  checked={isSelected}
                  onChange={
                    selectMultiple
                      ? this.props.createHandleSelectOption(picklistName)
                      : this.props.handleNestedChangePicklist(picklistName)
                  }
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
                spacing={2}
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
                <Grid item>
                  <BlackHeaderTypography>
                    Ways I/my company would like to volunteer with schools*
                  </BlackHeaderTypography>
                </Grid>

                <Grid item>
                  <BlackHeaderTypography>Inside Schools</BlackHeaderTypography>
                </Grid>

                <Grid item className={this.props.classes.multiSelect}>
                  {displayPicklistOptions(
                    this.props.picklistInfo.volunteerDesiredInternalActivities,
                    "volunteerDesiredInternalActivities",
                    true
                  )}
                </Grid>
                <Grid item>
                  <BlackHeaderTypography>Outside Schools</BlackHeaderTypography>
                </Grid>
                <Grid item className={this.props.classes.multiSelect}>
                  {displayPicklistOptions(
                    this.props.picklistInfo.volunteerDesiredExternalActivities,
                    "volunteerDesiredExternalActivities",
                    true
                  )}
                </Grid>

                {this.props.picklistInfo.volunteerDesiredExternalActivities.get(
                  "Provide Co-op Placement"
                ) && (
                  <Grid
                    item
                    container
                    spacing={2}
                    direction="column"
                    style={{
                      paddingLeft: "3em",
                    }}
                  >
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
                    <Grid item>
                      {displayPicklistOptions(
                        this.props.picklistInfo.coopPlacementTime,
                        "coopPlacementTime",
                        true
                      )}
                    </Grid>
                    <Grid item>
                      <BlackHeaderTypography>
                        How are you willing to host a student?
                      </BlackHeaderTypography>
                    </Grid>
                    <Grid item>
                      {displayPicklistOptions(
                        new Map<string, boolean>(
                          this.props.picklists.coopPlacementMode.list.map(
                            (entry) => [
                              entry,
                              entry ===
                                this.props.picklistInfo.coopPlacementMode,
                            ]
                          )
                        ),
                        "coopPlacementMode",
                        false
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
                        style={{ height: "40px", width: "454px" }}
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

                <Grid item>
                  <BlackHeaderTypography>
                    Areas willing to volunteer*
                  </BlackHeaderTypography>
                </Grid>
                <Grid item className={this.props.classes.multiSelect}>
                  {displayPicklistOptions(
                    this.props.picklistInfo.locations,
                    "locations",
                    true
                  )}
                </Grid>
                <Grid item>
                  <BlackHeaderTypography>
                    Grade levels willing to volunteer with*
                  </BlackHeaderTypography>
                </Grid>
                <Grid item>
                  {displayPicklistOptions(
                    this.props.picklistInfo.grades,
                    "grades",
                    true
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
                    rows={16}
                    maxRows={16}
                    placeholder="Enter answer..."
                    style={{ width: "454px" }}
                    name="reasonsForVolunteering"
                    value={this.props.involvement.reasonsForVolunteering}
                    onChange={this.props.handleNestedChange(
                      this.props.involvement
                    )}
                    required={true}
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
                <Grid item>
                  <Divider />
                </Grid>
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
                    style={{ height: "40px", width: "454px" }}
                    required={true}
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
                    "followedPrograms",
                    true
                  )}
                </Grid>
                <Grid item>
                  <Divider />
                </Grid>
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
                        required={true}
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Involvement;
