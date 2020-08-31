import React from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";

import {
    BlackHeaderTypography,
    BlackTextTypography
  } from "../../../components/index";
import FormControl from "@material-ui/core/FormControl";

interface IComponentProps {
  currentStep: number;
  experience: any;
  picklistInfo: any;
  handleChange: any; // () => void????
  handleNestedChange: any;
}

interface IComponentState {
  test: string;
}

class Experience extends React.Component<IComponentProps, IComponentState> {
  render() {
    if (this.props.currentStep !== 2) {
      // Prop: The current step
      return null;
    }
    // The markup for the Step 1 UI
    return (
      <div className="form-group">
        <React.Fragment>
                 <div style={{ height: "100vh" }}>
                    <Grid container style={{ height: "100%" }}>
                        <BlackHeaderTypography>About Your Work</BlackHeaderTypography>
                        <BlackHeaderTypography>
                            Employment Status
                        </BlackHeaderTypography>
                        <FormControl>
                        <Select
                        ></Select>
                        </FormControl>
                    </Grid>
                    </div>
            </React.Fragment>
      </div>
    );
  }
}

export default Experience;
