import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { fetchPicklistsService } from "../../data/services/userPicklistServices";
import {
  getEducatorDesiredActivitiesPicklist,
  getSchoolBoardPicklist,
  getSchoolNamePicklist,
  getPositionPicklist,
  getIntroductionMethodPicklist,
} from "../../data/selectors/userPicklistSelector";
import { UserPicklistType } from "../../data/types/userPicklistTypes";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Grid } from "@material-ui/core";

import axios from "axios";

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
} from "../../components/index";

type Picklist = {};

interface StateProps {
  picklists: {
    educatorDesiredActivities: { displayName: string; list: string[] };
    schoolBoard: { displayName: string; list: string[] };
    schoolName: { displayName: string; list: string[] };
    position: { displayName: string; list: string[] };
    introductionMethod: { displayName: string; list: string[] };
  };
}

interface DispatchProps {
  fetchPicklists: any;
}

interface IEducator {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  showPicklist: {
    educatorDesiredActivities: Map<string, boolean>;
    schoolBoard: Map<string, boolean>;
    schoolName: Map<string, boolean>;
    position: Map<string, boolean>;
    introductionMethod: Map<string, boolean>;
  };
}

type Props = DispatchProps & StateProps;

const EducatorRegistration: React.SFC<Props> = ({
  picklists,
  fetchPicklists,
}: Props) => {
  const [state, setState] = useState<IEducator>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    showPicklist: {
      educatorDesiredActivities: new Map(),
      schoolBoard: new Map(),
      schoolName: new Map(),
      position: new Map(),
      introductionMethod: new Map(),
    },
  });

  const picklistTypes: UserPicklistType[] = [
    UserPicklistType.educatorDesiredActivities,
    UserPicklistType.schoolBoard,
    UserPicklistType.schoolName,
    UserPicklistType.position,
    UserPicklistType.introductionMethod,
  ];

  const createFilters = (filterNames: string[]): Array<[string, boolean]> => {
    return filterNames.map((item: string) => [item, false]);
  };

  useEffect(() => {
    console.log("here?");

    //test
    fetchPicklists(UserPicklistType.introductionMethod).then(() => {
      console.log(picklists);
    });
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      <PageBody>
        <div>Register for an educator account</div>
        <BlackTextTypography>Account Information</BlackTextTypography>
        <OutlinedTextField
          placeholder="e.g. name@email.com"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <BlackTextTypography>Account Password</BlackTextTypography>
        <OutlinedTextField
          placeholder="At least 8 characters"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <BlackTextTypography>Confirm Password</BlackTextTypography>
        <OutlinedTextField
          placeholder="At least 8 characters"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
        />
        <BlackTextTypography>First Name</BlackTextTypography>
        <OutlinedTextField
          placeholder="Enter first name"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
        />
        <BlackTextTypography>Last Name</BlackTextTypography>
        <OutlinedTextField
          placeholder="Enter last name"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
        />
        <BlackTextTypography>School Board</BlackTextTypography>
        <ContainedSelect
          placeholder="Select your school board"
          name="schoolBoard"
          value={[]}
          key="schoolBoard"
          id="schoolBoard"
          multiple
          disableUnderline={true}
          displayEmpty={true}
          onChange={handleChange}
          renderValue={() => {
            return (
              document.activeElement && (
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <Grid item>
                    {document.activeElement.id === "schoolBoard" ? (
                      <SecondaryMainTextTypography
                        align="center"
                        variant="button"
                      >
                        {picklists.schoolBoard.displayName}
                      </SecondaryMainTextTypography>
                    ) : (
                      <BlackTextTypography align="center" variant="button">
                        {picklists.schoolBoard.displayName}
                      </BlackTextTypography>
                    )}
                  </Grid>
                </Grid>
              )
            );
          }}
        >
          {/* {Array.from(picklist.entries(), (entry) => entry).map(
            ([option, isSelected]) => (
              <MenuItem key={option} value={option} id="schoolBoard">
                <OutlinedCheckbox checked={isSelected} />
                {option}
              </MenuItem>
            )
          )} */}
        </ContainedSelect>

        {/* <BlackTextTypography>School</BlackTextTypography>
        <ContainedSelect
          value={state.showPicklist.schoolName}
          name="schoolName"
          placeholder="Select your school's name"
          onChange={handleChange}
        />
        <BlackTextTypography>Position</BlackTextTypography>
        <ContainedSelect
          placeholder="Select your position at the school"
          name="position"
          value={state.showPicklist.position}
          onChange={handleChange}
        /> */}
        <BlackTextTypography>Phone Number</BlackTextTypography>
        <OutlinedTextField
          placeholder="At least 8 characters"
          name="phoneNumber"
          value={state.phoneNumber}
          onChange={handleChange}
        />
        <BlackTextTypography>BEP Information</BlackTextTypography>
        <BlackTextTypography>
          Which activities are you interested in?
        </BlackTextTypography>
        <OutlinedCheckbox />
        <BlackTextTypography>How did you hear about us</BlackTextTypography>
        <OutlinedCheckbox />
        {/* <ContainedButton onClick={handleSubmit}>
          <BlackTextTypography>Finish Registration </BlackTextTypography>
        </ContainedButton> */}
      </PageBody>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): StateProps => {
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
    },
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  fetchPicklists: (picklistType: UserPicklistType) =>
    dispatch(fetchPicklistsService(picklistType)),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(EducatorRegistration);
