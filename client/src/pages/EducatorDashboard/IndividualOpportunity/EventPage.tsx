import React, { useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ApplicantCard from "./ApplicantCard";
import InviteCard from "./InviteCard";
import Switch from "@material-ui/core/Switch";
import {
  ContainedButton,
  PageHeader,
  PageBody,
} from "../../../components/index";
import EventSection from "./EventSection";
import ConfirmedVolunteerCard from "./ConfirmedVolunteerCard";
import { Link } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import InfoIcon from "@material-ui/icons/Info";

import { Event } from "../../../data/types/EventTypes";
import { User, UserType } from "../../../data/types/userTypes";
import {
  getApplications,
  getInvitations,
  getVolunteers,
} from "../../../utils/EventsApiUtils";
import { getUser } from "../../../data/selectors/userSelector";
import { updateEventService } from "../../../data/services/eventsServices";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: any) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    backgroundColor: theme.palette.primary.light,
    boxShadow: "0",
    paddingTop: "13px",
  },
  tab: {
    paddingLeft: "10px",
    paddinRight: "10px",
  },
  card: {
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(3),
    borderRadius: 5,
    height: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
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

const EventPage = (props: any) => {
  const classes = useStyles();
  const eventData = props.location.state.event;
  const isEducator = props.userType === UserType.Educator;
  const isVolunteer = props.userType === UserType.Volunteer;
  const [value, setValue] = React.useState<number>(0);
  const [applications, setApplications] = React.useState<any>([]);
  const [invitations, setInvitations] = React.useState<any>([]);
  const [publicEvent, setPublicEvent] = React.useState({
    checked: eventData.isPublic,
  });
  const [volunteers, setVolunteers] = React.useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const result = await getVolunteers(eventData.eventName);
      setVolunteers(result.data.volunteers);
    };
    fetchdata();
  }, [eventData.eventName]);

  var displayVolunteers = volunteers.map((volunteer) => {
    var volunteerProps = {
      volunteer,
    };
    return <ConfirmedVolunteerCard info={volunteerProps} />;
  });

  const handleSwitchPublic = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedEvent: Event = eventData;
    updatedEvent.isPublic = event.target.checked;

    props.updateEvent(updatedEvent);
    setPublicEvent({
      ...publicEvent,
      [event.target.name]: event.target.checked,
    });
  };

  let eventStartDate = new Date(eventData.startDate); //Date for testing
  let today: Date = new Date();

  let pastEvent: boolean = today > eventStartDate ? true : false;

  var displayApplications = applications.map((applicant: any) => {
    var buttonEnabled: boolean;
    var applicationProps: any;

    if (volunteers.length === eventData.numberOfVolunteers) {
      buttonEnabled = false;

      applicationProps = {
        eventName: eventData.eventName,
        applicant,
        enabled: buttonEnabled,
      };
      return <ApplicantCard info={applicationProps} />;
    } else {
      buttonEnabled = !(applicant.accepted || applicant.denied);

      applicationProps = {
        eventName: eventData.eventName,
        applicant,
        enabled: buttonEnabled,
      };
      return <ApplicantCard info={applicationProps} />;
    }
  });

  var displayInvitations = invitations.map((invite: any) => {
    var invitationProps = {
      invite,
    };
    return <InviteCard info={invitationProps} />;
  });

  useEffect(() => {
    const fetchdata = async () => {
      const result = await getApplications(eventData.eventName);
      setApplications(result.data.applications);
    };
    fetchdata();
  }, [eventData.eventName]);

  useEffect(() => {
    const fetchdata = async () => {
      const result = await getInvitations(eventData.eventName);
      setInvitations(result.data.invitations);
    };
    fetchdata();
  }, [eventData.eventName]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const applicationsLabel = `Applications  ${applications.length}`;
  const invitationsLabel = `Invitations  ${invitations.length}`;

  return (
    <React.Fragment>
      {pastEvent || !isEducator ? (
        <div style={{ height: "100vh" }}>
          <Grid container style={{ height: "100%" }}>
            <PageHeader>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-end"
                style={{ height: "100%", width: "100%" }}
              >
                <Grid
                  container
                  spacing={4}
                  direction="row"
                  style={{ marginBottom: "5%" }}
                >
                  <Grid item style={{ width: "80%" }}>
                    <Typography
                      variant="body1"
                      style={{ paddingBottom: "10px" }}
                    >
                      <Link
                        to={isEducator ? "/events" : "/opportunities"}
                        style={{ textDecoration: "none" }}
                      >
                        {`<`} Back{" "}
                      </Link>
                    </Typography>
                    <Typography variant="h1">{eventData.eventName}</Typography>
                  </Grid>
                  {(isVolunteer || isEducator) && (
                    <Grid item style={{ paddingTop: "50px" }}>
                      <ContainedButton
                        style={{ paddingRight: 15, paddingLeft: 15 }}
                        onClick={() => console.log("Applied!")}
                      >
                        {isVolunteer ? "Apply for Event" : "Duplicate Details"}
                      </ContainedButton>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </PageHeader>
            <PageBody>
              <EventSection event={eventData} isEducator={isEducator} />
              {isEducator && (
                <React.Fragment>
                  <Typography
                    variant="h6"
                    style={{ fontSize: "24px", marginTop: 30 }}
                  >
                    Attended Volunteers {volunteers.length} /{" "}
                    {eventData.numberOfVolunteers}
                  </Typography>
                  {volunteers.length === 0 ? (
                    <Card className={classes.card} elevation={0}>
                      <Typography>
                        There were no volunteers confirmed for this event
                      </Typography>
                    </Card>
                  ) : (
                    displayVolunteers
                  )}
                </React.Fragment>
              )}
            </PageBody>
          </Grid>
        </div>
      ) : (
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
                <Grid item direction="column">
                  <Typography variant="body1">
                    <Link to="/events" style={{ textDecoration: "none" }}>
                      {`<`} Back{" "}
                    </Link>
                  </Typography>
                  <Typography variant="h1" style={{ marginTop: "5%" }}>
                    {eventData.eventName}
                  </Typography>
                </Grid>

                <AppBar position="static" color="transparent" elevation={0}>
                  <Tabs
                    className={classes.tabs}
                    value={value}
                    onChange={handleChange}
                    aria-label="Simple Tabs"
                  >
                    <Tab
                      label="Event Details"
                      {...a11yProps(0)}
                      className={classes.tab}
                    />
                    <Tab
                      label={applicationsLabel}
                      {...a11yProps(1)}
                      className={classes.tab}
                    />
                    <Tab
                      label={invitationsLabel}
                      {...a11yProps(2)}
                      className={classes.tab}
                    />
                  </Tabs>
                </AppBar>
              </Grid>
            </PageHeader>
            <PageBody>
              <TabPanel value={value} index={0}>
                <React.Fragment>
                  <Grid container spacing={2} direction="row">
                    <Grid item xs={1}>
                      <Switch
                        checked={publicEvent.checked}
                        onChange={(event) => handleSwitchPublic(event)}
                        name="checked"
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="body1" style={{ fontSize: "18px" }}>
                        Make posting visible to the public:{" "}
                        <Typography
                          variant="body1"
                          style={{ color: "#0A79BF", display: "inline-block" }}
                        >
                          {publicEvent.checked ? "ON" : "OFF"}
                        </Typography>
                      </Typography>
                      <Typography variant="body1" style={{ fontSize: "12px" }}>
                        Enabling this feature will allow volunteers to discover
                        your posting on the oppurtunities page.
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
                              fontWeight: 800,
                              fontSize: "16px",
                              lineHeight: "22px",
                            }}
                          >
                            <CreateIcon
                              style={{
                                paddingRight: "10px",
                                paddingBottom: "5px",
                              }}
                            />
                            Edit Opportunity
                          </Typography>
                        </ContainedButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  <EventSection event={eventData} />
                  <React.Fragment>
                    <Typography
                      variant="h6"
                      style={{ fontSize: "24px", padding: "5px" }}
                    >
                      Confirmed Volunteers{" "}
                      <Typography
                        variant="body1"
                        style={{
                          opacity: "0.5",
                          display: "inline-block",
                          fontSize: "24px",
                        }}
                      >
                        {volunteers.length}/{eventData.numberOfVolunteers}
                      </Typography>
                    </Typography>
                    {volunteers.length === 0 ? (
                      <Card className={classes.card} elevation={0}>
                        <Typography>
                          Volunteers that have been confirmed for this
                          oppurtunity will show up here.
                        </Typography>
                      </Card>
                    ) : (
                      displayVolunteers
                    )}
                  </React.Fragment>
                </React.Fragment>
              </TabPanel>
              <TabPanel value={value} index={1}>
                {volunteers.length === eventData.numberOfVolunteers ? (
                  <Typography
                    variant="body1"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {" "}
                    <InfoIcon />{" "}
                    <Typography style={{ paddingLeft: "10px" }}>
                      The positions for this oppurtunity have been filled
                    </Typography>
                  </Typography>
                ) : null}
                {applications.length === 0 ? (
                  <React.Fragment>
                    <Container className={classes.noAppsDisc}>
                      <Typography style={{ paddingBottom: "20px" }}>
                        There are currently no applications for this
                        oppurtunity. <br></br>
                        Get started by browsing volunteer applications to accept
                        an application!
                      </Typography>
                      <ContainedButton style={{ maxWidth: "175px" }}>
                        Browse Volunteers
                      </ContainedButton>
                    </Container>
                  </React.Fragment>
                ) : (
                  displayApplications
                )}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {invitations.length === 0 ? (
                  <React.Fragment>
                    <Container className={classes.noAppsDisc}>
                      <Typography style={{ paddingBottom: "20px" }}>
                        There are currently no invitations for this oppurtunity.{" "}
                        <br></br>
                        Get started by browsing volunteer applications to accept
                        an application!
                      </Typography>
                      <ContainedButton style={{ maxWidth: "175px" }}>
                        Browse Volunteers
                      </ContainedButton>
                    </Container>
                  </React.Fragment>
                ) : (
                  displayInvitations
                )}
              </TabPanel>
            </PageBody>
          </Grid>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  const user: User | null = getUser(state.user);
  return {
    userType: user ? user.userType : 0,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  updateEvent: (event: Event) => dispatch(updateEventService(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
