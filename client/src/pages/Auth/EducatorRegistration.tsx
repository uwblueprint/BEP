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

import { baseURL } from "../../utils/ApiUtils";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";

import { Grid } from "@material-ui/core";

import axios from "axios";
import { Link } from "react-router-dom";

import {
  ContainedSelect,
  SecondaryMainTextTypography,
  ContainedButton,
  DarkContainedButton,
  OutlinedTextField,
  BlackTextTypography,
  PageHeader,
  OutlinedCheckbox,
  PageBody,
  TextField,
  Select,
} from "../../components/index";

const styles = () => ({
  selectTextField: {
    width: "40%",
    marginBottom: "24px",
  },
  card: {
    padding: "3em",
    backgroundColor: "#fff",
    borderRadius: "2px",
    margin: "2em 0em",
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
}

interface IComponentState {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  schoolName: string;
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
    // this.fetchSchoolList = this.fetchSchoolList.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      schoolName: "",
      filteredSchoolList: schoolList,
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

  public educatorDesiredActivitiesList: string[] = [];

  componentDidMount() {
    const picklistTypes: PicklistType[] = [
      PicklistType.educatorDesiredActivities,
      PicklistType.position,
      PicklistType.introductionMethod,
      PicklistType.moreInfo,
    ];

    const createPicklist = (
      filterNames: string[]
    ): Array<[string, boolean]> => {
      return filterNames.map((item: string) => [item, false]);
    };

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

    const schoolListTypes: PicklistType[] = [
      PicklistType.schoolBoard,
      PicklistType.type,
    ];

    schoolListTypes.forEach((type: PicklistType) => {
      this.props.fetchSchoolPicklists(type);
    });

    this.props.fetchSchoolList().then(() => {
      this.setState({
        filteredSchoolList: this.props.schoolList,
      });
    });

    // .then(() => {
    //   this.setState({
    //     filteredSchoolList: this.state.filteredSchoolList.concat(
    //       this.filterAllFields(this.props.schoolList)
    //     ),
    //   });
    // });
  }

  componentDidUpdate(prevProps: IComponentProps, prevState: IComponentState) {
    if (prevState.picklistInfo !== this.state.picklistInfo) {
      console.log("change");
      this.educatorDesiredActivitiesList = [];

      Array.from(
        this.state.picklistInfo.educatorDesiredActivities.entries()
      ).forEach((entry) => {
        if (entry[1] == true) {
          this.educatorDesiredActivitiesList.push(entry[0]);
        }
      });

      // Array.from(
      //   this.state.picklistInfo.educatorDesiredActivities.entries()
      // ).forEach((entry) => {
      //   if (entry[1] == true) {
      //     console.log("Test" + this.educatorDesiredActivitiesList);
      //   }
      // });
    }
  }

  getFilterFunction = (fieldName: string) => {
    console.log(fieldName);
    switch (fieldName) {
      case "schoolBoard":
        return this.filterSchoolBoard;
      case "type":
        return this.filterSchoolType;
    }
    return (school: School, filter: string) => true;
  };

  handleschoolInfoChange = (event: any) => {
    const { name, value } = event.target;
    const schoolInfo = this.state.schoolInfo;
    console.log("School Info Change");
    console.log(event.target.value);

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

  schoolListCallback() {
    this.setState({
      filteredSchoolList: this.filterAllFields(this.props.schoolList),
    });
  }

  filterAllFields(schools: School[]) {
    const newSchools = schools.filter((school: School) => {
      var pass = true;
      console.log(this.state.schoolInfo);

      for (let [fieldName, filterMap] of Object.entries(
        this.state.schoolInfo
      )) {
        const filterFunction = this.getFilterFunction(fieldName);

        if (pass && !filterFunction(school, filterMap)) {
          console.log("hello");
          pass = false;
        }
        if (!pass) return false;
        return true;
      }
      console.log("pass is " + pass);
    });
    return newSchools;
  }

  filterSchoolBoard = (school: School, filter: string) =>
    school.schoolBoard.includes(filter);

  filterSchoolType = (school: School, filter: string) =>
    school.type.includes(filter);

  // fetchSchoolList() {
  //   this.props.fetchSchoolList.then(() => {
  //     this.setState({
  //       filteredSchoolList: this.state.filteredSchoolList.concat(
  //         this.filterAllFields(this.props.schoolList)
  //       ),
  //     });
  //   });
  // }

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

  test = () => {
    const myMap = this.state.picklistInfo.educatorDesiredActivities;

    Array.from(
      this.state.picklistInfo.educatorDesiredActivities.entries()
    ).forEach((entry) =>
      console.log("Key: " + entry[0] + " Value: " + entry[1])
    );
  };

  handleChange = (event: any) => {
    console.log("State Change");

    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
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
    axios
      .post(`${baseURL}/api/users/`, this.state)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const picklistName = "educatorDesiredActivities";

    return (
      <React.Fragment>
        <PageBody>
          <div style={{ marginTop: "5em" }}>
            <Link to="/">Back</Link>
            <Typography variant="h1">
              Register for an educator account
            </Typography>
            <Grid
              container
              spacing={4}
              direction="column"
              style={{
                padding: "3em",
                backgroundColor: "#fff",
                borderRadius: "2px",
                margin: "2em 0em",
              }}
            >
              <BlackTextTypography>School Board</BlackTextTypography>
              <FormControl required>
                <Select
                  value={this.state.schoolInfo.schoolBoard}
                  onChange={this.handleschoolInfoChange}
                  name="schoolBoard"
                  displayEmpty
                  disableUnderline={true}
                  style={{
                    width: "40%",
                    border: "1px solid #bcbcbc",
                    padding: "8px 8px 3px 12px",
                    borderRadius: "3px",
                    marginBottom: "24px",
                  }}
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
              <BlackTextTypography>School Type</BlackTextTypography>
              <FormControl required>
                <Select
                  value={this.state.schoolInfo.type}
                  onChange={this.handleschoolInfoChange}
                  name="type"
                  displayEmpty
                  disableUnderline={true}
                  style={{
                    width: "40%",
                    border: "1px solid #bcbcbc",
                    padding: "8px 8px 3px 12px",
                    borderRadius: "3px",
                    marginBottom: "24px",
                  }}
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

              <BlackTextTypography>School Name</BlackTextTypography>

              <FormControl required>
                <Select
                  value={this.state.schoolName}
                  onChange={this.handleChange}
                  name="schoolName"
                  displayEmpty
                  disableUnderline={true}
                  style={{
                    width: "40%",
                    border: "1px solid #bcbcbc",
                    padding: "8px 8px 3px 12px",
                    borderRadius: "3px",
                    marginBottom: "24px",
                  }}
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

              <BlackTextTypography>Position</BlackTextTypography>
              <FormControl required>
                <Select
                  value={this.state.picklistInfo.position}
                  onChange={this.handlepicklistInfoChange}
                  name="position"
                  displayEmpty
                  disableUnderline={true}
                  style={{
                    width: "40%",
                    border: "1px solid #bcbcbc",
                    padding: "8px 8px 3px 12px",
                    borderRadius: "3px",
                    marginBottom: "24px",
                  }}
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
