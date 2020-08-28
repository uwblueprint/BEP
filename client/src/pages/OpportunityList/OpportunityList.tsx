import React from "react";

import { connect } from "react-redux";

/* Services */
import { fetchActiveEventsService } from "../../data/services/eventsServices";
import { fetchPicklistsService } from "../../data/services/picklistServices";

/* Selectors */
import { getActiveEvents } from "../../data/selectors/eventsSelector";
import {
  getAllActivitiesPicklist,
  getLocationsPicklist,
} from "../../data/selectors/picklistSelector";
import { getUser } from "../../data/selectors/userSelector";

/* Types */
import { Event } from "../../data/types/EventTypes";
import { PicklistType } from "../../data/types/picklistTypes";
import { User } from "../../data/types/userTypes";

/* Components */
import EventCard from "../EducatorDashboard/EventCard";
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
  OutlinedTextField,
} from "../../components/index";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Grid } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";

class OpportunityList extends React.Component<
  {
    events: Event[];
    picklists: {
      activities: { displayName: string; list: string[] };
      locations: { displayName: string; list: string[] };
    };
    userType: number;
    userId: string;
    fetchEvents: any;
    fetchPicklists: any;
  },
  {
    searchBar: string;
    filters: {
      activities: Map<string, boolean>;
      locations: Map<string, boolean>;
    };
    filteredEvents: Event[];
  }
> {
  constructor(props: any) {
    super(props);

    const { history, user, events } = props;

    if (user) {
      // whatever the redirect route is supposed to be
      history.push("/opportunities");
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
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);

    this.state = {
      searchBar: "",
      filters: {
        activities: new Map(),
        locations: new Map(),
      },
      filteredEvents: events,
    };
  }

  getFilters(picklistName: string) {
    const filters = this.state.filters;
    switch (picklistName) {
      case "activities":
        return filters.activities;
      case "locations":
        return filters.locations;
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
        filteredEvents: this.filterAllFields(this.props.events),
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
        filteredEvents: this.filterAllFields(this.props.events),
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
      filteredEvents: this.filterAllFields(this.props.events),
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
    this.setState({
      filteredEvents: this.filterAllFields(this.props.events),
    });
  }

  handleSearchBarChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    this.setState({ searchBar: event.target.value });
  }

  filterSearchBar = (event: Event, filter: string): boolean => {
    filter = filter.toLowerCase();
    return (
      filter.length === 0 || // ignore search bar input if input is empty.
      event.contact.firstName.toLowerCase().includes(filter) ||
      event.contact.lastName.toLowerCase().includes(filter) ||
      event.contact.school.name.toLowerCase().includes(filter) ||
      event.eventName.toLowerCase().includes(filter)
    );
  };

  filterActivities = (event: Event, filter: string) =>
    event.activityType.includes(filter);

  filterLocations = (event: Event, filter: string) =>
    event.contact.school.city === filter;

  getFilterFunction = (fieldName: string) => {
    switch (fieldName) {
      case "searchBar": // Filter by name, company, and job title.
        return this.filterSearchBar;
      case "activities":
        return this.filterActivities;
      case "locations":
        return this.filterLocations;
    }

    return (event: Event, filter: string) => true;
  };

  filterSingleField(events: Event[], fieldName: string, filter: string) {
    let filterFunction = this.getFilterFunction(fieldName);

    return events.filter((event: Event) => filterFunction(event, filter));
  }

  filterAllFields(events: Event[]) {
    const newEvents = events.filter((event: Event) => {
      var pass = true;

      // Apply filters from picklists
      for (let [fieldName, filterMap] of Object.entries(this.state.filters)) {
        const filterFunction = this.getFilterFunction(fieldName);
        [...filterMap.entries()].forEach(([filter, isActive]) => {
          if (pass && isActive && !filterFunction(event, filter)) pass = false;
        });
        if (!pass) return false;
      }

      // Apply search bar filter
      const filterFunction = this.getFilterFunction("searchBar");
      const searchString: string = this.state.searchBar;
      if (
        pass &&
        searchString.length > 0 &&
        !filterFunction(event, searchString)
      )
        pass = false;

      if (!pass) return false;
      return true;
    });

    return newEvents;
  }

  componentDidMount() {
    const picklistTypes: PicklistType[] = [
      PicklistType.allActivities,
      PicklistType.locations,
    ];

    this.props.fetchEvents(this.props.userType, this.props.userId).then(() => {
      this.setState({
        filteredEvents: this.state.filteredEvents.concat(
          this.filterAllFields(this.props.events)
        ),
      });
    });

    const createFilters = (filterNames: string[]): Array<[string, boolean]> => {
      return filterNames.map((item: string) => [item, false]);
    };

    picklistTypes.forEach((type: PicklistType) => {
      this.props.fetchPicklists(type).then(() => {
        const picklists = this.props.picklists;
        const filters = this.state.filters;

        if (type === PicklistType.allActivities) {
          filters.activities = new Map(
            createFilters(picklists.activities.list)
          );
        } else if (type === PicklistType.locations) {
          filters.locations = new Map(createFilters(picklists.locations.list));
        }

        this.setState({ filters });
      });
    });
  }

  render() {
    let filtersSelected = false;
    const createOpportunityCard = (event: Event) => (
      <Grid item key={event.id}>
        <EventCard event={event} isPastEvent={false} showOwner={false} />
      </Grid>
    );

    return (
      <div style={{ height: "100vh" }}>
        <Grid container direction="row" style={{ height: "100%" }}>
          <PageHeader>
            <Grid
              item
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-end"
              style={{ height: "100%", width: "100%" }}
            >
              <Grid item>
                <Typography variant="h1" style={{ marginBottom: "20%" }}>
                  Browse Opportunities
                </Typography>
              </Grid>
            </Grid>
          </PageHeader>
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
                    placeholder="Search Opportunities"
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
              <Grid item container spacing={7} direction="row">
                {Object.entries(this.props.picklists).map((entry) => {
                  // Display picklists.
                  const picklistName: string = entry[0];
                  const picklistDisplayName = entry[1].displayName;
                  let picklist = new Map<string, boolean>();

                  switch (picklistName) {
                    case "activities":
                      picklist = this.state.filters.activities;
                      break;
                    case "locations":
                      picklist = this.state.filters.locations;
                      break;
                  }

                  return (
                    <Grid item key={picklistName}>
                      <FormControl>
                        <ContainedSelect
                          key={picklistName}
                          id={picklistName}
                          value={[]}
                          onChange={this.createHandleSelectFilter(picklistName)}
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
                            return (
                              document.activeElement && (
                                <Grid
                                  container
                                  direction="row"
                                  justify="flex-end"
                                  alignItems="center"
                                >
                                  <Grid item>
                                    {document.activeElement.id ===
                                    picklistName ? (
                                      <SecondaryMainTextTypography
                                        align="center"
                                        variant="button"
                                      >
                                        {picklistDisplayName}
                                      </SecondaryMainTextTypography>
                                    ) : (
                                      <BlackTextTypography
                                        align="center"
                                        variant="button"
                                      >
                                        {picklistDisplayName}
                                      </BlackTextTypography>
                                    )}
                                  </Grid>
                                </Grid>
                              )
                            );
                          }}
                        >
                          {Array.from(picklist.entries(), (entry) => entry).map(
                            ([option, isSelected]) => (
                              <MenuItem
                                key={option}
                                value={option}
                                id={picklistName}
                              >
                                <OutlinedCheckbox checked={isSelected} />
                                {option}
                              </MenuItem>
                            )
                          )}
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

              <Grid item container spacing={4}>
                {this.state.filteredEvents.map((event) =>
                  createOpportunityCard(event)
                )}
              </Grid>
            </Grid>
          </PageBody>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const user: User | null = getUser(state.user);
  return {
    events: getActiveEvents(state.events),
    picklists: {
      activities: {
        displayName: "Activities",
        list: getAllActivitiesPicklist(state.picklists),
      },
      locations: {
        displayName: "Location",
        list: getLocationsPicklist(state.picklists),
      },
    },
    userType: user ? user.userType : 0,
    userId: user ? user.id : "",
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchEvents: (userType: number, userId: string) =>
    dispatch(fetchActiveEventsService(userType, userId)),
  fetchPicklists: (picklistType: PicklistType) =>
    dispatch(fetchPicklistsService(picklistType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityList);
