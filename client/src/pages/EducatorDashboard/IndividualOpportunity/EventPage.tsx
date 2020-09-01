import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import theme from "../../../components/styling/Theme";
import {
  BlackTextTypography,
  ContainedButton,
  OutlinedButton,
  PageHeader,
  PageBody,
  SecondaryMainContrastInfoIcon,
} from "../../../components/index";
import EventSection from "./EventSection";
import ConfirmedVolunteerCard from "./ConfirmedVolunteerCard";
import CreateIcon from "@material-ui/icons/Create";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";

import { Event } from "../../../data/types/eventTypes";
import { User, UserType, Volunteer } from "../../../data/types/userTypes";
import Application, {
  ApplicationStatus,
} from "../../../data/types/applicationTypes";
import Invitation, {
  InvitationStatus,
} from "../../../data/types/invitationTypes";

import {
  getEventApplications,
  getEventInvitations,
  getEventVolunteers,
} from "../../../data/selectors/eventsSelector";
import { getUser } from "../../../data/selectors/userSelector";

import {
  fetchEventApplicationsService,
  fetchVolunteersOfEventService,
  updateEventService,
  fetchEventInvitationsService,
} from "../../../data/services/eventsServices";
import { createApplicationService } from "../../../data/services/applicationsService";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

// will need a hook + state to store this info
enum PageViewer {
  unknown = 0, // default volunteer or admin
  applicant = 1, // application
  invitee = 2, // invitation
  volunteer = 3, // current volunteer
  host = 4, // educator who created this event
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
  const {
    invitations,
    applications,
    user,
    fetchEventApplications,
    fetchEventInvitations,
    volunteers,
    createApplication,
    fetchEventVolunteers,
    updateEvent,
  } = props;
  const userId = user ? user.id : "";
  const eventData = props.location.state.event;
  const isEducator = user.userType === UserType.Educator;
  const isVolunteer = user.userType === UserType.Volunteer;
  const nonWithdrawnApps = applications.filter(
    (application: Application) =>
      application.status !== ApplicationStatus.WITHDRAWN
  );
  const nonWithdrawnInvites = invitations.filter(
    (invitation: Invitation) => invitation.status !== InvitationStatus.WITHDRAWN
  );
  // todo: see if volunteering for this event for bottom functionality + contact details
  // const isVolunteering = false;
  const [value, setValue] = React.useState<number>(0);
  const [publicEvent, setPublicEvent] = React.useState({
    checked: eventData.isPublic,
  });
  const [openDialog, setOpenDialog] = React.useState(false);

  let eventStartDate = new Date(eventData.startDate); //Date for testing
  let today: Date = new Date();
  let pastEvent: boolean = today > eventStartDate ? true : false;

  const applicationsLabel = `Applications  ${nonWithdrawnApps.length}`;
  const invitationsLabel = `Invitations  ${nonWithdrawnInvites.length}`;

  var displayVolunteers = volunteers.map((volunteer: Volunteer) => {
    return <ConfirmedVolunteerCard info={{ volunteer }} key={volunteer.id} />;
  });

  var displayApplications = nonWithdrawnApps.map((application: Application) => {
    let enableButtons = application.status === ApplicationStatus.PENDING;
    if (volunteers.length === eventData.numberOfVolunteers) {
      enableButtons = false;
    }

    return <ApplicantCard info={{ application, enabled: enableButtons }} />;
  });

  var displayInvitations = nonWithdrawnInvites.map((invitation: Invitation) => {
    return <InviteCard info={{ invitation }} />;
  });

  const handleSwitchPublic = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedEvent: Event = eventData;
    updatedEvent.isPublic = event.target.checked;

    updateEvent(updatedEvent);
    setPublicEvent({
      ...publicEvent,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const applyToEvent = () => {
    const application: Application = {
      event: eventData,
      id: "",
      status: ApplicationStatus.PENDING,
      volunteer: user,
    };
    createApplication(application);
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchdata = async () => {
      fetchEventApplications(eventData);
      fetchEventVolunteers(eventData);
      fetchEventInvitations(eventData);
    };
    fetchdata();
  }, [
    eventData,
    fetchEventApplications,
    fetchEventVolunteers,
    fetchEventInvitations,
  ]);

  return (
    <React.Fragment>
      <Dialog open={openDialog}>
        <DialogTitle disableTypography>
          <BlackTextTypography variant="h2">
            Do you want to apply for this opportunity?
          </BlackTextTypography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            variant="body1"
            style={{ color: theme.palette.text.primary }}
          >
            You can retract your application later if you change your mind.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <OutlinedButton onClick={handleCloseDialog} color="primary">
            No
          </OutlinedButton>
          <ContainedButton
            onClick={
              isVolunteer
                ? applyToEvent
                : () => {
                    console.log("duplicate details");
                  }
            }
            color="primary"
            autoFocus
          >
            Yes
          </ContainedButton>
        </DialogActions>
      </Dialog>
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
                      <a
                        href="javascript:history.back()"
                        style={{ textDecoration: "none" }}
                      >
                        {`<`} Back{" "}
                      </a>
                    </Typography>
                    <Typography variant="h1">{eventData.eventName}</Typography>
                  </Grid>
                  {(isVolunteer || isEducator) && (
                    <Grid item style={{ paddingTop: "50px" }}>
                      {isVolunteer ? 
                      <ContainedButton
                        style={{ paddingRight: 15, paddingLeft: 15 }}
                        onClick={handleOpenDialog}
                        disabled={
                          isVolunteer
                            ? applications.filter(
                                (app: Application) =>
                                  app.volunteer.id === userId
                              ).length !== 0 ||
                              invitations.filter(
                                (invite: Invitation) =>
                                  invite.volunteer.id === userId
                              ).length !== 0
                            : false
                        }
                      >
                        Apply for event
                      </ContainedButton> :
                      <Link
                      to={{
                        pathname: `/newevent`,
                        state: { event: eventData },
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <ContainedButton
                        style={{ paddingRight: 15, paddingLeft: 15 }}
                      >
                      Duplicate Details
                    </ContainedButton>
                    </Link>
                      }
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
                <Grid item>
                  <Typography variant="body1">
                    <a
                      href="javascript:history.back()"
                      style={{ textDecoration: "none" }}
                    >
                      {`<`} Back{" "}
                    </a>
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
                      <Grid container>
                        <Grid item>
                          <Typography
                            variant="body1"
                            style={{ fontSize: "18px" }}
                          >
                            Make posting visible to the public:{" "}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="body1"
                            style={{
                              color: "#0A79BF",
                              marginLeft: "5px",
                            }}
                          >
                            {publicEvent.checked ? "ON" : "OFF"}
                          </Typography>
                        </Grid>
                      </Grid>
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
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography
                          variant="h6"
                          style={{ fontSize: "24px", padding: "5px" }}
                        >
                          Confirmed Volunteers{" "}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body1"
                          style={{
                            opacity: "0.5",
                            // display: "inline-block",
                            fontSize: "24px",
                          }}
                        >
                          {volunteers.length}/{eventData.numberOfVolunteers}
                        </Typography>
                      </Grid>
                    </Grid>
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
                    <SecondaryMainContrastInfoIcon />{" "}
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

const mapStateToProps = (state: any, ownProps: any) => {
  const event: Event = ownProps.location.state.event;
  const user: User | null = getUser(state.user);

  return {
    applications: getEventApplications(event.id, state.events),
    invitations: getEventInvitations(event.id, state.events),
    user,
    volunteers: getEventVolunteers(event.id, state.events),
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  createApplication: (application: Application) =>
    dispatch(createApplicationService(application)),
  fetchEventApplications: (event: Event) =>
    dispatch(fetchEventApplicationsService(event)),
  fetchEventInvitations: (event: Event) =>
    dispatch(fetchEventInvitationsService(event)),
  updateEvent: (event: Event) => dispatch(updateEventService(event)),
  fetchEventVolunteers: (event: Event) =>
    dispatch(fetchVolunteersOfEventService(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
