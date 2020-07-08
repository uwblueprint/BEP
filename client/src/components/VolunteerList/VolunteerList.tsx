import React from "react";

import { connect } from "react-redux";

/* Services */
import { fetchVolunteersService } from "../../data/services/volunteersServices";

/* Selectors */
import { getVolunteers } from "../../data/selectors/volunteersSelector";

/* Types */
import { Volunteer } from "../../data/types/UserTypes";

/* Components */
import VolunteerCard from "./VolunteerCard";
import { Grid } from "@material-ui/core";

class VolunteerList extends React.Component<
  { volunteers: Volunteer[]; fetchVolunteers: any },
  {}
> {
  constructor(props: any) {
    super(props);

    const { classes, history, user, volunteers, fetchVolunteers } = props;

    if (user) {
      // whatever the redirect route is supposed to be
      history.push("/volunteer-list");
    }
  }

  componentDidMount() {
    this.props.fetchVolunteers(5, 0);
  }

  render() {
    // console.log(this.props.volunteers);
    const createVolunteerCard = (volunteer: Volunteer) => (
      <Grid item xs={12} key={volunteer.email}>
        <VolunteerCard {...volunteer} />
      </Grid>
    );
    return (
      <Grid container direction="row">
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

const mapStateToProps = (state: any) => ({
  volunteers: getVolunteers(state.volunteers),
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchVolunteers: (limit: number, offset: number) =>
    dispatch(fetchVolunteersService(limit, offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerList);
