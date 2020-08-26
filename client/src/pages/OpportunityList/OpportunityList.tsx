import React from "react";

import { connect } from "react-redux";

/* Services */
import { fetchEventsService } from "../../data/services/eventsServices";
import { fetchPicklistsService } from "../../data/services/picklistServices";

/* Selectors */
import { getEventsData } from "../../data/selectors/eventsSelector";
import {
  getAllAcitivitiesPicklist,
  getLocationsPicklist,
} from "../../data/selectors/picklistSelector";

/* Types */
import { Event } from "../../data/types/EventTypes";
import { PicklistType } from "../../data/types/picklistTypes";

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
    fetchEvents: any;
    fetchPicklists: any;
  },
  {
    prevY: number;
    observer: IntersectionObserver | null;
    page: number;
    offset: number;
    loadingRef: any;
    loadedAllEvents: boolean;
    lastEventsListLength: number;
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
    this.fetchEvents = this.fetchEvents.bind(this);
    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);

    this.state = {
      prevY: 0,
      observer: null,
      page: 0,
      offset: 10,
      loadingRef: React.createRef(),
      loadedAllEvents: false,
      lastEventsListLength: 0,
      searchBar: "",
      filters: {
        activities: new Map(),
        locations: new Map(),
      },
      filteredEvents: events,
    };
  }

  handleObserver(entities: any, observer: IntersectionObserver) {
    const y = entities[0].boundingClientRect.y;
    const newPage = this.state.page + 1;
    if (this.state.prevY > y) {
      if (this.state.lastEventsListLength === this.props.events.length) {
        // If no new events are available, prevent additional calls to backend.
        this.setState({ loadedAllEvents: true });
      }

      if (!this.state.loadedAllEvents) {
        if (this.props.events.length > 1)
          this.setState({
            // Keep track of last event list length to determine if any new events are loaded.
            lastEventsListLength: this.props.events.length,
          });

        this.fetchEvents(this.state.offset, newPage * this.state.offset);

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
      event.contact.schoolName.toLowerCase().includes(filter)
    );
  };

  filterActivities = (event: Event, filter: string) =>
    event.activityType.includes(filter);

  filterLocations = (event: Event, filter: string) => event.location === filter;

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

  fetchEvents(limit: number, offset: number) {
    this.props.fetchEvents(limit, offset).then(() => {
      this.setState({
        filteredEvents: this.state.filteredEvents.concat(
          this.filterAllFields(
            this.props.events.slice(this.state.page * this.state.offset)
          )
        ),
      });
    });
  }

  componentDidMount() {
    const picklistTypes: PicklistType[] = [
      PicklistType.expertiseAreas,
      PicklistType.locations,
    ];

    this.fetchEvents(this.state.offset, this.state.page * this.state.offset);

    const createFilters = (filterNames: string[]): Array<[string, boolean]> => {
      return filterNames.map((item: string) => [item, false]);
    };

    picklistTypes.forEach((type: PicklistType) => {
      this.props.fetchPicklists(type).then(() => {
        const picklists = this.props.picklists;
        const filters = this.state.filters;

        if (type === PicklistType.allAcitivities) {
          picklists.activities.list.forEach((acitivity) =>
            filters.activities.set(acitivity, false)
          );
        } else if (type === PicklistType.locations) {
          filters.locations = new Map(createFilters(picklists.locations.list));
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

    const createOpportunityCard = (event: Event) => (
      <Grid item xs={12} key={event.id}>
        <EventCard event={event} isPastEvent={true} />
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

              <Grid item container>
                {this.state.filteredEvents.map((event) =>
                  createOpportunityCard(event)
                )}
              </Grid>
            </Grid>
          </PageBody>
        </Grid>
        <div ref={this.state.loadingRef} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    events: getEventsData(state.events),
    picklists: {
      activities: {
        displayName: "Activities",
        list: getAllAcitivitiesPicklist(state.picklists),
      },
      locations: {
        displayName: "Location",
        list: getLocationsPicklist(state.picklists),
      },
    },
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchEvents: (limit: number, offset: number) =>
    dispatch(fetchEventsService(limit, offset)),
  fetchPicklists: (picklistType: PicklistType) =>
    dispatch(fetchPicklistsService(picklistType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityList);
