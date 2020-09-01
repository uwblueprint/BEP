import React, { useEffect } from 'react';
import { connect } from "react-redux";

import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import { PageHeader, PageBody } from '../../components/index';
import EventCard from '../EducatorDashboard/EventCard';
import { Link } from 'react-router-dom'

/* Selectors */
import { 
  getVolunteerApplications, 
  getVolunteerInvitations, 
  getVolunteerEvents 
} from "../../data/selectors/volunteersSelector";

/* Types */
import { Event } from "../../data/types/eventTypes";
import Application, { ApplicationStatus } from "../../data/types/applicationTypes";
import Invitation, { InvitationStatus } from "../../data/types/invitationTypes";
import { PageViewer } from "../../data/types/pageTypes";

/* Services */
import { fetchApplicationsByVolunteer } from '../../data/services/applicationsService';
import { fetchInvitationsByVolunteer } from '../../data/services/invitationsService';
import { fetchEventsByVolunteer } from '../../data/services/volunteersServices';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface StateProps {
  activeEvents: any;
  applications: Application[];
  invitations: Invitation[];
  userType: number;
  userId: string;
}

interface DispatchProps {
  fetchActiveEvents: any;
  fetchApplications: any;
  fetchInvitations: any;
  fetchEvents: any;
}

type Props = DispatchProps & StateProps;

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
}

const a11yProps = (index: any) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    backgroundColor: theme.palette.primary.light,
    boxShadow: '0',
    paddingTop: '13px',
  },
  tab: {
    paddingLeft: '10px',
    paddinRight: '10px',
  },
  card: {
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(3),
    borderRadius: 5,
    height: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  },
  noAppsDisc: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: '100px',
    alignItems: 'center'
  }
}));

const EventPage: React.SFC<Props> = 
  ({ activeEvents, applications, invitations, userType, userId, fetchApplications, fetchInvitations, fetchEvents } : Props) => {
  const classes = useStyles();

  const [value, setValue] = React.useState<number>(0);
  const [fetchedApplications, setFetchedApplications] = React.useState(false);
  const [fetchedInvitations, setFetchedInvitations] = React.useState(false);
  const [fetchedEvents, setFetchedEvents] = React.useState(false);

  useEffect(() => {
    (async function wrapper() {
      if (!fetchedEvents && activeEvents.length === 0) {
        await fetchEvents(userId);
        setFetchedEvents(true);
      }
    })();
  }, [fetchedEvents]);

  useEffect(() => {
    (async function wrapper() {
      if (!fetchedApplications) {
        await fetchApplications(userId);
        setFetchedApplications(true);
      }
    })();
  }, [fetchedApplications]);

  useEffect(() => {
    (async function wrapper() {
      if (!fetchedInvitations) {
        await fetchInvitations(userId);
        setFetchedInvitations(true);
      }
    })();
  }, [invitations, fetchedInvitations]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const applicationsLabel = `Applications  ${applications.length}`
  const invitationsLabel = `Invitations  ${invitations.length}`

  const createOpportunityCard = (event: Event, type: number = PageViewer.unknown) => (
    <Grid item key={event.id}>
        <Link
          to={{
            pathname: `/events/${event.eventName}`,
            state: { event },
          }}
          style={{ textDecoration: "none" }}
        >
          <EventCard event={event} isPastEvent={false} showOwner={false} type={type} />
        </Link>
      </Grid>
  );

  return (
    <React.Fragment>
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
              <Typography variant="h1" style={{ marginTop: "30%" }}>
                  Dashboard
              </Typography>
            </Grid>

            <AppBar position="static" color="transparent" elevation={0} style={{zIndex: 1}}>
              <Tabs className={classes.tabs} value={value} onChange={handleChange} aria-label="Simple Tabs">
                <Tab label = "Upcoming Opportunities" {...a11yProps(0)} className={classes.tab} />
                <Tab label={applicationsLabel} {...a11yProps(1)} className={classes.tab} />
                <Tab label={invitationsLabel} {...a11yProps(2)} className={classes.tab}/>
              </Tabs>
            </AppBar>
          </Grid>
        </PageHeader>
        <PageBody>
          <TabPanel value={value} index={0}>
              <Grid item container spacing={4} direction="column" alignItems="center" justify="center">
                {activeEvents.length === 0 ? 
                  <Typography style={{ padding: "8% 0", fontWeight:200, fontSize: "0.9em", textAlign: "center" }}>
                     <div>You do not currently have any upcoming opportunities.</div>
                     <div style={{margin:"2% 0"}}>Click 'Applications' to view the status of opportunities you expressed interested <br></br> in, and check 'Invitations' to see if you have been invited to an event!</div>
                     <div>You can also click 'Browse Opportunities' to get started.</div>
                  </Typography> :
                activeEvents.map((event: any) => 
                  createOpportunityCard(event.event, PageViewer.volunteer)
                )}
              </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid item container spacing={4} direction="column" alignItems="center" justify="center">
              {applications.length === 0 ? 
                <Typography style={{ padding: "8% 0", fontWeight:200, fontSize: "0.9em", textAlign: "center" }}>
                    <div>You do not currently have any pending applications.</div>
                    <div style={{margin:"1% 0"}}>Click 'Browse Opportunities' to get started.</div>
                </Typography> :
              applications.map((application: any) =>
                createOpportunityCard(application.event, PageViewer.applicant)
              )}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid item container spacing={4} direction="column" alignItems="center" justify="center">
              {invitations.length === 0 ? 
                <Typography style={{ padding: "8% 0", fontWeight:200, fontSize: "0.9em", textAlign: "center" }}>
                    <div>You do not currently have any pending invitations.</div>
                    <div style={{margin:"2% 0"}}>Click 'Applications' to view the status of opportunities you expressed interested <br></br> in, and check 'Upcoming Opportunities' to see events you've volunteered for!</div>
                    <div>You can also click 'Browse Opportunities' to get started.</div>
                </Typography> :
              invitations.map((invitation: any) =>
                createOpportunityCard(invitation.event, PageViewer.invitee)
              )}
            </Grid>
          </TabPanel>
        </PageBody>
      </Grid>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state: any): StateProps => {
  const userObj = localStorage.getItem("user");
  const user = userObj ? JSON.parse(userObj) : null;

  const activeEventsUnfiltered = getVolunteerEvents(state);
  const activeEvents = activeEventsUnfiltered.filter((event: any) => 
    event.status === ApplicationStatus.ACCEPTED
  );

  const applicationUnfiltered = getVolunteerApplications(state);
  const applications = applicationUnfiltered.filter((application: any) =>
    application.status === ApplicationStatus.PENDING
  );

  const invitationsUnfiltered = getVolunteerInvitations(state);
  const invitations = invitationsUnfiltered.filter((invitation: any) =>
    invitation.status === InvitationStatus.PENDING
  );
  
  return {
    activeEvents,
    applications,
    invitations,
    userType: user ? user.userType : 0,
    userId: user ? user.id : "",
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchEvents: (userId: string) => 
    dispatch(fetchEventsByVolunteer(userId)),
  fetchApplications: (userId: string) =>
    dispatch(fetchApplicationsByVolunteer(userId)),
  fetchInvitations: (userId: string) =>
    dispatch(fetchInvitationsByVolunteer(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
