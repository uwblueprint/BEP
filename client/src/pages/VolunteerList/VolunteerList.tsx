import React from "react";
import ReactDOM from "react-dom";

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
  getLocationsPicklist,
  getPostSecondaryTrainingPicklist,
  getGradesPicklist,
  getLanguagesPicklist,
} from "../../data/selectors/userPicklistSelector";

/* Types */
import { Volunteer } from "../../data/types/userTypes";
import { UserPicklistType } from "../../data/types/userPicklistTypes";

/* Components */
import VolunteerCard from "./VolunteerCard";
import {
  ContainedSelect,
  ContainedButton,
  DarkContainedButton,
  TextButton,
  BlackExpandMoreIcon,
  SecondaryMainExpandMoreIcon,
  WhiteCloseIcon,
  PageHeader,
  PageBody,
  BlueSearchIcon,
  OutlinedCheckbox,
  WhiteTextTypography,
  BlackTextTypography,
  SecondaryMainTextTypography,
} from "../../components/index";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Grid } from "@material-ui/core";
import { OutlinedTextField } from "../../components/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

class VolunteerList extends React.Component<
  {
    volunteers: Volunteer[];
    picklists: {
      activities: { displayName: string; list: string[] };
      expertiseAreas: { displayName: string; list: string[] };
      locations: { displayName: string; list: string[] };
      training: { displayName: string; list: string[] };
      languages: { displayName: string; list: string[] };
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
    searchBar: string;
    filters: {
      activities: Map<string, boolean>;
      expertiseAreas: Map<string, boolean>;
      locations: Map<string, boolean>;
      training: Map<string, boolean>;
      languages: Map<string, boolean>;
      grades: Map<string, boolean>;
    };
    filteredVolunteers: Volunteer[];
  }
> {
  constructor(props: any) {
    super(props);

    const { history, user, volunteers, picklists } = props;

    if (user) {
      // whatever the redirect route is supposed to be
      history.push("/volunteer-list");
    }

    this.getFilters = this.getFilters.bind(this);
    this.createUpdateMultipleFilters = this.createUpdateMultipleFilters.bind(
      this
    );
    this.createUpdateFilter = this.createUpdateFilter.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.createHandleFilterButtonClick = this.createHandleFilterButtonClick.bind(
      this
    );
    this.createHandleSelectFilter = this.createHandleSelectFilter.bind(this);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.filterSingleField = this.filterSingleField.bind(this);
    this.filterAllFields = this.filterAllFields.bind(this);
    this.fetchVolunteers = this.fetchVolunteers.bind(this);
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);

    this.state = {
      prevY: 0,
      observer: null,
      page: 0,
      offset: 10,
      loadingRef: React.createRef(),
      loadedAllVolunteers: false,
      lastVolunteerListLength: 0,
      searchBar: "",
      filters: {
        activities: new Map(),
        expertiseAreas: new Map(),
        locations: new Map(),
        training: new Map(),
        languages: new Map(),
        grades: new Map(),
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

  getFilters(picklistName: string) {
    const filters = this.state.filters;
    switch (picklistName) {
      case "activities":
        return filters.activities;
      case "expertiseAreas":
        return filters.expertiseAreas;
      case "locations":
        return filters.locations;
      case "training":
        return filters.training;
      case "languages":
        return filters.languages;
      case "grades":
        return filters.grades;
    }
    return new Map<string, boolean>();
  }

  createUpdateMultipleFilters(picklistName: string) {
    const filters = this.state.filters;
    const picklistFilters = this.getFilters(picklistName);

    return (selectedFilters: string[]) => {
      selectedFilters.forEach((filterName: string) =>
        picklistFilters.set(filterName, !picklistFilters.get(filterName))
      );

      this.setState({
        filters: {
          ...filters,
          [picklistName]: picklistFilters,
        },
        filteredVolunteers: this.filterAllFields(this.props.volunteers),
      });
    };
  }

  createUpdateFilter(picklistName: string) {
    const filters = this.state.filters;
    const picklistFilters = this.getFilters(picklistName);

    return (selectedFilter: string) => {
      picklistFilters.set(selectedFilter, !picklistFilters.get(selectedFilter));

      this.setState({
        filters: {
          ...filters,
          [picklistName]: picklistFilters,
        },
        filteredVolunteers: this.filterAllFields(this.props.volunteers),
      });
    };
  }

  clearFilters() {
    let filters = this.state.filters;
    Object.entries(filters).forEach(([picklistName, filterMap]) => {
      [...filterMap.keys()].forEach((key) => {
        filterMap.set(key, false);
      });
      filters = { ...filters, [picklistName]: filterMap };
    });

    this.setState({
      filters,
    });
    this.setState({
      filteredVolunteers: this.filterAllFields(this.props.volunteers),
    });
  }

  createHandleSelectFilter(picklistName: string) {
    const handleSelectFilter = (
      event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
    ) => {
      const selectedFilters: string[] = event.target.value as string[];
      this.createUpdateMultipleFilters(picklistName)(selectedFilters);
    };

    return handleSelectFilter.bind(this);
  }

  createHandleFilterButtonClick(picklistName: string) {
    const handletFilterButtonClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      const selectedFilter: string = event.currentTarget.value;
      this.createUpdateFilter(picklistName)(selectedFilter);
    };

    return handletFilterButtonClick.bind(this);
  }

  handleSearchFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const searchBarValue = this.state.searchBar;
    this.setState({
      filteredVolunteers: this.filterAllFields(this.props.volunteers),
    });
  }

  handleSearchBarChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    this.setState({ searchBar: event.target.value });
  }

  filterSearchBar = (volunteer: Volunteer, filter: string): boolean => {
    filter = filter.toLowerCase();
    return (
      filter.length === 0 || // ignore search bar input if input is empty.
      volunteer.firstName.toLowerCase().includes(filter) ||
      volunteer.lastName.toLowerCase().includes(filter) ||
      (volunteer.employer !== undefined &&
        volunteer.employer !== null &&
        volunteer.employer.name.toLowerCase().includes(filter)) ||
      volunteer.jobTitle.toLowerCase().includes(filter)
    );
  };

  filterActivities = (volunteer: Volunteer, filter: string) =>
    volunteer.volunteerDesiredExternalActivities.includes(filter) ||
    volunteer.volunteerDesiredInternalActivities.includes(filter);

  filterExpertiseAreas = (volunteer: Volunteer, filter: string) =>
    volunteer.expertiseAreas.includes(filter);

  filterLocations = (volunteer: Volunteer, filter: string) =>
    volunteer.locations.includes(filter);

  filterTraining = (volunteer: Volunteer, filter: string) =>
    volunteer.postSecondaryTraining.includes(filter);
  filterLanguages = (volunteer: Volunteer, filter: string) =>
    volunteer.languages.includes(filter);
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
      case "locations":
        return this.filterLocations;
      case "training":
        return this.filterTraining;
      case "languages":
        return this.filterLanguages;
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

      // Apply filters from picklists
      for (let [fieldName, filterMap] of Object.entries(this.state.filters)) {
        const filterFunction = this.getFilterFunction(fieldName);
        [...filterMap.entries()].forEach(([filter, isActive]) => {
          if (pass && isActive && !filterFunction(volunteer, filter))
            pass = false;
        });
        if (!pass) return false;
      }

      // Apply search bar filter
      const filterFunction = this.getFilterFunction("searchBar");
      const searchString: string = this.state.searchBar;
      if (
        pass &&
        searchString.length > 0 &&
        !filterFunction(volunteer, searchString)
      )
        pass = false;

      if (!pass) return false;
      return true;
    });

    return newVolunteers;
  }

  fetchVolunteers(limit: number, offset: number) {
    this.props.fetchVolunteers(limit, offset).then(() => {
      this.setState({
        filteredVolunteers: this.state.filteredVolunteers.concat(
          this.filterAllFields(
            this.props.volunteers.slice(this.state.page * this.state.offset)
          )
        ),
      });
    });
  }

  componentDidMount() {
    const picklistTypes: UserPicklistType[] = [
      UserPicklistType.expertiseAreas,
      UserPicklistType.volunteerDesiredExternalActivities,
      UserPicklistType.volunteerDesiredInternalActivities,
      UserPicklistType.locations,
      UserPicklistType.postSecondaryTraining,
      UserPicklistType.languages,
      UserPicklistType.grades,
    ];

    this.fetchVolunteers(
      this.state.offset,
      this.state.page * this.state.offset
    );

    const createFilters = (filterNames: string[]): Array<[string, boolean]> => {
      return filterNames.map((item: string) => [item, false]);
    };

    picklistTypes.forEach((type: UserPicklistType) => {
      this.props.fetchPicklists(type).then(() => {
        const picklists = this.props.picklists;
        const filters = this.state.filters;

        if (type === UserPicklistType.expertiseAreas) {
          filters.expertiseAreas = new Map(
            createFilters(picklists.expertiseAreas.list)
          );
        } else if (
          type === UserPicklistType.volunteerDesiredExternalActivities ||
          type === UserPicklistType.volunteerDesiredInternalActivities
        ) {
          picklists.activities.list.forEach((acitivity) =>
            filters.activities.set(acitivity, false)
          );
        } else if (type === UserPicklistType.locations) {
          filters.locations = new Map(createFilters(picklists.locations.list));
        } else if (type === UserPicklistType.postSecondaryTraining) {
          filters.training = new Map(createFilters(picklists.training.list));
        } else if (type === UserPicklistType.languages) {
          filters.languages = new Map(createFilters(picklists.languages.list));
        } else if (type === UserPicklistType.grades) {
          filters.grades = new Map(createFilters(picklists.grades.list));
        }

        this.setState({ filters });
      });
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
    let filtersSelected = false;

    const createVolunteerCard = (volunteer: Volunteer) => (
      <Grid item xs={12} key={volunteer.email}>
        <VolunteerCard {...volunteer} />
      </Grid>
    );

    return (
      <div style={{ height: "100vh" }}>
        <Grid container direction="row" style={{ height: "100%" }}>
          <Grid item container xs={12} direction="row">
            <PageHeader header="Browse Volunteers" />
            <PageBody>
              <Grid container spacing={4} direction="column">
                <Grid item xs={12}></Grid>
                <form
                  style={{ width: "100%" }}
                  onSubmit={this.handleSearchFormSubmit}
                >
                  <Grid item container direction="row">
                    <OutlinedTextField
                      id="search-bar"
                      placeholder="Search Volunteers"
                      value={this.state.searchBar}
                      fullWidth
                      onChange={this.handleSearchBarChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BlueSearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{ style: { height: "40px", padding: "0" } }}
                      style={{ width: "90%" }}
                    />

                    <ContainedButton
                      type="submit"
                      style={{ width: "8%", marginLeft: "2%" }}
                    >
                      Search
                    </ContainedButton>
                  </Grid>
                </form>
                <Grid
                  item
                  container
                  spacing={4}
                  direction="row"
                  justify="space-between"
                >
                  {Object.entries(this.props.picklists).map((entry) => {
                    // Display picklists.
                    const picklistName: string = entry[0];
                    const picklistDisplayName = entry[1].displayName;
                    let picklist = new Map<string, boolean>();

                    switch (picklistName) {
                      case "activities":
                        picklist = this.state.filters.activities;
                        break;
                      case "expertiseAreas":
                        picklist = this.state.filters.expertiseAreas;
                        break;
                      case "locations":
                        picklist = this.state.filters.locations;
                        break;
                      case "training":
                        picklist = this.state.filters.training;
                        break;
                      case "languages":
                        picklist = this.state.filters.languages;
                        break;
                      case "grades":
                        picklist = this.state.filters.grades;
                        break;
                    }

                    return (
                      <Grid item key={picklistName}>
                        <FormControl style={{ minWidth: 160 }}>
                          <ContainedSelect
                            key={picklistName}
                            id={picklistName}
                            value={[]}
                            onChange={this.createHandleSelectFilter(
                              picklistName
                            )}
                            multiple
                            disableUnderline={true}
                            IconComponent={() =>
                              document.activeElement &&
                              document.activeElement.id === picklistName ? (
                                <SecondaryMainExpandMoreIcon />
                              ) : (
                                <BlackExpandMoreIcon />
                              )
                            }
                            displayEmpty={true}
                            renderValue={() => {
                              return document.activeElement &&
                                document.activeElement.id === picklistName ? (
                                <SecondaryMainTextTypography
                                  align="center"
                                  variant="body1"
                                  style={{ fontWeight: "800" }}
                                >
                                  {picklistDisplayName}
                                </SecondaryMainTextTypography>
                              ) : (
                                <BlackTextTypography
                                  align="center"
                                  variant="body1"
                                  style={{ fontWeight: "800" }}
                                >
                                  {picklistDisplayName}
                                </BlackTextTypography>
                              );
                            }}
                          >
                            {Array.from(
                              picklist.entries(),
                              (entry) => entry
                            ).map(([option, isSelected]) => (
                              <MenuItem
                                key={option}
                                value={option}
                                id={picklistName}
                              >
                                <OutlinedCheckbox checked={isSelected} />
                                {option}
                              </MenuItem>
                            ))}
                          </ContainedSelect>
                        </FormControl>
                      </Grid>
                    );
                  })}
                </Grid>
                <Grid item container direction="row">
                  <Grid item container xs={10} spacing={1} direction="row">
                    {Object.entries(this.state.filters).map((entry) => {
                      const picklistName = entry[0];
                      const filterMap = entry[1];
                      const filterButtons: Array<JSX.Element> = [];
                      Array.from(filterMap.entries(), (entry) => entry).forEach(
                        ([filterName, isSelected]) => {
                          if (isSelected) {
                            filtersSelected = true;
                            filterButtons.push(
                              <Grid item key={filterName}>
                                <DarkContainedButton
                                  onClick={this.createHandleFilterButtonClick(
                                    picklistName
                                  )}
                                  value={filterName}
                                >
                                  <WhiteTextTypography variant="caption">
                                    {filterName}
                                  </WhiteTextTypography>
                                  <WhiteCloseIcon
                                    style={{
                                      width: "15px",
                                      height: "15px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                </DarkContainedButton>
                              </Grid>
                            );
                          }
                        }
                      );

                      return filterButtons;
                    })}
                  </Grid>
                  {filtersSelected && (
                    <Grid
                      item
                      container
                      xs={2}
                      alignItems="flex-start"
                      justify="flex-end"
                      direction="row"
                    >
                      <TextButton onClick={this.clearFilters}>
                        Clear All
                      </TextButton>
                    </Grid>
                  )}
                </Grid>

                <Grid item container spacing={2}>
                  {this.state.filteredVolunteers.map((volunteer) =>
                    createVolunteerCard(volunteer)
                  )}
                </Grid>
              </Grid>
            </PageBody>
          </Grid>
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
      locations: {
        displayName: "Location",
        list: getLocationsPicklist(state.userPicklists),
      },
      training: {
        displayName: "Level of Training",
        list: getPostSecondaryTrainingPicklist(state.userPicklists),
      },
      languages: {
        displayName: "Language",
        list: getLanguagesPicklist(state.userPicklists),
      },
      grades: {
        displayName: "Audience Grade Level",
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