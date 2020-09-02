import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";

import {
  BlackHeaderTypography,
  BlackTextTypography,
  OutlinedTextField,
  OutlinedCheckbox,
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
  handleNestedChangeAutocomplete: any;
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
      selectMultiple: boolean,
      selectAll: boolean
    ) => {
      const picklistArray = Array.from(picklistMap.entries(), (entry) => entry);
      let checkboxes = selectAll
        ? [
            <Grid
              container
              xs={12}
              key={"_select_all"}
              spacing={0}
              justify="flex-start"
              alignItems="center"
              style={{ display: "inline-block" }}
            >
              <FormControlLabel
                control={
                  <OutlinedCheckbox
                    key="_select_all"
                    value="_select_all"
                    name="_select_all"
                    checked={
                      picklistArray.reduce(
                        (allSelected, [option, isSelected]) => [
                          "",
                          allSelected[1] && isSelected,
                        ],
                        ["", true]
                      )[1]
                    }
                    onChange={(event: any) => {
                      picklistArray.forEach(([option, isSelected]) => {
                        if (isSelected !== event.target.checked) {
                          event.target.name = option;
                          this.props.createHandleSelectOption(picklistName)(
                            event
                          );
                        }
                      });
                    }}
                  />
                }
                label={<BlackTextTypography>Select All</BlackTextTypography>}
              />
            </Grid>,
          ]
        : [];
      checkboxes = checkboxes.concat(
        picklistArray.map(([option, isSelected]) => (
          <Grid
            container
            xs={12}
            key={option}
            spacing={0}
            justify="flex-start"
            alignItems="center"
            style={{ display: "inline-block" }}
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
              label={<BlackTextTypography> {option}</BlackTextTypography>}
            />
          </Grid>
        ))
      );

      return checkboxes;
    };

    return (
      <React.Fragment>
        <div style={{ height: "100%" }}>
          <Grid container style={{ height: "100%" }}>
            <Grid
              container
              spacing={2}
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
                    Your Activities
                  </BlackHeaderTypography>
                </Grid>
                <Grid item>
                  <BlackHeaderTypography
                    className={this.props.classes.checkboxHeader}
                    style={{ paddingBottom: "12px" }}
                  >
                    Ways I/my company would like to volunteer with schools*
                  </BlackHeaderTypography>
                </Grid>
                <Grid item>
                  <BlackTextTypography
                    className={this.props.classes.checkboxSubHeader}
                  >
                    Inside Schools
                  </BlackTextTypography>
                </Grid>
                <Grid item className={this.props.classes.multiSelect}>
                  {displayPicklistOptions(
                    this.props.picklistInfo.volunteerDesiredInternalActivities,
                    "volunteerDesiredInternalActivities",
                    true,
                    false
                  )}
                </Grid>
                <Grid item>
                  <BlackTextTypography
                    className={this.props.classes.checkboxSubHeader}
                  >
                    Outside Schools
                  </BlackTextTypography>
                </Grid>
                <Grid item className={this.props.classes.multiSelect}>
                  {displayPicklistOptions(
                    this.props.picklistInfo.volunteerDesiredExternalActivities,
                    "volunteerDesiredExternalActivities",
                    true,
                    false
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
                      paddingLeft: "2em",
                    }}
                  >
                    <Grid item>
                      <BlackHeaderTypography
                        className={this.props.classes.checkboxSubHeader}
                      >
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
                        true,
                        false
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
                        false,
                        false
                      )}
                    </Grid>
                    <Grid item style={{ columns: "2 auto" }}>
                      <BlackHeaderTypography>
                        Are you already affiliated with a particular school
                        board or school for the purposes of co-op placements?
                      </BlackHeaderTypography>
                    </Grid>
                    <Grid item>
                      <Autocomplete
                        className={this.props.classes.dropDowns}
                        size="small"
                        value={
                          this.props.picklistInfo.coopPlacementSchoolAffiliation
                        }
                        getOptionLabel={(option) => option}
                        options={
                          this.props.picklistInfo
                            .coopPlacementSchoolAffiliation === null
                            ? this.props.picklists
                                .coopPlacementSchoolAffiliation.list
                            : [
                                this.props.picklistInfo
                                  .coopPlacementSchoolAffiliation,
                                ...this.props.picklists
                                  .coopPlacementSchoolAffiliation.list,
                              ]
                        }
                        onChange={(_event, newValue) =>
                          this.props.handleNestedChangeAutocomplete(
                            "coopPlacementSchoolAffiliation",
                            newValue
                          )
                        }
                        filterSelectedOptions
                        renderInput={(params) => (
                          <OutlinedTextField
                            {...params}
                            variant="outlined"
                            placeholder="Select school board if application pronoun"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                )}
                <Grid item>
                  <BlackHeaderTypography
                    className={this.props.classes.checkboxHeader}
                  >
                    Areas willing to volunteer*
                  </BlackHeaderTypography>
                </Grid>
                <Grid item className={this.props.classes.multiSelect}>
                  {displayPicklistOptions(
                    this.props.picklistInfo.locations,
                    "locations",
                    true,
                    true
                  )}
                </Grid>
                <Grid item>
                  <BlackHeaderTypography
                    className={this.props.classes.checkboxHeader}
                  >
                    Grade levels willing to volunteer with*
                  </BlackHeaderTypography>
                </Grid>
                <Grid item className={this.props.classes.underCheckbox}>
                  {displayPicklistOptions(
                    this.props.picklistInfo.grades,
                    "grades",
                    true,
                    true
                  )}
                </Grid>
                <Grid item>
                  <BlackHeaderTypography>
                    Why do you want to get involved with the BEP?*
                  </BlackHeaderTypography>
                </Grid>
                <Grid item>
                  <OutlinedTextField
                    multiline
                    rows={16}
                    placeholder="Enter answer..."
                    className={this.props.classes.textField}
                    name="reasonsForVolunteering"
                    value={this.props.involvement.reasonsForVolunteering}
                    onChange={this.props.handleNestedChange(
                      this.props.involvement
                    )}
                    required={true}
                  />
                </Grid>{" "}
                <Grid item>
                  <BlackHeaderTypography>
                    What advice would you give to young people who are making
                    decisions about their future careers?
                  </BlackHeaderTypography>
                </Grid>
                <Grid item>
                  <OutlinedTextField
                    placeholder="1 Sentence"
                    style={{ width: "454px" }}
                    name="adviceForStudents"
                    className={this.props.classes.textField}
                    value={this.props.involvement.adviceForStudents}
                    onChange={this.props.handleNestedChange(
                      this.props.involvement
                    )}
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
                    Connections & Conditions
                  </BlackHeaderTypography>
                </Grid>
                <Grid item>
                  <BlackHeaderTypography>
                    How did you hear about us?*
                  </BlackHeaderTypography>
                </Grid>
                <Grid item>
                  <Autocomplete
                    className={this.props.classes.dropDowns}
                    size="small"
                    value={this.props.picklistInfo.introductionMethod}
                    getOptionLabel={(option) => option}
                    options={
                      this.props.picklistInfo.introductionMethod === null
                        ? this.props.picklists.introductionMethod.list
                        : [
                            this.props.picklistInfo.introductionMethod,
                            ...this.props.picklists.introductionMethod.list,
                          ]
                    }
                    onChange={(_event, newValue) =>
                      this.props.handleNestedChangeAutocomplete(
                        "introductionMethod",
                        newValue
                      )
                    }
                    filterSelectedOptions
                    renderInput={(params) => (
                      <OutlinedTextField
                        {...params}
                        variant="outlined"
                        placeholder="e.g. Event, internet search, etc."
                      />
                    )}
                  />
                </Grid>
                <Grid item>
                  <BlackHeaderTypography
                    className={this.props.classes.checkboxHeader}
                  >
                    Which BEP programs would you like more information about?
                  </BlackHeaderTypography>
                </Grid>
                <Grid item className={this.props.classes.multiSelect}>
                  {displayPicklistOptions(
                    this.props.picklistInfo.followedPrograms,
                    "followedPrograms",
                    true,
                    false
                  )}
                </Grid>
              </div>
              <Divider />
              <div className={this.props.classes.formSection}>
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
              </div>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default Involvement;
