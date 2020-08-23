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
  getExpertiesAreasPicklist,
} from "../../data/selectors/userPicklistSelector";
import { UserPicklistType } from "../../data/types/userPicklistTypes";

import {
  ContainedSelect,
  ContainedButton,
  DarkContainedButton,
  OutlinedTextField,
  BlackTextTypography,
  PageHeader,
  OutlinedCheckbox,
  PageBody,
} from "../../components/index";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

interface StateProps {
  picklists: {
    expertiseAreas: { displayName: string; list: string[] }; //TESTING
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
  showPicklist: {
    expertiseAreas: Map<string, boolean>;
    educatorDesiredActivities: Map<string, boolean>;
    schoolBoard: Map<string, boolean>;
    schoolName: Map<string, boolean>;
    position: Map<string, boolean>;
    introductionMethod: Map<string, boolean>;
  };
  phoneNumber: number;
}

type Props = DispatchProps & StateProps;

const EducatorRegistration: React.SFC<Props> = ({ fetchPicklists }: Props) => {
  const [state, setState] = useState<IEducator>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    showPicklist: {
      expertiseAreas: new Map(),
      educatorDesiredActivities: new Map(),
      schoolBoard: new Map(),
      schoolName: new Map(),
      position: new Map(),
      introductionMethod: new Map(),
    },
  });

  useEffect(() => {
    const picklistTypes: UserPicklistType[] = [
      UserPicklistType.expertiseAreas,
      UserPicklistType.educatorDesiredActivities,
      UserPicklistType.schoolBoard,
      UserPicklistType.schoolName,
      UserPicklistType.position,
      UserPicklistType.introductionMethod,
    ];
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
          required
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
          placeholder="Selected your school board"
          name="schoolBoard"
          value={state.showPicklist.schoolBoard}
          onChange={handleChange}
        />
        <BlackTextTypography>School</BlackTextTypography>
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
        />
        <BlackTextTypography>Phone Number</BlackTextTypography>
        <OutlinedTextField
          placeholder="At least 8 characters"
          name="position"
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
      </PageBody>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    picklists: {
      expertiseAreas: {
        displayName: "Areas of Expertise",
        list: getExpertiesAreasPicklist(state.userPicklists),
      },
      educatorDesiredActivities: {
        displayName: "Educator Desired Activities",
        list: getEducatorDesiredActivitiesPicklist(state.userPicklist),
      },
      schoolBoard: {
        displayName: "School Board",
        list: getSchoolBoardPicklist(state.userPicklist),
      },
      schoolName: {
        displayName: "School Name",
        list: getSchoolNamePicklist(state.userPicklist),
      },
      introductionMethod: {
        displayName: "Introduction Method",
        list: getIntroductionMethodPicklist(state.userPicklist),
      },
      position: {
        displayName: "Position",
        list: getPositionPicklist(state.userPicklist),
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
)(EducatorRegistration);
