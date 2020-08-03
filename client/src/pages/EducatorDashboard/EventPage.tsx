import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import { TableRow } from '@material-ui/core';
import ApplicantCard from './ApplicantCard'
import { getApplications, getInvitations } from '../../utils/EventsApiUtils'
import InviteCard from './InviteCard';
import Switch from '@material-ui/core/Switch';
import Button from '../../components/Button'
import EventSection from './EventSection'

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
  console.log(props)
  const classes = useStyles();
  const [value, setValue] = React.useState<number>(0);
  const [applications, setApplications] = React.useState([]);
  const [invitations, setInvitations] = React.useState([])
  const [publicEvent, setPublicEvent] = React.useState({
    checked: true
  });

  const handleSwitchPublic = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublicEvent({...publicEvent, [event.target.name]: event.target.checked});
  };

  //Date checking
  // let eventStartDate = props.event.startDate
  let eventStartDate = new Date('2021-07-01T21:11:54') //Date for testing
  let today: Date = new Date()

  let pastEvent: boolean = today > eventStartDate ? true : false


  var displayApplications = applications.map((applicant) => {
    var applicationProps = {
        applicant
    };
    return <ApplicantCard info={applicationProps} />
});

  var displayInvitations = invitations.map((invite) => {
    var invitationProps = {
      invite
    }
    return <InviteCard info={invitationProps} />
  });

  useEffect(() => {
    const fetchdata = async () => {
      const result = await getApplications("Event test 5");
      console.log("This is the Event Card info", result.data.applications)
      setApplications(result.data.applications)
    }
    fetchdata();

  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const result = await getInvitations("Event test 5");
      console.log("This is the Invitation card info", result.data.invitations)
      setInvitations(result.data.invitations)
    }
    fetchdata()
  }, []);


  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const applicationsLabel = `Applications  ${applications.length}`
  const invitationsLabel = `Invitations  ${invitations.length}`

  return (
    <React.Fragment>
    {pastEvent ? 
        <React.Fragment>
          <Grid container spacing={1}>
              <Grid item xs={10}>
                <Typography variant="h2">props.event.title</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button>
                  Duplicate Event
                </Button>
              </Grid>
          </Grid>
          <EventSection />  
        </React.Fragment> :
    <React.Fragment>
    <Typography variant="h2">props.event.title</Typography>
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
                <Button color="default">
                  Edit Opportunity
                </Button>
              </Grid>
            </Grid>
        <EventSection />
      </React.Fragment>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {applications.length == 0 ? 
        <Typography>
          There are currently no applications for this oppurtunity. {'\n'}
          Get started by browsing applications to accept an application!
        </ Typography> 
      : displayApplications}
      </TabPanel>
      <TabPanel value={value} index={2}>
      {applications.length == 0 ? 
        <Typography>
          There are currently no invitations for this oppurtunity. {'\n'}
          Get started by browsing volunteers and send an invitation! 
        </ Typography> 
      : displayInvitations}
      </TabPanel>
    </div>
    </React.Fragment>}
    </React.Fragment>
  );
}

export default EventPage