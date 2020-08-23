import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { fetchPicklistsService } from "../../data/services/userPicklistServices";
import { getEducatorDesiredActivities } from "../../data/selectors/userPicklistSelector";
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

interface Picklist {
  educatorDesiredActivities: { displayName: string; list: string };
  schoolBoard: { displayName: string; list: string };
  schoolName: { displayName: string; list: string };
  position: { displayName: string; list: string };
  introductionMethod: { displayName: string; list: string };
}

interface StateProps {
  picklists: Picklist[];
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
  fetchedPicklist: {
    educatorDesiredActivities: Map<string, boolean>;
    schoolBoard: Map<string, boolean>;
    schoolName: Map<string, boolean>;
    position: Map<string, boolean>;
    introductionMethod: Map<string, boolean>;
  };
  phoneNumber: number;
}

type Props = DispatchProps & StateProps;

const EducatorRegistration: React.SFC<Props> = ({
  fetchPicklists,
  picklists,
}: Props) => {
  const [state, setState] = useState<IEducator>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    fetchedPicklist: {
      educatorDesiredActivities: new Map(),
      schoolBoard: new Map(),
      schoolName: new Map(),
      position: new Map(),
      introductionMethod: new Map(),
    },
  });

  useEffect(() => {
    const picklistTypes: UserPicklistType[] = [
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
          value={state.fetchedPicklist.schoolBoard}
          onChange={handleChange}
        />
        <BlackTextTypography>School</BlackTextTypography>
        <ContainedSelect
          value={state.fetchedPicklist.schoolName}
          name="schoolName"
          placeholder="Select your school's name"
          onChange={handleChange}
        />
        <BlackTextTypography>Position</BlackTextTypography>
        <ContainedSelect
          placeholder="Select your position at the school"
          name="position"
          value={state.fetchedPicklist.position}
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
      educatorDesiredActivities: {
        displayName: "Educator Desired Activities",
        list: getEducatorDesiredActivities(state.userPicklist),
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
