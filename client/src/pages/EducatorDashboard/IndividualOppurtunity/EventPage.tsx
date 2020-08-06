import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import ApplicantCard from './ApplicantCard'
import { getApplications, getInvitations, getVolunteers } from '../../../utils/EventsApiUtils'
import InviteCard from './InviteCard';
import Switch from '@material-ui/core/Switch';
import { DarkContainedButton, ContainedButton } from '../../../components/Button'
import EventSection from './EventSection'
import { PageHeader, PageBody } from '../../../components/index';
import ConfirmedVolunteerCard from './ConfirmedVolunteerCard';

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
}

const a11yProps = (index: any) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const EventPage = (props: any) => {
  console.log("These are the event props", props)
  const classes = useStyles();
  const [value, setValue] = React.useState<number>(0);
  const [applications, setApplications] = React.useState<any>([]);
  const [invitations, setInvitations] = React.useState<any>([])
  const [publicEvent, setPublicEvent] = React.useState({
    checked: true
  });
  const [volunteers, setVolunteers] = React.useState([])

  const eventData = props.location.state.event
  console.log("This is the event data", eventData)

  useEffect(() => {
    const fetchdata = async () => {
     const result =  await getVolunteers(eventData.eventName)
     console.log("This is the Volunteer Card info lalala", result)
     setVolunteers(result.data.volunteers)
    }
    fetchdata()
  }, [eventData.eventName]);

  var displayVolunteers = volunteers.map((volunteer) => {
    console.log("This is a single volunteer", volunteer)
    var volunteerProps = {
      volunteer
    }
    return <ConfirmedVolunteerCard info={volunteerProps} />
  });

  const handleSwitchPublic = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublicEvent({...publicEvent, [event.target.name]: event.target.checked});
  };

  let eventStartDate = new Date(eventData.startDate) //Date for testing
  let today: Date = new Date()

  let pastEvent: boolean = today > eventStartDate ? true : false


  var displayApplications = applications.map((applicant: any) => {

    var buttonEnabled: boolean;
    var applicationProps: any;

    if (volunteers.length === eventData.numberOfVolunteers) {
      buttonEnabled = false

      applicationProps = {
        eventName: eventData.eventName,
        applicant,
        enabled: buttonEnabled
    };
    return <ApplicantCard info={applicationProps} />

    } else {

    buttonEnabled = (applicant.accepted === true || applicant.denied === true) ? false : true;

    applicationProps = {
        eventName: eventData.eventName,
        applicant,
        enabled: buttonEnabled
    };
    return <ApplicantCard info={applicationProps} />
  }
});

  var displayInvitations = invitations.map((invite: any) => {
    console.log("This is a single invite", invite)
    var invitationProps = {
      invite
    }
    return <InviteCard info={invitationProps} />
  });

  useEffect(() => {
    const fetchdata = async () => {
      const result = await getApplications(eventData.eventName);
      console.log("This is the Applicant Card info", result.data.applications)
      setApplications(result.data.applications)
    }
    fetchdata();

  }, [eventData.eventName]);

  useEffect(() => {
    const fetchdata = async () => {
      const result = await getInvitations(eventData.eventName);
      console.log("This is the Invitation card info", result.data.invitations)
      setInvitations(result.data.invitations)
    }
    fetchdata()
  }, [eventData.eventName]);


  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const applicationsLabel = `Applications  ${applications.length}`
  const invitationsLabel = `Invitations  ${invitations.length}`

  return (
    <React.Fragment>
    {pastEvent ? 
        <React.Fragment>
                <PageHeader header={eventData.eventName} />
                <DarkContainedButton>
                  Duplicate Event
                </DarkContainedButton>
          <div style={{ height: "100vh" }}>
          <Grid container style={{ height:"100%" }}>
            <PageBody>
              <EventSection event={eventData} />
              <React.Fragment>
            <Typography variant="h6" classes={{
              root: classes.root,
            }}>
                Confirmed Volunteers {volunteers.length} / {eventData.numberOfVolunteers}

            </Typography>
            {volunteers.length === 0 ? 
          <Typography>
              Volunteers that have been confirmed for this oppurtunity will show up here.
          </ Typography> 
      : displayVolunteers}
        </React.Fragment> 
            </PageBody>
          </Grid>
          </div>
        </React.Fragment> :
    <React.Fragment>
    <div style={{ height: "100vh" }}>
      <Grid container style={{ height:"100%" }}>
        <PageHeader header={eventData.eventName} />
        <PageBody>
          <div className={classes.root}>
      {props.date}
      <AppBar position="static" color="transparent" elevation={0}>
        <Tabs value={value} onChange={handleChange} aria-label="Simple Tabs">
          <Tab label = "Event Details" {...a11yProps(0)} />
          <Tab label={applicationsLabel} {...a11yProps(1)} />
          <Tab label={invitationsLabel} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <React.Fragment>
            <Grid container spacing={2}>
              <Grid item xs={1}>
                  <Switch
                    checked={publicEvent.checked}
                    onChange={(event) => handleSwitchPublic(event)}
                    name="checked"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </Grid>
              <Grid item xs={9}>
                <Typography>
                  Make posting visible to the public: {publicEvent.checked ? "ON" : "OFF"}
                </Typography>
                <Typography>
                  Enabling this feature will allow volunteers to discover your posting on the oppurtunities page.
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <ContainedButton>
                  Edit Opportunity
                </ContainedButton>
              </Grid>
            </Grid>
        <EventSection event={eventData} />
        <React.Fragment>
            <Typography variant="h6" classes={{
              root: classes.root,
            }}>
                Confirmed Volunteers {volunteers.length} / {eventData.numberOfVolunteers}

            </Typography>
            {volunteers.length === 0 ? 
          <Typography>
              Volunteers that have been confirmed for this oppurtunity will show up here.
          </ Typography> 
      : displayVolunteers}
        </React.Fragment>
      </React.Fragment>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {volunteers.length === eventData.numberOfVolunteers ? <Typography variant="body1">The positions for this oppurtunity have been filled</Typography> : null}
        {applications.length === 0 ? 
        <React.Fragment>
        <Typography>
          There are currently no applications for this oppurtunity. {'\n'}
          Get started by browsing volunteer applications to accept an application!
        </ Typography>
        <ContainedButton>Browse Volunteers</ContainedButton> 
        </React.Fragment>
      : displayApplications}
      </TabPanel>
      <TabPanel value={value} index={2}>
      {invitations.length === 0 ? 
      <React.Fragment>
        <Typography>
          There are currently no invitations for this oppurtunity. {'\n'}
          Get started by browsing volunteers and send an invitation! 
        </ Typography> 
        <ContainedButton>Browse Volunteers</ContainedButton>
        </React.Fragment> 
      : displayInvitations}
      </TabPanel>
    </div>
        </PageBody>
      </Grid>
    </div>
    </React.Fragment>}
    </React.Fragment>
  );
}

export default EventPage