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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Grid } from "@material-ui/core";

class VolunteerList extends React.Component<
  {
    volunteers: Volunteer[];
    picklists: {
      activities: { displayName: string; list: string[] };
      expertiseAreas: { displayName: string; list: string[] };
      training: { displayName: string; list: string[] };
      grades: { displayName: string; list: string[] };
    };
    fetchVolunteers: any;
    fetchPicklists: any;
  },
  {
    prevY: number;
    observer: IntersectionObserver | null;
    page: number;
    offset: number;
    loadingRef: any;
    loadedAllVolunteers: boolean;
    lastVolunteerListLength: number;
  }
> {
  constructor(props: any) {
    super(props);

    const { history, user } = props;

    if (user) {
      // whatever the redirect route is supposed to be
      history.push("/volunteer-list");
    }

    this.state = {
      prevY: 0,
      observer: null,
      page: 0,
      offset: 10,
      loadingRef: React.createRef(),
      loadedAllVolunteers: false,
      lastVolunteerListLength: 0,
    };
  }

  handleObserver(entities: any, observer: IntersectionObserver) {
    console.log("HERE2");
    const y = entities[0].boundingClientRect.y;
    const newPage = this.state.page + 1;
    if (this.state.prevY > y) {
      if (this.state.lastVolunteerListLength === this.props.volunteers.length) {
        // If no new volunteers are available, prevent additional calls to backend.
        this.setState({ loadedAllVolunteers: true });
      }

      if (!this.state.loadedAllVolunteers) {
        console.log("HERE");
        if (this.props.volunteers.length > 1)
          this.setState({
            // Keep track of last volunteer length to determine if any new volunteers are loaded.
            lastVolunteerListLength: this.props.volunteers.length,
          });

        this.props.fetchVolunteers(
          this.state.offset,
          newPage * this.state.offset
        );

        this.setState({ page: newPage });
      }
    }
    this.setState({ prevY: y });
  }

  componentDidMount() {
    const picklistTypes: UserPicklistType[] = [
      UserPicklistType.expertiseAreas,
      UserPicklistType.volunteerDesiredExternalActivities,
      UserPicklistType.volunteerDesiredInternalActivities,
      UserPicklistType.grades,
      UserPicklistType.postSecondaryTraining,
    ];

    this.props.fetchVolunteers(
      this.state.offset,
      this.state.page * this.state.offset
    );

    picklistTypes.forEach((type: UserPicklistType) => {
      this.props.fetchPicklists(type);
    });

    if (this.state.loadingRef) {
      // Options
      var options = {
        root: null, // Page as root
        rootMargin: "0px",
        threshold: 1.0,
      };
      // Create an observer
      const observer = new IntersectionObserver(
        this.handleObserver.bind(this), //callback
        options
      );

      //Observe the bottom div of the page
      observer.observe(this.state.loadingRef.current);
      this.setState({ observer });
    }
  }

  render() {
    const createVolunteerCard = (volunteer: Volunteer) => (
      <Grid item xs={12} key={volunteer.email}>
        <VolunteerCard {...volunteer} />
      </Grid>
    );
    return (
      <div>
        <Grid container direction="row">
          {Object.entries(this.props.picklists).map((entry) => (
            <Grid item sm={3}>
              <FormControl style={{ minWidth: 160 }}>
                <InputLabel shrink={false} focused={false}>
                  {entry[1].displayName}
                </InputLabel>
                <Select key={entry[0]}>
                  {entry[1].list.map((option) => (
                    <MenuItem key={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
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
        <div ref={this.state.loadingRef} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    volunteers: getVolunteers(state.volunteers),
    picklists: {
      activities: {
        displayName: "Activities",
        list: getExternalActivitesPicklist(state.userPicklists).concat(
          getInternalActivitesPicklist(state.userPicklists)
        ),
      },
      expertiseAreas: {
        displayName: "Areas of Expertise",
        list: getExpertiesAreasPicklist(state.userPicklists),
      },
      training: {
        displayName: "Training",
        list: getPostSecondaryTrainingPicklist(state.userPicklists),
      },
      grades: {
        displayName: "Grade Levels",
        list: getGradesPicklist(state.userPicklists),
      },
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
