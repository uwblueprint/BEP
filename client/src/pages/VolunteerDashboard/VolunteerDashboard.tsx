import React, { useEffect } from 'react';
import { connect } from "react-redux";

import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import ApplicantCard from '../EducatorDashboard/IndividualOpportunity/ApplicantCard'
import InviteCard from '../EducatorDashboard/IndividualOpportunity/InviteCard';
import Switch from '@material-ui/core/Switch';
import { ContainedButton, PageHeader, PageBody } from '../../components/index';
import EventSection from '../EducatorDashboard/IndividualOpportunity/EventSection';
import EventCard from '../EducatorDashboard/EventCard';
import ConfirmedVolunteerCard from '../EducatorDashboard/IndividualOpportunity/ConfirmedVolunteerCard';
import { Link } from 'react-router-dom'
import CreateIcon from '@material-ui/icons/Create';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container'
import InfoIcon from '@material-ui/icons/Info';

import { getActiveEvents } from "../../data/selectors/eventsSelector";

import { Event } from "../../data/types/eventTypes"
import { getApplications, getInvitations, getVolunteers } from '../../utils/eventsApiUtils'
import { fetchActiveEventsService } from '../../data/services/eventsServices'

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface StateProps {
  activeEvents: any;
  userType: number;
  userId: string;
}

interface DispatchProps {
  fetchActiveEvents: any;
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

const EventPage: React.SFC<Props> = ({ activeEvents, userType, userId, fetchActiveEvents } : Props) => {
  const classes = useStyles();

  const [value, setValue] = React.useState<number>(0);
  // const [applications, setApplications] = React.useState<any>([]);
  // const [fetchedApplications, setFetchedApplications] = React.useState(false);
  // const [invitations, setInvitations] = React.useState<any>([]);
  // const [fetchedInvitations, setFetchedInvitations] = React.useState(false);
  const [filteredEvents, setFilteredEvents] = React.useState<any>([]);
  const [fetchedActiveEvents, setFetchedActiveEvents] = React.useState(false);

  // todo: filter by my events
  useEffect(() => {
    (async function wrapper() {
      if (!fetchedActiveEvents && activeEvents.length === 0) {
        await fetchActiveEvents(userType, userId);
        setFetchedActiveEvents(true);
      }
    })();
  }, [fetchActiveEvents]);

  // todo: applications, incomplete
  // useEffect(() => {
  //   const fetchdata = async () => {
  //     const result = await getApplications(eventData.eventName);
  //     setApplications(result.data.applications)
  //   }
  //   fetchdata();
  // }, [applications]);
  let applications = activeEvents;

  // todo: invitations, incomplete
  // useEffect(() => {
  //   const fetchdata = async () => {
  //     const result = await getInvitations(eventData.eventName);
  //     setInvitations(result.data.invitations)
  //   }
  //   fetchdata()
  // }, [eventData.eventName]);
  let invitations = activeEvents;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const applicationsLabel = `Applications  ${applications.length}`
  const invitationsLabel = `Invitations  ${invitations.length}`

  const createOpportunityCard = (event: Event) => (
    <Grid item key={event.id}>
        <Link
          to={{
            pathname: `/events/${event.eventName}`,
            state: { event },
          }}
          style={{ textDecoration: "none" }}
        >
          <EventCard event={event} isPastEvent={false} showOwner={false} />
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
                  createOpportunityCard(event)
                )}
              </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {applications.length === 0 ? 
              <Typography style={{ padding: "8% 0", fontWeight:200, fontSize: "0.9em", textAlign: "center" }}>
                  <div>You do not currently have any pending applications.</div>
                  <div style={{margin:"1% 0"}}>Click 'Browse Opportunities' to get started.</div>
              </Typography> :
            applications.map((application: any) =>
              createOpportunityCard(application)
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {invitations.length === 0 ? 
              <Typography style={{ padding: "8% 0", fontWeight:200, fontSize: "0.9em", textAlign: "center" }}>
                  <div>You do not currently have any pending invitations.</div>
                  <div style={{margin:"2% 0"}}>Click 'Applications' to view the status of opportunities you expressed interested <br></br> in, and check 'Upcoming Opportunities' to see events you've volunteered for!</div>
                  <div>You can also click 'Browse Opportunities' to get started.</div>
              </Typography> :
            invitations.map((invitation: any) =>
              createOpportunityCard(invitation)
            )}
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
  return {
    activeEvents: getActiveEvents(state.events),
    userType: user ? user.userType : 0,
    userId: user ? user.id : "",
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchActiveEvents: (userType: number, userId: string) =>
    dispatch(fetchActiveEventsService(userType, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
