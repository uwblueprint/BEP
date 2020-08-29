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
import { eventNames } from "cluster";

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
  picklists: {
    educatorDesiredActivities: { displayName: string; list: string[] };
    schoolBoard: { displayName: string; list: string[] };
    schoolName: { displayName: string; list: string[] };
    position: { displayName: string; list: string[] };
    introductionMethod: { displayName: string; list: string[] };
    moreInfo: { displayName: string; list: string[] };
  };
  fetchPicklists: any;
}

interface IComponentState {
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

class EducatorRegistration extends React.Component<
  IComponentProps,
  IComponentState
> {
  public educatorDesiredActivitiesList: string[] = [];
  constructor(props: any) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleShowPicklistChange = this.handleShowPicklistChange.bind(this);
    this.createHandleSelectOption = this.createHandleSelectOption.bind(this);
    this.createUpdateOptions = this.createUpdateOptions.bind(this);

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

  // let educatorDesiredActivitiesList = [];

  componentDidMount() {
    const picklistTypes: UserPicklistType[] = [
      UserPicklistType.educatorDesiredActivities,
      UserPicklistType.schoolBoard,
      UserPicklistType.schoolName,
      UserPicklistType.position,
      UserPicklistType.introductionMethod,
      UserPicklistType.moreInfo,
    ];

    const createPicklist = (
      filterNames: string[]
    ): Array<[string, boolean]> => {
      return filterNames.map((item: string) => [item, false]);
    };

    picklistTypes.forEach((type: UserPicklistType) => {
      this.props.fetchPicklists(type).then(() => {
        const picklists = this.props.picklists;
        const showPicklist = this.state.showPicklist;

        if (type === UserPicklistType.educatorDesiredActivities) {
          showPicklist.educatorDesiredActivities = new Map(
            createPicklist(picklists.educatorDesiredActivities.list)
          );
        } else if (type === UserPicklistType.introductionMethod) {
          showPicklist.introductionMethod = new Map(
            createPicklist(picklists.introductionMethod.list)
          );
        } else if (type === UserPicklistType.moreInfo) {
          showPicklist.moreInfo = new Map(
            createPicklist(picklists.moreInfo.list)
          );
        }
        this.setState({ showPicklist });
      });
    });
  }

  componentDidUpdate(prevProps: IComponentProps, prevState: IComponentState) {
    if (prevState.showPicklist !== this.state.showPicklist) {
      console.log("change");
      this.educatorDesiredActivitiesList = [];

      Array.from(
        this.state.showPicklist.educatorDesiredActivities.entries()
      ).forEach((entry) => {
        if (entry[1] == true) {
          this.educatorDesiredActivitiesList.push(entry[0]);
        }
      });

      // Array.from(
      //   this.state.showPicklist.educatorDesiredActivities.entries()
      // ).forEach((entry) => {
      //   if (entry[1] == true) {
      //     console.log("Test" + this.educatorDesiredActivitiesList);
      //   }
      // });
    }
  }

  getMultiPicklist(picklistName: string) {
    const picklists = this.state.showPicklist;
    switch (picklistName) {
      case "educatorDesiredActivities":
        return picklists.educatorDesiredActivities;
      case "introductionMethod":
        return picklists.introductionMethod;
      case "moreInfo":
        return picklists.moreInfo;
    }
    return new Map<string, boolean>();
  }

  createUpdateOptions(picklistName: string) {
    const showPicklists = this.state.showPicklist;
    const picklistOptions = this.getMultiPicklist(picklistName);

    return (selectedOptions: string) => {
      picklistOptions.set(
        selectedOptions,
        !picklistOptions.get(selectedOptions)
      );

      this.setState({
        showPicklist: {
          ...showPicklists,
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
    const myMap = this.state.showPicklist.educatorDesiredActivities;

    Array.from(
      this.state.showPicklist.educatorDesiredActivities.entries()
    ).forEach((entry) =>
      console.log("Key: " + entry[0] + " Value: " + entry[1])
    );
  };

  handleChange = (event: any) => {
    console.log(event.target.value);
    const { id, value } = event.target;
    this.setState({ ...this.state, [id]: value });
  };

  handleShowPicklistChange = (event: any) => {
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
    const picklistName = "educatorDesiredActivities";

    return (
      <React.Fragment>
        <PageBody>
          <Link to="/">Back</Link>
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
            {console.log("List" + this.educatorDesiredActivitiesList)}
            {console.log(this.state.showPicklist.educatorDesiredActivities)}
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
                    key={option}
                    value={option}
                    name={option}
                    onChange={this.createHandleSelectOption(picklistName)}
                  />
                  {option}
                </div>
              ))}
            </Grid>
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
