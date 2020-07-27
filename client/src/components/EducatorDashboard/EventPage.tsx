import React, { useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import { TableRow } from '@material-ui/core';
import ContactCard from './ContactCard'
import axios from 'axios';

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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
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
  const [value, setValue] = React.useState(0);
  const [applications, setApplications] = React.useState({events: []});
  const [invitations, setInvitations] = React.useState({invitations: []})


  const applicationProps = {
    type: "applications",
  };

  const invitationProps = {
      type: "invitations",
  };


  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Typography variant="h2">props.event.title</Typography>
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Event Details" {...a11yProps(0)} />
          <Tab label="Applications" {...a11yProps(1)} />
          <Tab label="Invitations" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Box>
          <Typography>Event Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" component="h2">
                  ACTIVITY TYPE
              </Typography>
              <Typography>
                  props.event.eventtype
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" component="h2">
                  PREFERRED SECTOR
              </Typography>
              <Typography>
                  props.event.prefferedsector
              </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                  DATE(S) OF EVENTS
              </Typography>
              <Typography>
                  props.event.datesofevent
              </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                  GRADES OF PARTICIPATING STUDENTS
              </Typography>
              <Typography>
                  props.event.grades
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" component="h2">
                HOURS OF COMMITMENT
              </Typography>
              <Typography>
                  props.event.hoursofcommitment
              </Typography>
              </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" component="h2">
                NUMBER OF STUDENTS
              </Typography>
              <Typography>
                  props.events.numberofstudents
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" component="h2">
                NUMBER OF VOLUNTEERS NEEDED
              </Typography>
              <Typography>
                props.events.numberofstudents
              </Typography>
            </Grid>
            </Grid>
        </Box>
        <Box>
          <Typography>School Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                SCHOOL
              </Typography>
              <Typography>
                props.events.numberofstudents
              </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                ADDRESS
              </Typography>
              <Typography>
                props.events.numberofstudents
              </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                TRANSPORTATION
              </Typography>
              <Typography>
                props.events.numberofstudents
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Typography>Contact Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                Educator
              </Typography>
              <Typography>
                props.events.numberofstudents
              </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                Position
              </Typography>
              <Typography>
                props.events.numberofstudents
              </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                Phone Number
              </Typography>
              <Typography>
                props.events.numberofstudents
              </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="body1" component="h2">
                Email Address
              </Typography>
              <Typography>
                props.events.numberofstudents
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Typography>
              Confirmed Volunteers
          </Typography>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ContactCard props={applicationProps}  />
      </TabPanel>
      <TabPanel value={value} index={2}>
      <ContactCard props={invitationProps}  />
      </TabPanel>
    </div>
    </React.Fragment>
  );
}

export default EventPage