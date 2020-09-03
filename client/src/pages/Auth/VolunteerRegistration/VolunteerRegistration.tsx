import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import {
  PageBody,
  BlackTextTypography,
  ContrastButton,
  OutlinedButton,
  BlueAvatar,
  GreyAvatar,
  SecondaryMainTextTypography,
  ProgressBarGreyTextTypography,
  RedTextTypography
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
  getCoopPlacementMode,
  getCoopPlacementTime,
  getSchoolBoardPicklist,
  getFollowedProgramsPicklist,
} from "../../../data/selectors/picklistSelector";

import { getEmployers } from "../../../data/selectors/employerSelector";

import { Grid, Divider } from "@material-ui/core";

import {
  fetchUserPicklistService,
  fetchEmployerPicklistService,
  fetchSchoolPicklistService,
} from "../../../data/services/picklistServices";

import {
  fetchEmployersService,
  createEmployerService,
} from "../../../data/services/employerService";

import { registerUser } from "../../../utils/authApiUtils";

import Experience from "./Experience";
import PersonalInfo from "./PersonalInfo";
import Involvement from "./Involvement";

import { PicklistType } from "../../../data/types/picklistTypes";
import Employer from "../../../data/types/employerTypes";
import { UserType, Volunteer } from "../../../data/types/userTypes";

const styles = () => ({
  formSection: {
    padding: "2.5em 3em 0.5em 3em",
    marginBottom: "2em",
  },
  textField: {
    marginBottom: "26px",
    marginTop: "4px",
    width: "45%",
  },
  dropDowns: {
    marginTop: "4px",
    width: "45%",
    marginBottom: "26px",
  },
  multiSelect: {
    columns: "2 auto",
    // breakInside: "avoid-column",
  },
  root: {
    minWidth: 275,
  },
  checkboxHeader: {
    marginBottom: "9px",
    marginTop: "26px",
  },
  checkboxSubHeader: {
    margin: "9px 0px",
  },
  underCheckbox: {
    marginBottom: "16px",
  },
});

export interface PersonalInfoState {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  linkedinUrl: string;
  shareWithEmployer: boolean;
}

export interface ExperienceState {
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
  shareWithEmployer: boolean;
  shareEmployerInfo: boolean;
  isVolunteerCoordinator: boolean;
  employerId: string;
  newEmployer: Employer | null;
  employmentStatus: string;
  fieldInvolvementDescription: string;
}

export interface InvolvementState {
  adviceForStudents: string;
  reasonsForVolunteering: string;
  futureAdvice: string;
  introductionMethod: string;
  isSubscribed: boolean;
  agreeConditions: boolean;
}

export interface PicklistInfo {
  preferredPronouns: string;
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
  coopPlacementMode: string;
  coopPlacementTime: Map<string, boolean>;
  coopPlacementSchoolAffiliation: string;
  followedPrograms: Map<string, boolean>;
}

export interface RawPicklists {
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
  coopPlacementMode: { list: string[] };
  coopPlacementTime: { list: string[] };
  coopPlacementSchoolAffiliation: { list: string[] };
  followedPrograms: { list: string[] };
  preferredPronouns: { list: string[] };
}

interface IComponentProps {
  employers: Employer[];
  picklists: RawPicklists;
  fetchPicklists: any;
  fetchEmployerPicklists: any;
  fetchSchoolPicklists: any;
  fetchEmployers: any;
  createEmmployer: any;
  classes: {
    multiSelect: any;
    root: any;
    formSection: any;
    textField: any;
    dropDowns: any;
    checkboxHeader: any;
    checkboxSubHeader: any;
    underCheckbox: any;
  };
}

interface IComponentState {
  // Not feasible by soft deadline:
  //Co-op placement details --> (on click appear) When are you willing to host a student, how are you willing to host a student
  currentStep: number;
  personalInfo: PersonalInfoState;
  experience: ExperienceState;
  involvement: InvolvementState;
  picklistInfo: PicklistInfo;
  redirect: boolean;
  failed: boolean;
}

export const getChosenOptions = (map: Map<string, boolean>): string[] =>
  Array.from(map.entries(), (entry) => entry)
    .filter(([option, isSelected]) => isSelected)
    .map(([option, isSelected]) => option);

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
        shareWithEmployer: false,
        shareEmployerInfo: false,
        isVolunteerCoordinator: false,
        employerId: "",
        newEmployer: null,
        employmentStatus: "",
        fieldInvolvementDescription: "",
      },
      involvement: {
        adviceForStudents: "",
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
        coopPlacementMode: "",
        coopPlacementTime: new Map(),
        coopPlacementSchoolAffiliation: "",
        followedPrograms: new Map(),
      },
      redirect: false,
      failed: false
    };
    this.handleNestedChange = this.handleNestedChange.bind(this);
    this.handleNestedChangeExperience = this.handleNestedChangeExperience.bind(
      this
    );
    this.handleNestedChangePicklist = this.handleNestedChangePicklist.bind(
      this
    );
    this.handleNestedChangeMultiAutocomplete = this.handleNestedChangeMultiAutocomplete.bind(
      this
    );
    this.createHandleSelectOption = this.createHandleSelectOption.bind(this);
    this.createUpdateOptions = this.createUpdateOptions.bind(this);
    this.handleNestedChangeAutocomplete = this.handleNestedChangeAutocomplete.bind(
      this
    );

    this.handleChange = this.handleChange.bind(this);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  createUpdateOptions(picklistName: string) {
    const picklistOptions = this.getMultiPicklist(picklistName);

    return (selectedOptions: string) => {
      picklistOptions.set(
        selectedOptions,
        !picklistOptions.get(selectedOptions)
      );

      this.setState({
        ...this.state,
        picklistInfo: {
          ...this.state.picklistInfo,
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
      case "coopPlacementTime":
        return picklists.coopPlacementTime;
      case "locations":
        return picklists.locations;
      case "grades":
        return picklists.grades;
      case "followedPrograms":
        return picklists.followedPrograms;
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
    const {
      fetchPicklists,
      fetchEmployerPicklists,
      fetchSchoolPicklists,
    } = this.props;

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
      PicklistType.preferredPronouns,
      PicklistType.employmentStatus,
      PicklistType.introductionMethod,
      PicklistType.volunteerDesiredExternalActivities,
      PicklistType.volunteerDesiredInternalActivities,
      PicklistType.coopPlacementMode,
      PicklistType.coopPlacementTime,
      PicklistType.followedPrograms,
    ];

    const employerPicklistTypes: PicklistType[] = [
      PicklistType.size,
      PicklistType.sectors,
    ];

    const schoolPicklistTypes: PicklistType[] = [PicklistType.schoolBoard];

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
        } else if (type === PicklistType.coopPlacementTime) {
          picklistInfo.coopPlacementTime = new Map(
            createPicklist(picklists.coopPlacementTime.list)
          );
        } else if (type === PicklistType.locations) {
          picklistInfo.locations = new Map(
            createPicklist(picklists.locations.list)
          );
        } else if (type === PicklistType.grades) {
          picklistInfo.grades = new Map(createPicklist(picklists.grades.list));
        } else if (type === PicklistType.followedPrograms) {
          picklistInfo.followedPrograms = new Map(
            createPicklist(picklists.followedPrograms.list)
          );
        }
        this.setState({ ...this.state, picklistInfo });
      });
    });

    employerPicklistTypes.forEach((type: PicklistType) => {
      fetchEmployerPicklists(type);
    });

    schoolPicklistTypes.forEach((type: PicklistType) => {
      fetchSchoolPicklists(type);
    });
  }

  validatePage1(): boolean {
    const personalInfo = this.state.personalInfo;
    if (personalInfo.password !== personalInfo.confirmPassword) {
      alert("Passwords must match.");
      return false;
    }

    if (personalInfo.password.length < 8) {
      alert("Password must be at least 8 characters.");
      return false;
    }

    return true;
  }

  _next(event: any) {
    event.preventDefault();
    let currentStep = this.state.currentStep;
    const isValid = currentStep === 1 ? this.validatePage1() : true;
    // If the current step is 1 or 2, then add one on "next" button click
    if (isValid) {
      currentStep = currentStep >= 2 ? 3 : currentStep + 1;
      const newState = {
        ...this.state,
        currentStep: currentStep,
      };

      this.setState(newState);
    }
  }
  _prev(event: any) {
    event.preventDefault();
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      ...this.state,
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
        ...this.state,
        personalInfo: {
          ...inputName,
          [name]: newValue,
        },
      });
    };
  };

  handleNestedChangeExperience = (inputName: any) => {
    const experience = this.state.experience;

    return (event: any) => {
      event.preventDefault();
      let newValue = event.target.value;
      const name = event.target.name;

      if (event.target.type === "checkbox") {
        newValue = event.target.checked;
      }

      this.setState({
        ...this.state,
        experience: {
          ...inputName,
          [name]: newValue,
        },
      });
    };
  };

  handleNestedChangeInvolvement = (inputName: any) => {
    return (event: any) => {
      event.preventDefault();
      let newValue = event.target.value;
      const name = event.target.name;

      if (event.target.type === "checkbox") {
        newValue = event.target.checked;
      }

      this.setState({
        ...this.state,
        involvement: {
          ...inputName,
          [name]: newValue,
        },
      });
    };
  };

  handleNestedChangeAutocomplete = (field: any, newValue: any) => {
    this.setState((prevState) => ({
      ...prevState,
      picklistInfo: {
        ...prevState.picklistInfo,
        [field]: newValue,
      },
    }));
  };

  handleNestedChangeMultiAutocomplete = (
    field: any,
    map: Map<string, boolean>,
    newValues: any
  ) => {
    Array.from(map.keys(), (key) => key).forEach((key) => {
      map.set(key, false);
    });
    newValues.forEach((value: string) => map.set(value, true));

    this.handleNestedChangeAutocomplete(field, map);
  };

  handleNestedChangePicklist = (picklistName: string) => {
    return (event: any) => {
      event.preventDefault();
      const newValue = event.target.value;

      this.setState({
        ...this.state,
        picklistInfo: {
          ...this.state.picklistInfo,
          [picklistName]: newValue,
        },
      });
    };
  };

  handleSubmit = async (event: any) => {
    event.preventDefault();

    const getChosenOptions = (map: Map<string, boolean>): string[] =>
      Array.from(map.entries(), (entry) => entry)
        .filter(([option, isSelected]) => isSelected)
        .map(([option, isSelected]) => option);
    const personalInfo: PersonalInfoState = this.state.personalInfo;
    const experience: ExperienceState = this.state.experience;
    const involvement: InvolvementState = this.state.involvement;
    const picklistInfo: PicklistInfo = this.state.picklistInfo;
    const employer: Employer = this.props.employers.filter(
      (employer: Employer) => employer.id === experience.employerId
    )[0];

    const volunteer: Volunteer = {
      userType: UserType.Volunteer,
      email: personalInfo.email,
      firstName: personalInfo.firstName,
      followedPrograms: getChosenOptions(picklistInfo.followedPrograms),
      id: "",
      isSubscribed: involvement.isSubscribed,
      lastName: personalInfo.lastName,
      password: personalInfo.password,
      phoneNumber: personalInfo.phoneNumber,
      preferredPronouns: picklistInfo.preferredPronouns,
      adviceForStudents: involvement.adviceForStudents,
      careerDescription: experience.careerDescription,
      coopPlacementMode: picklistInfo.coopPlacementMode,
      coopPlacementSchoolAffiliation:
        picklistInfo.coopPlacementSchoolAffiliation,
      coopPlacementTime: getChosenOptions(picklistInfo.coopPlacementTime),
      jobTitle: experience.jobTitle,
      department: experience.departmentDivision,
      employer,
      employmentStatus: picklistInfo.employmentStatus,
      expertiseAreas: picklistInfo.expertiseAreas,
      extraDescription: experience.extraDescription,
      fieldInvolvementDescription: experience.fieldInvolvementDescription,
      grades: getChosenOptions(picklistInfo.grades),
      introductionMethod: involvement.introductionMethod,
      isVolunteerCoordinator: experience.isVolunteerCoordinator,
      languages: picklistInfo.languages,
      linkedIn: personalInfo.linkedinUrl,
      localPostSecondaryInstitutions: getChosenOptions(
        picklistInfo.localPostSecondaryInstitutions
      ),
      locations: getChosenOptions(picklistInfo.locations),
      postSecondaryTraining: getChosenOptions(
        picklistInfo.postSecondaryTraining
      ),
      professionalAssociations: getChosenOptions(
        picklistInfo.professionalAssociations
      ),
      reasonsForVolunteering: involvement.reasonsForVolunteering,
      shareEmployerInfo: experience.shareEmployerInfo,
      shareWithEmployer: experience.shareWithEmployer,
      volunteerDesiredExternalActivities: getChosenOptions(
        picklistInfo.volunteerDesiredExternalActivities
      ),
      volunteerDesiredInternalActivities: getChosenOptions(
        picklistInfo.volunteerDesiredInternalActivities
      ),
    };

    if (!volunteer.employer) {
      if (experience.orgName && experience.orgName.length > 0) {
        volunteer.employer = {
          address: experience.orgStreetAddr,
          city: experience.orgCity,
          id: "",
          name: experience.orgName,
          phoneNumber: experience.orgPhone,
          postalCode: experience.orgPostalCode,
          sectors: [picklistInfo.sectors],
          size: picklistInfo.size,
          socialMedia: [experience.orgSocialMedia],
          website: experience.orgWebsite,
        };
      } else {
        delete volunteer.employer;
      }
    }

    const sendUser = async (body: any) => {
      try {
        return await registerUser(body);
      } catch (e) {
      }
    };
    const data = await sendUser(volunteer);
    if (data) {
      this.setState({ redirect: true, failed: false })
    } else {
      this.setState({ redirect: false, failed: true })
    }
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
            marginLeft: "34px",
          }}
          onClick={this._prev}
        >
          Previous
        </OutlinedButton>
      );
    }
    // ...else return nothing
    return <div />;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    // Return submit button if on page 3 (last page);
    if (currentStep === 3) {
      return (
        <ContrastButton
          style={{ float: "right", marginRight: "34px" }}
          type="submit"
        >
          Finish Registration
        </ContrastButton>
      );
    }

    // If the current step is not 3, then render the "next" button
    return (
      <ContrastButton
        style={{ float: "right", marginRight: "34px" }}
        type="submit"
      >
        Next
      </ContrastButton>
    );
  }

  render() {
    const { redirect, failed } = this.state;
    if (redirect) {
      return <Redirect to="/?registered" />;
    }

    const getProgressComponent = (step: number) => {
      let currentStep = this.state.currentStep;
      let label = "";
      switch (step) {
        case 1:
          label = "Personal Information";
          break;
        case 2:
          label = "Your Experience";
          break;
        case 3:
          label = "Your Involvement";
          break;
      }
      return (
        <Grid container alignItems="center" justify="flex-start">
          <Grid item xs={3}>
            {step === currentStep ? (
              <BlueAvatar>{step}</BlueAvatar>
            ) : (
              <GreyAvatar>{step}</GreyAvatar>
            )}
          </Grid>
          <Grid item xs={9}>
            {step === currentStep ? (
              <SecondaryMainTextTypography variant="button">
                {label}
              </SecondaryMainTextTypography>
            ) : (
              <ProgressBarGreyTextTypography variant="button">
                {label}
              </ProgressBarGreyTextTypography>
            )}
          </Grid>
        </Grid>
      );
    };

    const getPage = () => {
      switch (this.state.currentStep) {
        case 1:
          return (
            <PersonalInfo
              classes={this.props.classes}
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              handleNestedChange={this.handleNestedChange}
              handleNestedChangeAutocomplete={
                this.handleNestedChangeAutocomplete
              }
              handleNestedChangeMultiAutocomplete={
                this.handleNestedChangeMultiAutocomplete
              }
              personalInfo={this.state.personalInfo}
              picklistInfo={this.state.picklistInfo}
              picklists={this.props.picklists}
            />
          );
        case 2:
          return (
            <Experience
              classes={this.props.classes}
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              handleNestedChange={this.handleNestedChangeExperience}
              handleNestedChangePicklist={this.handleNestedChangePicklist}
              handleNestedChangeAutocomplete={
                this.handleNestedChangeAutocomplete
              }
              handleNestedChangeMultiAutocomplete={
                this.handleNestedChangeMultiAutocomplete
              }
              experience={this.state.experience}
              employers={this.props.employers}
              picklists={this.props.picklists}
              picklistInfo={this.state.picklistInfo}
              createHandleSelectOption={this.createHandleSelectOption}
            />
          );
        default:
          return (
            <Involvement
              classes={this.props.classes}
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              handleNestedChange={this.handleNestedChangeInvolvement}
              involvement={this.state.involvement}
              picklistInfo={this.state.picklistInfo}
              picklists={this.props.picklists}
              createHandleSelectOption={this.createHandleSelectOption}
              handleNestedChangeAutocomplete={
                this.handleNestedChangeAutocomplete
              }
              handleNestedChangeMultiAutocomplete={
                this.handleNestedChangeMultiAutocomplete
              }
              handleNestedChangePicklist={this.handleNestedChangePicklist}
            />
          );
      }
    };

    return (
      <React.Fragment>
        <PageBody>
          <div style={{ marginTop: "5em" }}>
            <BlackTextTypography>
              <Link to="/" style={{ textDecoration: "none" }}>
                {`<`} Back{" "}
              </Link>{" "}
            </BlackTextTypography>
            <Typography variant="h1" style={{ marginTop: "10px" }}>
              Register for a volunteer account
            </Typography>
            <Grid
              container
              style={{ marginLeft: "30px", marginTop: "30px" }}
              justify="space-evenly"
              alignItems="center"
            >
              <Grid item xs={3}>
                {getProgressComponent(1)}
              </Grid>
              <Grid item xs={2}>
                <Divider />
              </Grid>
              <Grid item xs={2}>
                {getProgressComponent(2)}
              </Grid>
              <Grid item xs={2}>
                <Divider />
              </Grid>
              <Grid item xs={2}>
                {getProgressComponent(3)}
              </Grid>
            </Grid>
            <form
              onSubmit={
                this.state.currentStep === 3 ? this.handleSubmit : this._next
              }
            >
              <Grid
                container
                spacing={4}
                direction="row"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "2px",
                  margin: "2em 2em",
                  width: "100%",
                }}
              >
                <Grid item xs={12}>
                  {getPage()}
                  {failed ? (
                    <RedTextTypography style={{ fontSize: "0.9em", marginBottom: "1%", marginLeft: "34px" }}>
                      Something went wrong. Please try again.
                    </RedTextTypography>
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  {this.previousButton}
                </Grid>
                <Grid item xs={6}>
                  {this.nextButton}
                </Grid>
              </Grid>
            </form>
          </div>
        </PageBody>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    employers: getEmployers(state.employers),
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
      preferredPronouns: {
        list: getPreferredPronounsPicklist(state.picklists),
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
      coopPlacementMode: {
        list: getCoopPlacementMode(state.picklists),
      },
      coopPlacementTime: {
        list: getCoopPlacementTime(state.picklists),
      },
      coopPlacementSchoolAffiliation: {
        list: getSchoolBoardPicklist(state.picklists),
      },
      followedPrograms: {
        list: getFollowedProgramsPicklist(state.picklists),
      },
    },
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchPicklists: (picklistType: PicklistType) =>
    dispatch(fetchUserPicklistService(picklistType)),
  fetchEmployerPicklists: (picklistType: PicklistType) =>
    dispatch(fetchEmployerPicklistService(picklistType)),
  fetchSchoolPicklists: (picklistType: PicklistType) =>
    dispatch(fetchSchoolPicklistService(picklistType)),
  fetchEmployers: dispatch(fetchEmployersService()),
  createEmmployer: (employer: Employer) =>
    dispatch(createEmployerService(employer)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Master));
