import React, { useRef, useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
import {
  ContainedButton,
} from "../../components/index";

/* Services */
import {
  fetchActiveEventsService,
  fetchPastEventsService,
} from "../../data/services/eventsServices";

/* Selectors */
import {
  getActiveEvents,
  getPastEvents,
  getNumPastEventsRecieved,
} from "../../data/selectors/eventsSelector";

/* Types */
import { Event } from "../../data/types/eventTypes";

type EventProps = {
  eventsFilter: any;
};

interface StateProps {
  activeEvents: Event[];
  offset: number;
  pastEvents: Event[];
  userType: number;
  userId: string;
}

interface DispatchProps {
  fetchActiveEvents: any;
  fetchPastEvents: any;
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
  activeEvents,
  offset,
  pastEvents,
  userType,
  userId,
  fetchActiveEvents,
  fetchPastEvents,
}: Props) => {
  const classes = useStyles();
  const blockSize = 5;

  //State variables for educator dashboard
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isPastEvent, setIsPastEvent] = useState(false);
  const [retrievedData, setRetrievedData] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [fetchedActiveEvents, setFetchedActiveEvents] = useState(
    activeEvents.length !== 0
  );
  const [loadingEvents, setLoadingEvents] = useState(false);

  // State variables for infinite scroll functionality
  const [prevY, setPrevY] = useState<number>(0);
  const [lastOffset, setLastOffset] = useState<number>(
    offset < blockSize ? 0 : offset - blockSize
  );
  const [loadedAllEvents, setLoadedAllEvents] = useState<boolean>(false);

  const loadingRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleObserver = useCallback(
    (entities: any) => {
      const y = entities[0].boundingClientRect.y;

      if (prevY >= y) {
        if (lastOffset === offset) {
          // If no new events are available, prevent additional calls to backend.
          setLoadedAllEvents(true);
        }

        if (!loadedAllEvents && !loadingEvents) {
          if (offset > 1) setLastOffset(offset);
          setLoadingEvents(true);
          fetchPastEvents(blockSize, offset, userType, userId).then(() => {
            setLoadingEvents(false);
          });
        }
      }
      setPrevY(y);
    },
    [
      fetchPastEvents,
      lastOffset,
      loadedAllEvents,
      loadingEvents,
      offset,
      prevY,
      userType,
      userId,
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
    if (loadingRef && tabValue === 1) {
      observer.observe(loadingRef.current);
      return () => observer.unobserve(loadingRef.current);
    }

    return () => observer.unobserve(loadingRef.current);
  }, [loadingRef, handleObserver, tabValue]);

  useEffect(() => {
    // When loading data, there is a 1-2 second delay - using an async function waits for the data to be fetched and then sets retrieved data to true
    // the brackets around the async function is an IIFE (Immediately Invoked Function Expression) - it protects scope of function and variables within it
    (async function test() {
      setLoadingEvents(true);

      if (tabValue === 1)
        await fetchPastEvents(blockSize, offset, userType, userId);

      setLoadingEvents(false);
      setLastOffset(offset);
      if (!fetchedActiveEvents) {
        await fetchActiveEvents(userType, userId);
        setFetchedActiveEvents(true);
      }
      setRetrievedData(true);
    })();
  }, [
    fetchActiveEvents,
    fetchedActiveEvents,
    fetchPastEvents,
    offset,
    tabValue,
    userType,
    userId,
  ]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  let eventList = activeEvents;
  if (tabValue === 1) {
    // Apply datepicker filter to past events.
    eventList = pastEvents.filter(
      (event, index) =>
        (!startDate || new Date(event.startDate) > new Date(startDate)) &&
        (!endDate || new Date(event.endDate) < new Date(endDate))
    );
  }

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
            <Grid item xs={9}>
              <Typography variant="h1" style={{ marginTop: "5%" }}>
                Your Opportunities
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Grid container alignItems="flex-end" justify="flex-end">
                <ContainedButton>
                  <Typography
                    variant="body1"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "30px",
                    }}
                  >
                    Create Opportunity
                  </Typography>
                </ContainedButton>
              </Grid>
            </Grid>

            <AppBar elevation={0} position="static" color="transparent" style={{ zIndex:1 }}>
              <Tabs
                className={classes.tabs}
                value={tabValue}
                onChange={handleTabChange}
                aria-label="Simple Tabs"
              >
                <Tab
                  onClick={() => setIsPastEvent(false)}
                  label="Current"
                  {...a11yProps(0)}
                />
                <Tab
                  onClick={() => setIsPastEvent(true)}
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

          <Grid container spacing={4}>
            <Grid item />
            {eventList.length === 0 && retrievedData ? (
              <Container className={classes.noAppsDisc}>
                <Typography style={{ paddingBottom: "20px" }}>
                  You do not currently have any listed opportunities. <br></br>
                  Click 'Create Opportunity' to get started!
                </Typography>
              </Container>
            ) : (
              eventList.map((event, index) => (
                <Grid item key={index}>
                  <Link
                    to={{
                      pathname: `/events/${event.eventName}`,
                      state: { event },
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <EventCard
                      event={event}
                      isPastEvent={isPastEvent}
                      showOwner={true}
                    />
                  </Link>
                </Grid>
              ))
            )}
          </Grid>

          <div ref={loadingRef} />
        </PageBody>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: any): StateProps => {
  const userObj = localStorage.getItem("user");
  const user = userObj ? JSON.parse(userObj) : userObj;

  return {
    activeEvents: getActiveEvents(state.events),
    offset: getNumPastEventsRecieved(state.events),
    pastEvents: getPastEvents(state.events),
    userType: user ? user.userType : 0,
    userId: user ? user.id : "",
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  fetchPastEvents: (
    limit: number,
    offset: number,
    userType: number,
    userId: string
  ) => dispatch(fetchPastEventsService(limit, offset, userType, userId)),
  fetchActiveEvents: (userType: number, userId: string) =>
    dispatch(fetchActiveEventsService(userType, userId)),
});

export default connect<StateProps, DispatchProps, EventProps>(
  mapStateToProps,
  mapDispatchToProps
)(EducatorDashboard);
