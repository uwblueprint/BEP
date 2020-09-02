import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import {
  PageBody,
  BlackTextTypography,
  ContrastButton,
  OutlinedButton,
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
  getPreferredPronounsPicklist,
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

const styles = () => ({
  multiSelect: {
    marginBottom: "26px",
    columns: "2 auto",
  },
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
    preferredPronouns: { list: string[] };
  };
  fetchPicklists: any;
  fetchEmployerPicklists: any;
  classes: {
    multiSelect: any;
    root: any;
  };
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
    phoneNumber: string;
    linkedinUrl: string;
    shareWithEmployer: boolean;
  };
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
  involvement: {
    reasonsForVolunteering: string;
    futureAdvice: string;
    introductionMethod: string;
    isSubscribed: boolean;
    agreeConditions: boolean;
  };
  picklistInfo: {
    preferredPronouns: string;
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
        phoneNumber: "",
        linkedinUrl: "",
        shareWithEmployer: false,
      },
      experience: {
        jobTitle: "",
        orgName: "",
        orgWebsite: "",
        orgSocialMedia: "",
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
        localPostSecondaryInstitutions: [],
        professionalAssociations: [],
        employmentStatus: "",
        sectors: "",
        size: "",
        preferredPronouns: "",
        expertiseAreas: [],
        introductionMethod: "",
        languages: [],
        volunteerDesiredExternalActivities: new Map(),
        volunteerDesiredInternalActivities: new Map(),
        postSecondaryTraining: new Map(),
        moreInfo: new Map(),
        grades: new Map(),
        locations: new Map(),
      },
    };
    this.handleNestedChange = this.handleNestedChange.bind(this);
    this.handleNestedChangeExperience = this.handleNestedChangeExperience.bind(
      this
    );
    this.handleNestedChangePicklist = this.handleNestedChangePicklist.bind(
      this
    );
    this.createHandleSelectOption = this.createHandleSelectOption.bind(this);
    this.createUpdateOptions = this.createUpdateOptions.bind(this);
    this.handleNestedChangeMultiAutocomplete = this.handleNestedChangeMultiAutocomplete.bind(
      this
    );

    this.handleChange = this.handleChange.bind(this);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  createUpdateOptions(picklistName: string) {
    const picklistInfos = this.state.picklistInfo;
    const picklistOptions = this.getMultiPicklist(picklistName);

    return (selectedOptions: string) => {
      picklistOptions.set(
        selectedOptions,
        !picklistOptions.get(selectedOptions)
      );

      this.setState({
        picklistInfo: {
          ...picklistInfos,
          [picklistName]: picklistOptions,
        },
      });
    };
  }

  getMultiPicklist(picklistName: string) {
    const picklists = this.state.picklistInfo;
    switch (picklistName) {
      case "postSecondaryTraining":
        return picklists.postSecondaryTraining;
      case "volunteerDesiredExternalActivities":
        return picklists.volunteerDesiredExternalActivities;
      case "volunteerDesiredInternalActivities":
        return picklists.volunteerDesiredInternalActivities;
    }
    return new Map<string, boolean>();
  }

  createHandleSelectOption(picklistName: string) {
    const handleSelectOption = (
      event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
    ) => {
      const item = event.target.name;

      const selectedOption: string = item as string;
      this.createUpdateOptions(picklistName)(selectedOption);
    };

    return handleSelectOption.bind(this);
  }

  componentDidMount() {
    const { fetchPicklists } = this.props;
    const { fetchEmployerPicklists } = this.props;

    const picklistTypes: PicklistType[] = [
      PicklistType.expertiseAreas,
      PicklistType.languages,
      PicklistType.allActivities,
      PicklistType.expertiseAreas,
      PicklistType.locations,
      PicklistType.postSecondaryTraining,
      PicklistType.languages,
      PicklistType.grades,
      PicklistType.localPostSecondaryInstitutions,
      PicklistType.professionalAssociations,
      PicklistType.employmentStatus,
      PicklistType.introductionMethod,
      PicklistType.volunteerDesiredExternalActivities,
      PicklistType.volunteerDesiredInternalActivities,
      PicklistType.preferredPronouns,
    ];

    const createPicklist = (
      filterNames: string[]
    ): Array<[string, boolean]> => {
      return filterNames.map((item: string) => [item, false]);
    };

    picklistTypes.forEach((type: PicklistType) => {
      fetchPicklists(type).then(() => {
        const picklists = this.props.picklists;
        const picklistInfo = this.state.picklistInfo;

        if (type === PicklistType.postSecondaryTraining) {
          picklistInfo.postSecondaryTraining = new Map(
            createPicklist(picklists.postSecondaryTraining.list)
          );
        } else if (type === PicklistType.volunteerDesiredExternalActivities) {
          picklistInfo.volunteerDesiredExternalActivities = new Map(
            createPicklist(picklists.volunteerDesiredExternalActivities.list)
          );
        } else if (type === PicklistType.volunteerDesiredInternalActivities) {
          picklistInfo.volunteerDesiredInternalActivities = new Map(
            createPicklist(picklists.volunteerDesiredInternalActivities.list)
          );
        }
        // else if (type === PicklistType.languages) {
        //   picklistInfo.languages = new Map(
        //     createPicklist(picklists.languages.list)
        //   );
        // }
        this.setState({ picklistInfo });
      });
    });
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
  handleNestedChange = (inputName: any) => {
    const personalInfo = this.state.personalInfo;

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
    const experience = this.state.experience;

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

  handleNestedChangeInvolvement = (inputName: any) => {
    console.log(inputName);
    const involvement = this.state.involvement;

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

  handleNestedChangeMultiAutocomplete = (field: any, newValue: any) => {
    console.log("New Value");
    this.setState((prevState) => ({
      ...prevState,
      picklistInfo: {
        ...prevState.picklistInfo,
        [field]: newValue,
      },
    }));
  };

  handleNestedChangePicklist = (event: any, newValue: any, inputName: any) => {
    const experience = this.state.picklistInfo;

    // console.log("New event value", inputName.target.value)
    // console.log("New event id", inputName.target.id)

    return (event: any) => {
      event.preventDefault();
      const newValue = event.target.value;
      const name = event.target.id;

      console.log("Reacted", event.target);

      this.setState({
        picklistInfo: {
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
        <OutlinedButton
          style={{
            padding: "1em 2em",
            border: "2px solid #0A798F",
            borderRadius: "2px",
          }}
          onClick={this._prev}
        >
          Previous
        </OutlinedButton>
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
        <ContrastButton style={{ float: "right" }} onClick={this._next}>
          Next
        </ContrastButton>
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
            <Typography variant="h1" style={{ marginTop: "10px" }}>
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
                  handleNestedChange={this.handleNestedChange}
                  handleNestedChangeMultiAutocomplete={
                    this.handleNestedChangeMultiAutocomplete
                  }
                  personalInfo={this.state.personalInfo}
                  picklistInfo={this.state.picklistInfo}
                  picklists={this.props.picklists}
                />
                <Involvement
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange}
                  handleNestedChange={this.handleNestedChange}
                  involvement={this.state.involvement}
                  picklistInfo={this.state.picklistInfo}
                  picklists={this.props.picklists}
                  createHandleSelectOption={this.createHandleSelectOption}
                  classes={this.props.classes}
                  handleNestedChangeMultiAutocomplete={
                    this.handleNestedChangeMultiAutocomplete
                  }
                  handleNestedChangePicklist={this.handleNestedChangePicklist}
                />
                <Experience
                  currentStep={this.state.currentStep}
                  handleChange={this.handleChange}
                  handleNestedChange={this.handleNestedChangeExperience}
                  handleNestedChangePicklist={this.handleNestedChangePicklist}
                  handleNestedChangeMultiAutocomplete={
                    this.handleNestedChangeMultiAutocomplete
                  }
                  experience={this.state.experience}
                  picklists={this.props.picklists}
                  picklistInfo={this.state.picklistInfo}
                  createHandleSelectOption={this.createHandleSelectOption}
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
      preferredPronouns: {
        list: getPreferredPronounsPicklist(state.picklists),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Master));
