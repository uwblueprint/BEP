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
import { Checkbox } from "@material-ui/core";

/* Components */
import VolunteerCard from "./VolunteerCard";
import Select from "../../components/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
    filters: {
      searchBar: Set<string>;
      activities: Set<string>;
      expertiseAreas: Set<string>;
      training: Set<string>;
      grades: Set<string>;
    };
    filteredVolunteers: Volunteer[];
  }
> {
  constructor(props: any) {
    super(props);

    const { history, user, volunteers } = props;

    if (user) {
      // whatever the redirect route is supposed to be
      history.push("/volunteer-list");
    }

    this.createUpdateFilter = this.createUpdateFilter.bind(this);
    this.filterSingleField = this.filterSingleField.bind(this);
    this.fetchVolunteers = this.fetchVolunteers.bind(this);
    this.filterAllFields = this.filterAllFields.bind(this);

    this.state = {
      prevY: 0,
      observer: null,
      page: 0,
      offset: 10,
      loadingRef: React.createRef(),
      loadedAllVolunteers: false,
      lastVolunteerListLength: 0,
      filters: {
        searchBar: new Set(),
        activities: new Set(),
        expertiseAreas: new Set(),
        training: new Set(),
        grades: new Set(),
      },
      filteredVolunteers: volunteers,
    };
  }

  handleObserver(entities: any, observer: IntersectionObserver) {
    const y = entities[0].boundingClientRect.y;
    const newPage = this.state.page + 1;
    if (this.state.prevY > y) {
      if (this.state.lastVolunteerListLength === this.props.volunteers.length) {
        // If no new volunteers are available, prevent additional calls to backend.
        this.setState({ loadedAllVolunteers: true });
      }

      if (!this.state.loadedAllVolunteers) {
        if (this.props.volunteers.length > 1)
          this.setState({
            // Keep track of last volunteer length to determine if any new volunteers are loaded.
            lastVolunteerListLength: this.props.volunteers.length,
          });

        this.fetchVolunteers(this.state.offset, newPage * this.state.offset);

        this.setState({ page: newPage });
      }
    }
    this.setState({ prevY: y });
  }

  createUpdateFilter(picklistName: string) {
    const updateFilter = (
      event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
    ) => {
      const newFilter: string = event.target.value as string;

      console.log(picklistName);
      console.log(newFilter);

      const filters = this.state.filters;

      switch (picklistName) {
        case "activities":
          filters.activities.add(newFilter);
          break;
        case "expertiseAreas":
          filters.expertiseAreas.add(newFilter);
          break;
        case "training":
          filters.training.add(newFilter);
          break;
        case "grades":
          filters.grades.add(newFilter);
          break;
      }

      this.setState({
        filters,
        filteredVolunteers: this.filterSingleField(
          this.state.filteredVolunteers,
          picklistName,
          newFilter
        ),
      });
    };

    return updateFilter.bind(this);
  }

  filterSearchBar = (volunteer: Volunteer, filter: string): boolean =>
    volunteer.firstName.includes(filter) ||
    volunteer.lastName.includes(filter) ||
    volunteer.employerName.includes(filter) ||
    volunteer.jobTitle.includes(filter);

  filterActivities = (volunteer: Volunteer, filter: string) =>
    volunteer.volunteerDesiredExternalActivities.includes(filter) ||
    volunteer.volunteerDesiredInternalActivities.includes(filter);

  filterExpertiseAreas = (volunteer: Volunteer, filter: string) =>
    volunteer.expertiseAreas.includes(filter);

  filterTraining = (volunteer: Volunteer, filter: string) =>
    volunteer.postSecondaryTraining.includes(filter);

  filterGrades = (volunteer: Volunteer, filter: string) =>
    volunteer.grades.includes(filter);

  getFilterFunction = (fieldName: string) => {
    switch (fieldName) {
      case "searchBar": // Filter by name, company, and job title.
        return this.filterSearchBar;
      case "activities":
        return this.filterActivities;
      case "expertiseAreas":
        return this.filterExpertiseAreas;
      case "training":
        return this.filterTraining;
      case "grades":
        return this.filterGrades;
    }

    return (volunteer: Volunteer, filter: string) => true;
  };

  filterSingleField(
    volunteers: Volunteer[],
    fieldName: string,
    filter: string
  ) {
    let filterFunction = this.getFilterFunction(fieldName);

    return volunteers.filter((volunteer: Volunteer) =>
      filterFunction(volunteer, filter)
    );
  }

  filterAllFields(volunteers: Volunteer[]) {
    const newVolunteers = volunteers.filter((volunteer: Volunteer) => {
      var pass = true;
      for (let [fieldName, filterList] of Object.entries(this.state.filters)) {
        const filterFunction = this.getFilterFunction(fieldName);
        filterList.forEach((filter: string) => {
          if (pass && !filterFunction(volunteer, filter)) pass = false;
        });
        if (!pass) return false;
      }
      return true;
    });
    return newVolunteers;
  }

  fetchVolunteers(limit: number, offset: number) {
    this.props.fetchVolunteers(limit, offset).then(() => {
      this.setState({
        filteredVolunteers: this.filterAllFields(this.props.volunteers),
      });
    });
  }

  componentDidMount() {
    const picklistTypes: UserPicklistType[] = [
      UserPicklistType.expertiseAreas,
      UserPicklistType.volunteerDesiredExternalActivities,
      UserPicklistType.volunteerDesiredInternalActivities,
      UserPicklistType.grades,
      UserPicklistType.postSecondaryTraining,
    ];

    this.fetchVolunteers(
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
          {Object.entries(this.props.picklists).map((entry) => {
            // Display picklists.
            const entryKey = entry[0];
            const picklistName = entry[1].displayName;
            const picklist = entry[1].list;
            return (
              <Grid item sm={3} key={entryKey}>
                <FormControl style={{ minWidth: 160 }}>
                  <InputLabel shrink={false} focused={false}>
                    {picklistName}
                  </InputLabel>
                  <Select
                    key={entryKey}
                    value=""
                    onChange={this.createUpdateFilter(entryKey)}
                  >
                    {picklist.map((option) => (
                      <MenuItem key={option} value={option}>
                        <Checkbox checked={false} />
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            );
          })}

          <Grid item sm={1} />
          <Grid item container xs={12} sm={10} spacing={2}>
            {this.state.filteredVolunteers.map((volunteer) =>
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
        list: [
          ...new Set( // Ensure list only has unique elements
            getExternalActivitesPicklist(state.userPicklists).concat(
              getInternalActivitesPicklist(state.userPicklists)
            )
          ),
        ],
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
