import React, { useRef, useEffect, useState, useCallback } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Event } from "../../data/types/EventTypes";
import { connect } from "react-redux";
import { fetchEventsService } from "../../data/services/eventsServices";
import { changeFilter } from "../../data/actions/eventsActions";
import { getFilteredEvents } from "../../data/selectors/eventsSelector";
import EventCard from "./EventCard";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { PageHeader, PageBody } from "../../components/index";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

type EventProps = {
  eventsFilter: any;
};

interface StateProps {
  events: Event[];
}

interface DispatchProps {
  fetchEvents: any;
  changeFilter: any;
}

type Props = StateProps & DispatchProps & EventProps;

const useStyles = makeStyles((theme) => ({
  tabs: {
    backgroundColor: theme.palette.primary.light,
    boxShadow: "0",
    paddingTop: "13px",
  },
  dateFilter: {
    paddingTop: "3em",
    display: "flex",
    flexDirection: "row",
  },
  dateFilterText: {
    padding: "5px 0px",
  },
  dateFilterBoxes: {
    padding: "0px 10px",
    width: "15vw",
    backgroundColor: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: "2px",
    margin: "0em 1em",
  },
  noAppsDisc: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: "100px",
    alignItems: "center",
  },
}));

// TAB PANEL CODE FROM MATERIAL UI - may want to reuse this or create a global tab component

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box>{children}</Box>
        </Container>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EducatorDashboard: React.SFC<Props> = ({
  events,
  fetchEvents,
  changeFilter,
}: Props) => {
  const classes = useStyles();

  //State variables for educator dashboard
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isPastEvent, setIsPastEvent] = useState(false);
  const [retrievedData, setRetrievedData] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  // State variables for infinite scroll functionality
  const [page, setPage] = useState<number>(0);
  const [prevY, setPrevY] = useState<number>(0);
  const [lastEventListLength, setLastEventListLength] = useState<number>(0);
  const [loadedAllEvents, setLoadedAllEvents] = useState<boolean>(false);
  const offset = 10;

  const loadingRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleObserver = useCallback(
    (entities: any) => {
      const y = entities[0].boundingClientRect.y;
      const newPage = page + 1;

      if (prevY > y) {
        if (lastEventListLength === events.length) {
          console.log("no new events are available");
          // If no new events are available, prevent additional calls to backend.
          setLoadedAllEvents(true);
        }

        if (!loadedAllEvents) {
          if (events.length > 1) setLastEventListLength(events.length);

          fetchEvents(offset, offset * newPage);
          setPage(newPage);
        }
      }
      setPrevY(y);
    },
    [
      page,
      prevY,
      lastEventListLength,
      loadedAllEvents,
      events.length,
      fetchEvents,
    ]
  );

  useEffect(() => {
    var options = {
      root: null, // Page as root
      rootMargin: "0px",
      threshold: 1.0,
    };
    // Create an observer
    const observer = new IntersectionObserver(
      handleObserver, //callback
      options
    );

    //Observe the bottom div of the page
    if (loadingRef) {
      observer.observe(loadingRef.current);
    }

    return () => observer.unobserve(loadingRef.current);
  }, [loadingRef, handleObserver]);

  useEffect(() => {
    // When loading data, there is a 1-2 second delay - using an async function waits for the data to be fetched and then sets retrieved data to true
    // the brackets around the async function is an IIFE (Immediately Invoked Function Expression) - it protects scope of function and variables within it
    (async function test() {
      await fetchEvents(offset, 0);
      setRetrievedData(true);
    })();
  }, [fetchEvents]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Grid container style={{ height: "100%" }}>
        <PageHeader>
          <Grid
            item
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-end"
            style={{ height: "100%", width: "100%" }}
          >
            <Typography variant="h1" style={{ marginTop: "5%" }}>
              Your Opportunities
            </Typography>

            <AppBar elevation={0} position="static" color="transparent">
              <Tabs
                className={classes.tabs}
                value={tabValue}
                onChange={handleTabChange}
                aria-label="Simple Tabs"
              >
                <Tab
                  onClick={() =>
                    changeFilter("ACTIVE") && setIsPastEvent(false)
                  }
                  label="Current"
                  {...a11yProps(0)}
                />
                <Tab
                  onClick={() => changeFilter("PAST") && setIsPastEvent(true)}
                  label="Past"
                  {...a11yProps(1)}
                />
              </Tabs>
            </AppBar>
          </Grid>
        </PageHeader>

        <PageBody>
          <TabPanel value={tabValue} index={1}>
            <div className={classes.dateFilter}>
              <Typography variant="body1" className={classes.dateFilterText}>
                Filter by date:
              </Typography>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  placeholder="Start date"
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  className={classes.dateFilterBoxes}
                />
              </MuiPickersUtilsProvider>

              <Typography variant="body1" className={classes.dateFilterText}>
                to
              </Typography>

              <div className={classes.dateFilterBoxes}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    placeholder="End date"
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    className={classes.dateFilterBoxes}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
          </TabPanel>
          <div>
            {events.length === 0 && retrievedData ? (
              <Container className={classes.noAppsDisc}>
                <Typography style={{ paddingBottom: "20px" }}>
                  You do not currently have any listed opportunities. <br></br>
                  Click 'Create Opportunity' to get started!
                </Typography>
              </Container>
            ) : isPastEvent ? (
              events
                .filter(
                  (event, index) =>
                    new Date(event.startDate) > new Date(startDate || "0") &&
                    new Date(event.endDate) < new Date(endDate || Date.now())
                )
                .map((event, index) => (
                  <Link
                    to={{
                      pathname: `/events/${event.eventName}`,
                      state: { event },
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <EventCard
                      key={index}
                      event={event}
                      isPastEvent={isPastEvent}
                    />
                  </Link>
                ))
            ) : (
              events.map((event, index) => (
                <Link
                  to={{
                    pathname: `/events/${event.eventName}`,
                    state: { event },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <EventCard
                    key={index}
                    event={event}
                    isPastEvent={isPastEvent}
                  />
                </Link>
              ))
            )}
          </div>

          <div ref={loadingRef} />
        </PageBody>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: any): StateProps => ({
  events: getFilteredEvents(state.events),
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  fetchEvents: (limit: number, offset: number) =>
    dispatch(fetchEventsService(limit, offset)),
  changeFilter: (filter: string) => dispatch(changeFilter(filter)),
});

export default connect<StateProps, DispatchProps, EventProps>(
  mapStateToProps,
  mapDispatchToProps
)(EducatorDashboard);
