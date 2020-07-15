import React from "react";

import { connect } from "react-redux";

/* Services */
import { fetchVolunteersService } from "../../data/services/volunteersServices";
import { fetchPicklistsService } from "../../data/services/userPicklistServices";

/* Selectors */
import { getVolunteers } from "../../data/selectors/volunteersSelector";
import {
  getExternalActivitesPicklist,
  getInternalActivitesPicklist,
  getExpertiesAreasPicklist,
  getGradesPicklist,
  getPostSecondaryTrainingPicklist,
} from "../../data/selectors/userPicklistSelector";

/* Types */
import { Volunteer } from "../../data/types/userTypes";
import { UserPicklistType } from "../../data/types/userPicklistTypes";

/* Components */
import VolunteerCard from "./VolunteerCard";
import Select from "../../components/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Grid } from "@material-ui/core";

class VolunteerList extends React.Component<
  {
    volunteers: Volunteer[];
    picklists: {
      activities: string[];
      expertiseAreas: string[];
      training: string[];
      grades: string[];
    };
    fetchVolunteers: any;
    fetchPicklists: any;
  },
  {}
> {
  constructor(props: any) {
    super(props);

    const { history, user } = props;

    if (user) {
      // whatever the redirect route is supposed to be
      history.push("/volunteer-list");
    }
  }

  componentDidMount() {
    const picklistTypes: UserPicklistType[] = [
      UserPicklistType.expertiseAreas,
      UserPicklistType.volunteerDesiredExternalActivities,
      UserPicklistType.volunteerDesiredInternalActivities,
      UserPicklistType.grades,
      UserPicklistType.postSecondaryTraining,
    ];

    this.props.fetchVolunteers(5, 0);
    picklistTypes.forEach((type: UserPicklistType) => {
      this.props.fetchPicklists(type);
    });
  }

  render() {
    const createVolunteerCard = (volunteer: Volunteer) => (
      <Grid item xs={12} key={volunteer.email}>
        <VolunteerCard {...volunteer} />
      </Grid>
    );
    return (
      <Grid container direction="row">
        {Object.entries(this.props.picklists).map((entry) => (
          <Grid item sm={3}>
            <Select>
              {entry[1].map((option) => (
                <MenuItem>{option}</MenuItem>
              ))}
            </Select>
          </Grid>
        ))}

        <Grid item sm={1} />
        <Grid item container xs={12} sm={10} spacing={2}>
          {this.props.volunteers.map((volunteer) =>
            createVolunteerCard(volunteer)
          )}
        </Grid>
        <Grid item sm={1} />
      </Grid>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    volunteers: getVolunteers(state.volunteers),
    picklists: {
      activities: getExternalActivitesPicklist(state.userPicklists).concat(
        getInternalActivitesPicklist(state.userPicklists)
      ),
      expertiseAreas: getExpertiesAreasPicklist(state.userPicklists),
      grades: getGradesPicklist(state.userPicklists),
      training: getPostSecondaryTrainingPicklist(state.userPicklists),
    },
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchVolunteers: (limit: number, offset: number) =>
    dispatch(fetchVolunteersService(limit, offset)),
  fetchPicklists: (picklistType: UserPicklistType) =>
    dispatch(fetchPicklistsService(picklistType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerList);
