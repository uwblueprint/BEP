import React from "react";

import { connect } from "react-redux";

/* Services */
import { fetchVolunteersService } from "../../data/services/volunteersServices";

/* Selectors */
import { getVolunteers } from "../../data/selectors/volunteersSelector";

/* Types */
import { Volunteer } from "../../data/types/UserTypes";

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
    return <h1>HELLO</h1>;
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
