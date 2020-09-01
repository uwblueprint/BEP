import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

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
            container
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
              label={<BlackTextTypography> {option}</BlackTextTypography>}
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
                  <BlackHeaderTypography>About Your Work</BlackHeaderTypography>
                </Grid>
                <Grid item>
                  <BlackHeaderTypography>
                    Ways I/my company would like to volunteer with schools
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
                      Are you already affiliated with a particular school board
                      or school for the purposes of co-op placements?
                    </BlackHeaderTypography>
                  </Grid>
                  <Grid item>
                    <OutlinedSelect
                      value={this.props.picklistInfo.employmentStatus}
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

                <Grid item container direction="column">
                  <Grid item>
                    <BlackHeaderTypography>
                      Areas willing to volunteer
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
                      Grade levels willing to volunteer with
                    </BlackHeaderTypography>
                  </Grid>
                  <Grid item className={this.props.classes.multiSelect}>
                    {displayPicklistOptions(
                      this.props.picklistInfo.grades,
                      "grades"
                    )}
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
