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
  getEmployerSectorsPicklist,
  getEmployerSizePicklist,
  getProfessionalAssociations,
  getLocalPostSecondaryInstitutions,
  getIntroductionMethod,
  getEmploymentStatus,
  getVolunteerDesiredExternalActivities,
  getVolunteerDesiredInternalActivities,
} from "../../../data/selectors/picklistSelector";

import { Grid } from "@material-ui/core";

import {
  fetchUserPicklistService,
  fetchEmployerPicklistService,
} from "../../../data/services/picklistServices";

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
  fetchPicklists: any;
  fetchEmployerPicklists: any;
}

interface IComponentState {
  // Not feasible by soft deadline:
  //Co-op placement details --> (on click appear) When are you willing to host a student, how are you willing to host a student
  currentStep: number;
  personalInfo: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    preferredPronouns: string;
    phoneNumber: string;
    linkedinUrl: string;
    shareWithEmployer: boolean;
  };
  experience: {
    jobTitle: string;
    orgName: string;
    orgWebsite: string;
    orgSocialMedia: string[]; // this seems hard a low priority (need to add)
    orgStreetAddr: string;
    orgCity: string;
    orgPostalCode: string;
    orgPhone: string;
    departmentDivision: string; // currenlty not in userTYpes
    careerDescription: string;
    involveMethod: string; // currently not in userTypes
    extraDescription: string; // other info i'd like schools to read
  };
  involvement: {
    reasonsForVolunteering: string;
    futureAdvice: string;
    introductionMethod: string;
    isSubscribed: boolean;
    agreeConditions: boolean;
  };
  picklistInfo: {
    localPostSecondaryInstitutions: Map<string, boolean>; //local post secondary alumni
    professionalAssociations: Map<string, boolean>;
    employmentStatus: string;
    sectors: string; // somehow need to get picklist of
    size: string;
    expertiseAreas: Map<string, boolean>;
    introductionMethod: string;
    languages: Map<string, boolean>;
    volunteerDesiredExternalActivities: Map<string, boolean>;
    volunteerDesiredInternalActivities: Map<string, boolean>;
    postSecondaryTraining: Map<string, boolean>;
    moreInfo: Map<string, boolean>;
    grades: Map<string, boolean>; // grade levels willing to volunteer with
    locations: Map<string, boolean>;
  };
}

class Master extends React.Component<IComponentProps, IComponentState> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentStep: 1,
      personalInfo: {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        preferredPronouns: "",
        phoneNumber: "",
        linkedinUrl: "",
        shareWithEmployer: false,
      },
      experience: {
        jobTitle: "",
        orgName: "",
        orgWebsite: "",
        orgSocialMedia: [""],
        orgStreetAddr: "",
        orgCity: "",
        orgPostalCode: "",
        orgPhone: "",
        departmentDivision: "",
        careerDescription: "",
        involveMethod: "",
        extraDescription: "",
      },
      involvement: {
        reasonsForVolunteering: "",
        futureAdvice: "",
        introductionMethod: "",
        isSubscribed: false,
        agreeConditions: false,
      },
      picklistInfo: {
        localPostSecondaryInstitutions: new Map(),
        professionalAssociations: new Map(),
        employmentStatus: "",
        sectors: "",
        size: "",
        expertiseAreas: new Map(),
        introductionMethod: "",
        languages: new Map(),
        volunteerDesiredExternalActivities: new Map(),
        volunteerDesiredInternalActivities: new Map(),
        postSecondaryTraining: new Map(),
        moreInfo: new Map(),
        grades: new Map(),
        locations: new Map(),
      },
    };
    this.handleNestedPersonalChange = this.handleNestedPersonalChange.bind(
      this
    );
    this.handleNestedChangeExperience = this.handleNestedChangeExperience.bind(
      this
    );
    this.handleChange = this.handleChange.bind(this);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  componentDidMount() {
    const { fetchPicklists } = this.props;
    fetchPicklists(PicklistType.allActivities);
    fetchPicklists(PicklistType.expertiseAreas);
    fetchPicklists(PicklistType.locations);
    fetchPicklists(PicklistType.postSecondaryTraining);
    fetchPicklists(PicklistType.languages);
    fetchPicklists(PicklistType.grades);
    fetchPicklists(PicklistType.localPostSecondaryInstitutions);
    fetchPicklists(PicklistType.professionalAssociations);
    fetchPicklists(PicklistType.employmentStatus);
    fetchPicklists(PicklistType.introductionMethod);
    fetchPicklists(PicklistType.volunteerDesiredExternalActivities);
    fetchPicklists(PicklistType.volunteerDesiredInternalActivities);
    const { fetchEmployerPicklists } = this.props;
    fetchEmployerPicklists(PicklistType.sectors);
    fetchEmployerPicklists(PicklistType.size);
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

  // @HERE I'm trying to find a global way to manipulate nested states, but for now I think I'm just going to create
  // three functions to handle the different nested states (when I get back. this functional only handles personalInfo nested state)
  handleNestedPersonalChange = (inputName: any) => {
    console.log("handle nested change");
    console.log(inputName);

    return (event: any) => {
      event.preventDefault();
      const newValue = event.target.value;
      const name = event.target.name;

      this.setState({
        personalInfo: {
          ...inputName,
          [name]: newValue,
        },
      });
    };
  };

  handleNestedChangeExperience = (inputName: any) => {
    console.log(inputName);

    return (event: any) => {
      event.preventDefault();
      const newValue = event.target.value;
      const name = event.target.name;

      this.setState({
        experience: {
          ...inputName,
          [name]: newValue,
        },
      });
    };
  };

  handleNestedInvolvementExperience = (inputName: any) => {
    console.log(inputName);

    return (event: any) => {
      event.preventDefault();
      const newValue = event.target.value;
      const name = event.target.name;

      this.setState({
        involvement: {
          ...inputName,
          [name]: newValue,
        },
      });
    };
  };

  handleSubmit = (event: any) => {
    //todo
    event.preventDefault();
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
    console.log("The props", this.props);
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
                  handleNestedChange={this.handleNestedPersonalChange}
                  personalInfo={this.state.personalInfo}
                  picklistInfo={this.state.picklistInfo}
                />
                <Involvement
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange}
                  handleNestedChange={this.handleNestedPersonalChange}
                  involvement={this.state.involvement}
                  picklistInfo={this.state.picklistInfo}
                />
                <Experience
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange}
                  handleNestedChange={this.handleNestedChangeExperience}
                  experience={this.state.experience}
                  picklistInfo={this.state.picklistInfo}
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
  console.log("This is the state of the picklists", state);
  return {
    picklists: {
      activities: {
        list: getAllActivitiesPicklist(state.picklists),
      },
      expertiseAreas: {
        list: getExpertiesAreasPicklist(state.picklists),
      },
      locations: {
        list: getLocationsPicklist(state.picklists),
      },
      postSecondaryTraining: {
        list: getPostSecondaryTrainingPicklist(state.picklists),
      },
      languages: {
        list: getLanguagesPicklist(state.picklists),
      },
      grades: {
        list: getGradesPicklist(state.picklists),
      },
      localPostSecondaryInstitutions: {
        list: getLocalPostSecondaryInstitutions(state.picklists),
      }, //local post secondary alumni
      professionalAssociations: {
        list: getProfessionalAssociations(state.picklists),
      },
      employmentStatus: {
        list: getEmploymentStatus(state.picklists),
      },
      sectors: {
        list: getEmployerSectorsPicklist(state.picklists),
      }, // somehow need to get picklist of
      size: {
        list: getEmployerSizePicklist(state.picklists),
      },
      introductionMethod: {
        list: getIntroductionMethod(state.picklists),
      },
      volunteerDesiredExternalActivities: {
        list: getVolunteerDesiredExternalActivities(state.picklists),
      },
      volunteerDesiredInternalActivities: {
        list: getVolunteerDesiredInternalActivities(state.picklists),
      },
    },
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchPicklists: (picklistType: PicklistType) =>
    dispatch(fetchUserPicklistService(picklistType)),
  fetchEmployerPicklists: (picklistType: PicklistType) =>
    dispatch(fetchEmployerPicklistService(picklistType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Master);
