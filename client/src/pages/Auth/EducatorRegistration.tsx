import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

/* Types */
import { PicklistType } from "../../data/types/picklistTypes";
import { SchoolListType } from "../../data/types/schoolListTypes";

/* Services */
import { fetchPicklistsService } from "../../data/services/picklistServices";
import { fetchSchoolListService } from "../../data/services/schoolListServices";

/* Selectors */
import {
  getSchoolBoardList,
  getSchoolNameList,
} from "../../data/selectors/schoolListSelector";
import {
  getEducatorDesiredActivitiesPicklist,
  getPositionPicklist,
  getIntroductionMethodPicklist,
  getMoreInfoPicklist,
} from "../../data/selectors/picklistSelector";

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
    educatorDesiredActivities: { list: string[] };
    position: { list: string[] };
    introductionMethod: { list: string[] };
    moreInfo: { list: string[] };
  };
  schoolLists: {
    schoolBoard: { list: string[] };
    schoolName: { list: string[] };
  };
  fetchPicklists: any;
  fetchSchoolLists: any;
}

interface IComponentState {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  picklistInfo: {
    educatorDesiredActivities: Map<string, boolean>;
    moreInfo: Map<string, boolean>;
    position: string;
    introductionMethod: string;
  };
  schoolInfo: {
    schoolBoard: string;
    schoolName: string;
  };
}

class EducatorRegistration extends React.Component<
  IComponentProps,
  IComponentState
> {
  constructor(props: any) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handlepicklistInfoChange = this.handlepicklistInfoChange.bind(this);
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
      picklistInfo: {
        educatorDesiredActivities: new Map(),
        moreInfo: new Map(),
        introductionMethod: "",
        position: "",
      },
      schoolInfo: {
        schoolBoard: "",
        schoolName: "",
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
      this.props.fetchPicklists(type).then(() => {
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

    const schoolListTypes: SchoolListType[] = [
      SchoolListType.schoolBoard,
      SchoolListType.name,
    ];

    schoolListTypes.forEach((type: SchoolListType) => {
      this.props.fetchSchoolLists(type);
    });
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
    console.log(event.target.value);
    const { id, value } = event.target;
    this.setState({ ...this.state, [id]: value });
  };

  handlepicklistInfoChange = (event: any) => {
    const { id, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      picklistInfo: {
        ...prevState.picklistInfo,
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
              {console.log("List" + this.educatorDesiredActivitiesList)}
              {console.log(this.state.picklistInfo.educatorDesiredActivities)}
              <BlackTextTypography>
                Which activities are you interested in?
              </BlackTextTypography>
              <Grid style={{ columns: "2 auto" }}>
                {Array.from(
                  this.state.picklistInfo.educatorDesiredActivities.entries(),
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
                  this.state.picklistInfo.moreInfo.entries(),
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
          </div>
        </PageBody>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
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
    },
    schoolList: {
      schoolBoard: {
        list: getSchoolBoardList(state.schoolList),
      },
      schoolName: {
        list: getSchoolNameList(state.schoolList),
      },
    },
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchPicklists: (picklistType: PicklistType) =>
    dispatch(fetchPicklistsService(picklistType)),
  fetchSchoolLists: (schoolListType: SchoolListType) =>
    dispatch(fetchSchoolListService(schoolListType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EducatorRegistration));
