import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import {
  ContainedSelect,
  ContainedButton,
  DarkContainedButton,
  TextButton,
  Dialog,
  DialogTitle,
  PageBody,
  BlackHeaderTypography,
  BlackTextTypography,
} from "../../../components/index";
import Typography from "@material-ui/core/Typography";

import {
  getAllActivitiesPicklist,
  getExpertiesAreasPicklist,
  getLocationsPicklist,
  getPostSecondaryTrainingPicklist,
  getGradesPicklist,
  getLanguagesPicklist,
} from "../../../data/selectors/picklistSelector";

import { Grid } from "@material-ui/core";

import { fetchUserPicklistService } from "../../../data/services/picklistServices";

import Experience from "./Experience";
import PersonalInfo from "./PersonalInfo";
import Involvement from "./Involvement";

import { PicklistType } from "../../../data/types/picklistTypes";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

interface IComponentProps {
  picklists: {
    localPostSecondaryAlumni: { list: string[] };
    membershipsAssociations: { list: string[] };
    employmentStatus: {list: string[]};
    orgSector: {list: string[]};
    orgNumberStaff: {list: string[]};
    expertiseAreas: {list: string[]};
    introductionMethod: {list: string[]};
    languages: {list: string[]};
    volunteerDesiredExternalActivities: {list: string[]};
    volunteerDesiredInternalActivities: {list: string[]};
  };
  fetchUserPicklists: any;
}

interface IComponentState {
  currentStep: number;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  preferredPronouns: string;
  phoneNumber: string;
  linkedinUrl: string;
  isSubscribed: boolean;
  agreeConditions: boolean;
  picklistInfo: {  ;
    ;
  };
}

class Master extends React.Component<IComponentProps, IComponentState> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentStep: 1,

      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      preferredPronouns: "",
      phoneNumber: "",
      linkedinUrl: "",
      membershipsAssociations: [],
      agreeConditions: false,
      isSubscribed: false,
      picklistInfo: { localPostSecondaryAlumni: "", employmentStatus: "" },
    };
    this.handleChange = this.handleChange.bind(this);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  _next() {
    let currentStep = this.state.currentStep;
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  }
  _prev() {
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  }

  handleChange(event: any) {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  }

  handleSubmit = (event: any) => {
    //todo
    event.preventDefault();
    const { email, password } = this.state;
  };

  get previousButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary"
          type="button"
          onClick={this._prev}
        >
          Previous
        </button>
      );
    }
    // ...else return nothing
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if (currentStep < 3) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={this._next}
        >
          Next
        </button>
      );
    }
    // ...else render nothing
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <PageBody>
          <div style={{ marginTop: "5em" }}>
            <BlackTextTypography>
              <Link to="/">Back</Link>{" "}
            </BlackTextTypography>
            <Typography variant="h1">
              Register for a volunteer account
            </Typography>
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
              <form onSubmit={this.handleSubmit}>
                <PersonalInfo
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange}
                  email={this.state.email}
                  password={this.state.password}
                  confirmPassword={this.state.confirmPassword}
                  firstName={this.state.firstName}
                />
                <Involvement
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange}
                  firstName={this.state.firstName}
                />
                <Experience
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange}
                  lastName={this.state.lastName}
                />
                {this.previousButton}
                {this.nextButton}
              </form>
            </Grid>
          </div>
        </PageBody>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    picklists: {
      activities: {
        displayName: "Activities",
        list: getAllActivitiesPicklist(state.picklists),
      },
      expertiseAreas: {
        displayName: "Areas of Expertise",
        list: getExpertiesAreasPicklist(state.picklists),
      },
      locations: {
        displayName: "Location",
        list: getLocationsPicklist(state.picklists),
      },
      training: {
        displayName: "Level of Training",
        list: getPostSecondaryTrainingPicklist(state.picklists),
      },
      languages: {
        displayName: "Language",
        list: getLanguagesPicklist(state.picklists),
      },
      grades: {
        displayName: "Audience Grade Level",
        list: getGradesPicklist(state.picklists),
      },
    },
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserPicklists: (picklistType: PicklistType) =>
    dispatch(fetchUserPicklistService(picklistType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Master);
