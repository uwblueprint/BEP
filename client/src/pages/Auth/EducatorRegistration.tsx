import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { fetchPicklistsService } from "../../data/services/userPicklistServices";
import {
  getEducatorDesiredActivitiesPicklist,
  getSchoolBoardPicklist,
  getSchoolNamePicklist,
  getPositionPicklist,
  getIntroductionMethodPicklist,
  getMoreInfoPicklist,
} from "../../data/selectors/userPicklistSelector";
import { baseURL } from "../../utils/ApiUtils";

import { UserPicklistType } from "../../data/types/userPicklistTypes";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";

import { Grid } from "@material-ui/core";

import axios from "axios";

import InputLabel from "@material-ui/core/InputLabel";

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

class EducatorRegistration extends React.Component<
  {
    picklists: {
      educatorDesiredActivities: { displayName: string; list: string[] };
      schoolBoard: { displayName: string; list: string[] };
      schoolName: { displayName: string; list: string[] };
      position: { displayName: string; list: string[] };
      introductionMethod: { displayName: string; list: string[] };
      moreInfo: { displayName: string; list: string[] };
    };
    fetchPicklists: any;
  },
  {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    showPicklist: {
      educatorDesiredActivities: Map<string, boolean>;
      schoolBoard: string;
      schoolName: string;
      position: string;
      introductionMethod: Map<string, boolean>;
      moreInfo: Map<string, boolean>;
    };
  }
> {
  constructor(props: any) {
    super(props);

    const { picklists } = props;

    this.handleChange = this.handleChange.bind(this);
    this.handleOtherChange = this.handleOtherChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      showPicklist: {
        educatorDesiredActivities: new Map(),
        schoolBoard: "",
        schoolName: "",
        position: "",
        introductionMethod: new Map(),
        moreInfo: new Map(),
      },
    };
  }

  componentDidMount() {
    const picklistTypes: UserPicklistType[] = [
      UserPicklistType.educatorDesiredActivities,
      UserPicklistType.schoolBoard,
      UserPicklistType.schoolName,
      UserPicklistType.position,
      UserPicklistType.introductionMethod,
      UserPicklistType.moreInfo,
    ];

    const createFilters = (filterNames: string[]): Array<[string, boolean]> => {
      return filterNames.map((item: string) => [item, false]);
    };

    picklistTypes.forEach((type: UserPicklistType) => {
      this.props.fetchPicklists(type).then(() => {
        const picklists = this.props.picklists;
        const showPicklist = this.state.showPicklist;

        if (type === UserPicklistType.educatorDesiredActivities) {
          showPicklist.educatorDesiredActivities = new Map(
            createFilters(picklists.educatorDesiredActivities.list)
          );
        } else if (type === UserPicklistType.introductionMethod) {
          showPicklist.introductionMethod = new Map(
            createFilters(picklists.introductionMethod.list)
          );
        } else if (type === UserPicklistType.moreInfo) {
          showPicklist.moreInfo = new Map(
            createFilters(picklists.moreInfo.list)
          );
        }
        this.setState({ showPicklist });
      });
    });
  }

  handleChange = (event: any) => {
    console.log(event.target.value);
    const { id, value } = event.target;
    this.setState({ ...this.state, [id]: value });
  };

  handleOtherChange = (event: any) => {
    const { id, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      showPicklist: {
        ...prevState.showPicklist,
        [id]: value,
      },
    }));
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
    return (
      <React.Fragment>
        <PageBody>
          <Typography variant="h1">Register for an educator account</Typography>
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
            {console.log(this.state.showPicklist.position)}
            <BlackTextTypography>Account Information</BlackTextTypography>

            <BlackTextTypography>Email</BlackTextTypography>
            <OutlinedTextField
              placeholder="e.g. name@email.com"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              style={{ width: "40%", marginBottom: "24px" }}
            />

            <BlackTextTypography>Account Password</BlackTextTypography>
            <OutlinedTextField
              placeholder="At least 8 characters"
              id="password"
              type="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handleChange}
              style={{ width: "40%", marginBottom: "24px" }}
            />

            <BlackTextTypography>Confirm Password</BlackTextTypography>
            <OutlinedTextField
              placeholder="At least 8 characters"
              id="confirmPassword"
              value={this.state.confirmPassword}
              type="password"
              autoComplete="current-password"
              onChange={this.handleChange}
              style={{ width: "40%", marginBottom: "24px" }}
            />
            <BlackTextTypography>First Name</BlackTextTypography>
            <OutlinedTextField
              placeholder="Enter first name"
              id="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
              style={{ width: "40%", marginBottom: "24px" }}
            />
            <BlackTextTypography>Last Name</BlackTextTypography>
            <OutlinedTextField
              placeholder="Enter last name"
              id="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
              style={{ width: "40%", marginBottom: "24px" }}
            />
            <BlackTextTypography>School Board</BlackTextTypography>

            <FormControl variant="outlined">
              <Select
                native
                value={this.state.showPicklist.schoolBoard}
                onChange={this.handleOtherChange}
                style={{ width: "40%", marginBottom: "24px" }}
                inputProps={{
                  id: "schoolBoard",
                }}
              >
                {Array.from(
                  this.props.picklists.schoolBoard.list.entries(),
                  (entry) => entry
                ).map((entry, index) => (
                  <option key={index} value={entry[1]}>
                    {entry[1]}
                  </option>
                ))}
              </Select>
            </FormControl>

            <BlackTextTypography>School Name</BlackTextTypography>

            <FormControl variant="outlined">
              <Select
                native
                value={this.state.showPicklist.schoolName}
                onChange={this.handleOtherChange}
                style={{ width: "40%", marginBottom: "24px" }}
                inputProps={{
                  id: "schoolName",
                }}
              >
                <option aria-label="None" value="" />
                {Array.from(
                  this.props.picklists.schoolName.list.entries(),
                  (entry) => entry
                ).map((entry, index) => (
                  <option key={index} value={entry[1]}>
                    {entry[1]}
                  </option>
                ))}
              </Select>
            </FormControl>

            <BlackTextTypography>Position</BlackTextTypography>

            <FormControl variant="outlined">
              <Select
                native
                value={this.state.showPicklist.position}
                onChange={this.handleOtherChange}
                style={{ width: "40%", marginBottom: "24px" }}
                inputProps={{
                  id: "position",
                }}
              >
                <option aria-label="None" value="" />
                {Array.from(
                  this.props.picklists.position.list.entries(),
                  (entry) => entry
                ).map((entry, index) => (
                  <option key={index} value={entry[1]}>
                    {entry[1]}
                  </option>
                ))}
              </Select>
            </FormControl>

            <BlackTextTypography>Phone Number</BlackTextTypography>
            <OutlinedTextField
              placeholder="At least 8 characters"
              id="firstName"
              value={this.state.phoneNumber}
              onChange={this.handleChange}
              style={{ width: "40%", marginBottom: "24px" }}
            />

            <BlackTextTypography>
              Which activities are you interested in?
            </BlackTextTypography>
            <Grid style={{ columns: "2 auto" }}>
              {Array.from(
                this.state.showPicklist.educatorDesiredActivities.entries(),
                (entry) => entry
              ).map(([option, isSelected]) => (
                <div>
                  <OutlinedCheckbox
                    checked={isSelected}
                    key={option}
                    value={option}
                  />
                  {option}
                </div>
              ))}
            </Grid>

            <BlackTextTypography>How did you hear about us</BlackTextTypography>

            <FormControl variant="outlined">
              <Select
                native
                value={this.state.showPicklist.introductionMethod}
                onChange={this.handleOtherChange}
                style={{ width: "40%", marginBottom: "24px" }}
                inputProps={{
                  id: "introductionMethod",
                }}
              >
                <option aria-label="None" value="" />
                {Array.from(
                  this.props.picklists.introductionMethod.list.entries(),
                  (entry) => entry
                ).map((entry, index) => (
                  <option key={index} value={entry[1]}>
                    {entry[1]}
                  </option>
                ))}
              </Select>
            </FormControl>
            <BlackTextTypography>
              Which BEP programs would you like more information about?
            </BlackTextTypography>
            <Grid style={{ columns: "2 auto" }}>
              {Array.from(
                this.state.showPicklist.moreInfo.entries(),
                (entry) => entry
              ).map(([option, isSelected]) => (
                <div>
                  <OutlinedCheckbox key={option} value={option} />
                  {option}
                </div>
              ))}
            </Grid>
            <ContainedButton onClick={this.handleSubmit}>
              Finish Registration
            </ContainedButton>
          </Grid>
        </PageBody>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    picklists: {
      educatorDesiredActivities: {
        displayName: "Educator Desired Activities",
        list: getEducatorDesiredActivitiesPicklist(state.userPicklists),
      },
      schoolBoard: {
        displayName: "School Board",
        list: getSchoolBoardPicklist(state.userPicklists),
      },
      schoolName: {
        displayName: "School Name",
        list: getSchoolNamePicklist(state.userPicklists),
      },
      introductionMethod: {
        displayName: "Introduction Method",
        list: getIntroductionMethodPicklist(state.userPicklists),
      },
      position: {
        displayName: "Position",
        list: getPositionPicklist(state.userPicklists),
      },
      moreInfo: {
        displayName: "moreInfo",
        list: getMoreInfoPicklist(state.userPicklists),
      },
    },
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchPicklists: (picklistType: UserPicklistType) =>
    dispatch(fetchPicklistsService(picklistType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EducatorRegistration));
