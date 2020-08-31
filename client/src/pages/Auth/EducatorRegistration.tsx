import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

/* Types */
import { PicklistType } from "../../data/types/picklistTypes";
import { School } from "../../data/types/schoolListTypes";

// import { SchoolListType } from "../../data/types/schoolListTypes";

/* Services */
import { fetchSchoolPicklistService } from "../../data/services/picklistServices";
import { fetchUserPicklistService } from "../../data/services/picklistServices";
import { fetchSchoolListService } from "../../data/services/schoolListServices";

/* Selectors */

import {
  getEducatorDesiredActivitiesPicklist,
  getPositionPicklist,
  getIntroductionMethodPicklist,
  getMoreInfoPicklist,
  getSchoolTypePicklist,
  getSchoolBoardPicklist,
} from "../../data/selectors/picklistSelector";

import { getSchools } from "../../data/selectors/schoolListSelector";

import { registerUser } from "../../utils/authApiUtils";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Divider from "@material-ui/core/Divider";

import { Grid } from "@material-ui/core";

import { Link } from "react-router-dom";

import {
  ContainedSelect,
  SecondaryMainTextTypography,
  ContainedButton,
  DarkContainedButton,
  OutlinedTextField,
  BlackHeaderTypography,
  BlackTextTypography,
  PageHeader,
  OutlinedCheckbox,
  PageBody,
  TextField,
  Select,
} from "../../components/index";

const styles = () => ({
  textField: {
    width: "45%",
    marginBottom: "26px",
    marginTop: "4px",
  },

  formSection: {
    padding: "2.5em 3em 0.5em 3em",
  },
  multiSelect: {
    marginBottom: "26px",
    columns: "2 auto",
  },
  dropDowns: {
    marginTop: "4px",
    width: "45%",
  },
  selectField: {
    border: "1px solid #bcbcbc",
    padding: "8px 8px 3px 20px",
    borderRadius: "1px",
    marginBottom: "24px",
  },
});

interface IComponentProps {
  schoolList: School[];
  picklists: {
    educatorDesiredActivities: { list: string[] };
    position: { list: string[] };
    introductionMethod: { list: string[] };
    moreInfo: { list: string[] };
    schoolBoard: { list: string[] };
    type: { list: string[] };
  };
  fetchUserPicklists: any;
  fetchSchoolPicklists: any;
  fetchSchoolList: any;
  classes: {
    textField: any;
    formSection: any;
    multiSelect: any;
    dropDowns: any;
    selectField: any;
  };
}

interface IComponentState {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  preferredPronouns: string;
  isSubscribed: boolean;
  phoneNumber: string;
  schoolName: string;
  agreeConditions: boolean;
  filteredSchoolList: School[];
  picklistInfo: {
    educatorDesiredActivities: Map<string, boolean>;
    moreInfo: Map<string, boolean>;
    position: string;
    introductionMethod: string;
  };
  schoolInfo: {
    schoolBoard: string;
    type: string;
  };
}

class EducatorRegistration extends React.Component<
  IComponentProps,
  IComponentState
> {
  constructor(props: any) {
    super(props);

    const { schoolList } = props;

    this.handleChange = this.handleChange.bind(this);
    this.handlepicklistInfoChange = this.handlepicklistInfoChange.bind(this);
    this.handleschoolInfoChange = this.handleschoolInfoChange.bind(this);

    this.createHandleSelectOption = this.createHandleSelectOption.bind(this);
    this.createUpdateOptions = this.createUpdateOptions.bind(this);
    this.filterAllFields = this.filterAllFields.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      preferredPronouns: "",
      phoneNumber: "",
      schoolName: "",
      isSubscribed: false,
      filteredSchoolList: schoolList,
      agreeConditions: false,
      picklistInfo: {
        educatorDesiredActivities: new Map(),
        moreInfo: new Map(),
        introductionMethod: "",
        position: "",
      },
      schoolInfo: {
        schoolBoard: "",
        type: "",
      },
    };
  }
  public moreInfoList: string[] = [];
  public educatorDesiredActivitiesList: string[] = [];

  componentDidMount() {
    const picklistTypes: PicklistType[] = [
      PicklistType.educatorDesiredActivities,
      PicklistType.position,
      PicklistType.introductionMethod,
      PicklistType.moreInfo,
    ];

    picklistTypes.forEach((type: PicklistType) => {
      this.props.fetchUserPicklists(type).then(() => {
        const picklists = this.props.picklists;
        const picklistInfo = this.state.picklistInfo;

        if (type === PicklistType.educatorDesiredActivities) {
          picklistInfo.educatorDesiredActivities = new Map(
            createPicklist(picklists.educatorDesiredActivities.list)
          );
        } else if (type === PicklistType.moreInfo) {
          picklistInfo.moreInfo = new Map(
            createPicklist(picklists.moreInfo.list)
          );
        }
        this.setState({ picklistInfo });
      });
    });

    const createPicklist = (
      filterNames: string[]
    ): Array<[string, boolean]> => {
      return filterNames.map((item: string) => [item, false]);
    };

    this.props.fetchSchoolPicklists(PicklistType.type);
    this.props.fetchSchoolPicklists(PicklistType.schoolBoard);

    this.props.fetchSchoolList().then(() => {
      this.setState({
        filteredSchoolList: this.props.schoolList, //populate the state to have the schoolList from the api
      });
    });
  }

  componentDidUpdate(prevProps: IComponentProps, prevState: IComponentState) {
    // This takes all the options that were selected true (in the map string bool) and pushes it into an array
    if (prevState.picklistInfo !== this.state.picklistInfo) {
      this.educatorDesiredActivitiesList = [];
      this.moreInfoList = [];

      Array.from(
        this.state.picklistInfo.educatorDesiredActivities.entries()
      ).forEach((entry) => {
        if (entry[1] == true) {
          this.educatorDesiredActivitiesList.push(entry[0]);
        }
      });

      Array.from(this.state.picklistInfo.moreInfo.entries()).forEach(
        (entry) => {
          if (entry[1] == true) {
            this.moreInfoList.push(entry[0]);
          }
        }
      );
    }
  }

  getFilterFunction = (fieldName: string) => {
    switch (fieldName) {
      case "schoolBoard":
        return this.filterSchoolBoard;
      case "type":
        return this.filterSchoolType;
    }
    return (school: School, filter: string) => true;
  };

  schoolListCallback() {
    this.setState({
      filteredSchoolList: this.filterAllFields(this.props.schoolList),
    });
  }

  filterAllFields(schools: School[]) {
    const newSchools = schools.filter((school: School) => {
      var pass = true;
      for (let [fieldName, filterMap] of Object.entries(
        this.state.schoolInfo
      )) {
        const filterFunction = this.getFilterFunction(fieldName);

        if (pass && !filterFunction(school, filterMap)) {
          pass = false;
        }
        if (!pass) return false;
      }
      return true;
    });
    return newSchools;
  }

  filterSchoolBoard = (school: School, filter: string) =>
    school.schoolBoard.includes(filter);

  filterSchoolType = (school: School, filter: string) =>
    school.type.includes(filter);

  getMultiPicklist(picklistName: string) {
    const picklists = this.state.picklistInfo;
    switch (picklistName) {
      case "educatorDesiredActivities":
        return picklists.educatorDesiredActivities;
      case "moreInfo":
        return picklists.moreInfo;
    }
    return new Map<string, boolean>();
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

  handleChange = (event: any) => {
    console.log("State Change");

    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleschoolInfoChange = (event: any) => {
    const { name, value } = event.target;

    const schoolInfo = this.state.schoolInfo;
    console.log("School Info Change");

    this.setState(
      {
        schoolInfo: {
          ...schoolInfo,
          [name]: value,
        },
      },
      this.schoolListCallback
    );
  };

  handlepicklistInfoChange = (event: any) => {
    const { name, value } = event.target;
    const picklistInfo = this.state.picklistInfo;
    console.log("Picklist Info Change");

    this.setState({
      picklistInfo: {
        ...picklistInfo,
        [name]: value,
      },
    });
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(this.state);

    let test = this.props.schoolList.filter(
      (school: School) => school.name === this.state.schoolName
    );

    console.log(test);
    console.log(test[0]);

    const formattedData = {
      userType: 1,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
      preferredPronouns: this.state.preferredPronouns,
      isSubscribed: this.state.isSubscribed,
      position: this.state.picklistInfo.position,
      school: test[0], //test
      introductionMethod: this.state.picklistInfo.introductionMethod,
      moreInfo: this.moreInfoList,
      educatorDesiredActivities: this.educatorDesiredActivitiesList,
    };

    console.log(formattedData);

    const sendUser = async (body: any) => {
      try {
        await registerUser(body);
        console.log("success");
      } catch (e) {
        console.log(e);
      }
    };
    sendUser(formattedData);
  };

  render() {
    return (
      <React.Fragment>
        <PageBody>
          <div style={{ marginTop: "5em" }}>
            <BlackTextTypography>
              <Link to="/">Back</Link>{" "}
            </BlackTextTypography>
            <Typography variant="h1">
              Register for an educator account
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
                <div className={this.props.classes.formSection}>
                  <BlackHeaderTypography style={{ marginBottom: "2em" }}>
                    Account Information
                  </BlackHeaderTypography>

                  <BlackHeaderTypography>Email*</BlackHeaderTypography>
                  <OutlinedTextField
                    placeholder="e.g. name@email.com"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required={true}
                    isRequired="true"
                    className={this.props.classes.textField}
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                      required: true,
                    }}
                  />
                  <BlackHeaderTypography>
                    Account Password*
                  </BlackHeaderTypography>
                  <OutlinedTextField
                    placeholder="At least 8 characters"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    className={this.props.classes.textField}
                    InputProps={{
                      required: true,
                    }}
                  />
                  <BlackHeaderTypography>
                    Confirm Password*
                  </BlackHeaderTypography>
                  <OutlinedTextField
                    placeholder="At least 8 characters"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    type="password"
                    autoComplete="current-password"
                    onChange={this.handleChange}
                    className={this.props.classes.textField}
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                      required: true,
                    }}
                  />
                </div>
                <Divider />
                <div className={this.props.classes.formSection}>
                  <BlackHeaderTypography style={{ marginBottom: "1.5em" }}>
                    About You
                  </BlackHeaderTypography>
                  <BlackHeaderTypography>First Name*</BlackHeaderTypography>
                  <OutlinedTextField
                    placeholder="Enter first name"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    className={this.props.classes.textField}
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                      required: true,
                    }}
                  />
                  <BlackHeaderTypography>Last Name*</BlackHeaderTypography>
                  <OutlinedTextField
                    placeholder="Enter last name"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    className={this.props.classes.textField}
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                      required: true,
                    }}
                  />

                  <BlackHeaderTypography>
                    Preferred Pronouns*
                  </BlackHeaderTypography>
                  <FormControl
                    required
                    className={this.props.classes.dropDowns}
                  >
                    <Select
                      value={this.state.preferredPronouns}
                      onChange={this.handleChange}
                      name="preferredPronouns"
                      displayEmpty
                      disableUnderline={true}
                      className={this.props.classes.selectField}
                    >
                      <MenuItem value="" disabled>
                        Select your preferred pronoun
                      </MenuItem>
                      <MenuItem value="she/her">She/Her</MenuItem>
                      <MenuItem value="he/him">He/Him</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  <BlackHeaderTypography>School Board*</BlackHeaderTypography>
                  <FormControl
                    required
                    className={this.props.classes.dropDowns}
                  >
                    <Select
                      value={this.state.schoolInfo.schoolBoard}
                      onChange={this.handleschoolInfoChange}
                      name="schoolBoard"
                      displayEmpty
                      disableUnderline={true}
                      className={this.props.classes.selectField}
                    >
                      <MenuItem value="" disabled>
                        Select your school board
                      </MenuItem>
                      {Array.from(
                        this.props.picklists.schoolBoard.list.entries(),
                        (entry) => entry
                      ).map((entry, index) => (
                        <MenuItem key={index} value={entry[1]}>
                          {entry[1]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <BlackHeaderTypography>School Type*</BlackHeaderTypography>
                  <FormControl
                    required
                    className={this.props.classes.dropDowns}
                  >
                    <Select
                      value={this.state.schoolInfo.type}
                      onChange={this.handleschoolInfoChange}
                      name="type"
                      displayEmpty
                      disableUnderline={true}
                      className={this.props.classes.selectField}
                    >
                      <MenuItem value="" disabled>
                        Select your school type
                      </MenuItem>
                      {Array.from(
                        this.props.picklists.type.list.entries(),
                        (entry) => entry
                      ).map((entry, index) => (
                        <MenuItem key={index} value={entry[1]}>
                          {entry[1]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <BlackHeaderTypography>School Name*</BlackHeaderTypography>
                  <FormControl
                    required
                    className={this.props.classes.dropDowns}
                  >
                    <Select
                      value={this.state.schoolName}
                      onChange={this.handleChange}
                      name="schoolName"
                      displayEmpty
                      disableUnderline={true}
                      className={this.props.classes.selectField}
                    >
                      {" "}
                      <MenuItem value="" disabled>
                        Select your school name
                      </MenuItem>
                      {this.state.filteredSchoolList.map((school, index) => (
                        <MenuItem key={index} value={school.name}>
                          {school.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <BlackHeaderTypography>Position*</BlackHeaderTypography>
                  <FormControl
                    required
                    className={this.props.classes.dropDowns}
                  >
                    <Select
                      value={this.state.picklistInfo.position}
                      onChange={this.handlepicklistInfoChange}
                      name="position"
                      displayEmpty
                      disableUnderline={true}
                      className={this.props.classes.selectField}
                    >
                      <MenuItem value="" disabled>
                        Select your position
                      </MenuItem>
                      {Array.from(
                        this.props.picklists.position.list.entries(),
                        (entry) => entry
                      ).map((entry, index) => (
                        <MenuItem key={index} value={entry[1]}>
                          {entry[1]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <BlackHeaderTypography>Phone Number*</BlackHeaderTypography>
                  <OutlinedTextField
                    placeholder="At least 8 characters"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={this.handleChange}
                    className={this.props.classes.textField}
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                      required: true,
                    }}
                  />
                </div>
                <Divider />
                <div className={this.props.classes.formSection}>
                  <BlackHeaderTypography style={{ marginBottom: "2em" }}>
                    BEP Information
                  </BlackHeaderTypography>
                  <BlackHeaderTypography style={{ padding: "1em 0em" }}>
                    Which activities are you interested in?*
                  </BlackHeaderTypography>
                  <Grid className={this.props.classes.multiSelect}>
                    {Array.from(
                      this.state.picklistInfo.educatorDesiredActivities.entries(),
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
                            onChange={this.createHandleSelectOption(
                              "educatorDesiredActivities"
                            )}
                          />
                        </Grid>
                        <Grid item xs={11}>
                          <BlackTextTypography> {option}</BlackTextTypography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                  <BlackHeaderTypography>
                    How did you hear about us?*
                  </BlackHeaderTypography>
                  <FormControl className={this.props.classes.dropDowns}>
                    <Select
                      value={this.state.picklistInfo.introductionMethod}
                      onChange={this.handlepicklistInfoChange}
                      name="introductionMethod"
                      displayEmpty
                      disableUnderline={true}
                      className={this.props.classes.selectField}
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
                    </Select>
                  </FormControl>
                  <BlackHeaderTypography style={{ padding: "1em 0em" }}>
                    Which BEP programs would you like more information about?*
                  </BlackHeaderTypography>
                  <Grid className={this.props.classes.multiSelect}>
                    {Array.from(
                      this.state.picklistInfo.moreInfo.entries(),
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
                            onChange={this.createHandleSelectOption("moreInfo")}
                          />
                        </Grid>
                        <Grid item xs={11}>
                          <BlackTextTypography> {option}</BlackTextTypography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </div>

                <Divider />
                <div className={this.props.classes.formSection}>
                  <Grid container spacing={0} alignItems="center">
                    <OutlinedCheckbox
                      name="isSubscribed"
                      onChange={() =>
                        this.setState({
                          isSubscribed: !this.state.isSubscribed,
                        })
                      }
                    />
                    <BlackHeaderTypography>
                      I would like to subscribe to the BEP newsletter
                    </BlackHeaderTypography>
                  </Grid>
                  <Grid container spacing={0} alignItems="center">
                    <OutlinedCheckbox
                      name="agreeConditions"
                      onChange={() =>
                        this.setState({
                          agreeConditions: !this.state.agreeConditions,
                        })
                      }
                    />
                    <BlackHeaderTypography>
                      I agree to the BEP terms and conditions*
                    </BlackHeaderTypography>
                  </Grid>
                  <ContainedButton type="submit" style={{ marginTop: "3em" }}>
                    Finish Registration
                  </ContainedButton>
                </div>
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
    schoolList: getSchools(state.schoolList),
    picklists: {
      educatorDesiredActivities: {
        list: getEducatorDesiredActivitiesPicklist(state.picklists),
      },
      introductionMethod: {
        list: getIntroductionMethodPicklist(state.picklists),
      },
      position: {
        list: getPositionPicklist(state.picklists),
      },
      moreInfo: {
        list: getMoreInfoPicklist(state.picklists),
      },
      schoolBoard: {
        list: getSchoolBoardPicklist(state.picklists),
      },
      type: {
        list: getSchoolTypePicklist(state.picklists),
      },
    },
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchUserPicklists: (picklistType: PicklistType) =>
    dispatch(fetchUserPicklistService(picklistType)),
  fetchSchoolPicklists: (picklistType: PicklistType) =>
    dispatch(fetchSchoolPicklistService(picklistType)),
  fetchSchoolList: () => dispatch(fetchSchoolListService()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EducatorRegistration));
