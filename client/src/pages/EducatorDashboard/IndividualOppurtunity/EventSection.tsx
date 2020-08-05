import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import ConfirmedVolunteerCard from './ConfirmedVolunteerCard'
import Divider from '@material-ui/core/Divider';
import { getVolunteers } from '../../../utils/EventsApiUtils';


const useStyles = makeStyles(() => ({
  root: {
      paddingTop: '10px'
  }
}));


const EventSection = (props: any) => {

  const classes = useStyles()

  const [volunteers, setVolunteers] = React.useState([])

  useEffect(() => {
    const fetchdata = async () => {
     const result =  await getVolunteers(props.event.eventName)
     console.log("This is the Volunteer Card info lalala", result)
     setVolunteers(result.data.volunteers)
    }
    fetchdata()
  }, []);

  var displayVolunteers = volunteers.map((volunteer) => {
    console.log("This is a single volunteer", volunteer)
    var volunteerProps = {
      volunteer
    }
    return <ConfirmedVolunteerCard info={volunteerProps} />
  });
  
    return (
      <Box>
          <Box>
          <Divider />
            <Typography variant="h6" classes={{
              root: classes.root,
            }}>Event Details</Typography>
            <Grid container spacing={2} >
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="h1">
                    ACTIVITY TYPE
                </Typography>
                <Typography>
                    {props.event.activityType}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="h1">
                    PREFERRED SECTOR
                </Typography>
                <Typography>
                    {props.event.preferredSector}
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <Typography variant="subtitle1" component="h1">
                    DATE(S) OF EVENTS
                </Typography>
                <Typography>
                    {props.event.startDate}
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <Typography variant="subtitle1" component="h1">
                    GRADES OF PARTICIPATING STUDENTS
                </Typography>
                <Typography>
                    {props.event.gradeOfStudents}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="h1">
                  HOURS OF COMMITMENT
                </Typography>
                <Typography>
                    {props.event.hoursCommitment}
                </Typography>
                </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="h1">
                  NUMBER OF STUDENTS
                </Typography>
                <Typography>
                    {props.event.numberOfStudents}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" component="h1">
                  NUMBER OF VOLUNTEERS NEEDED
                </Typography>
                <Typography>
                  {props.event.numberOfVolunteers}
                </Typography>
              </Grid>
              </Grid>
          </Box>
          <Box>
          <Divider />
            <Typography variant="h6" classes={{
                root: classes.root,
              }}>School Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
              <Typography variant="subtitle1" component="h1">
                  SCHOOL
                </Typography>
                <Typography>
                  {props.event.schoolName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <Typography variant="subtitle1" component="h1">
                  ADDRESS
                </Typography>
                <Typography>
                  {props.event.schoolAddress}
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <Typography variant="subtitle1" component="h1">
                  TRANSPORTATION
                </Typography>
                <Typography>
                  {props.event.schoolTransportation}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box>
          <Divider />
            <Typography variant="h6" classes={{
              root: classes.root,
            }}> Details </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
              <Typography variant="subtitle1" component="h1">
                  Educator
                </Typography>
                <Typography>
                  {props.event.contactName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <Typography variant="subtitle1" component="h1">
                  Position
                </Typography>
                <Typography>
                  {props.event.contactPosition}
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <Typography variant="subtitle1" component="h1">
                  Phone Number
                </Typography>
                <Typography>
                  {props.event.contactPhone}
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <Typography variant="subtitle1" component="h1">
                  Email Address
                </Typography>
                <Typography>
                  {props.event.contactEmail}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box>
          <Divider />
            <Typography variant="h6" classes={{
              root: classes.root,
            }}>
                Confirmed Volunteers {volunteers.length} / {props.event.numberOfVolunteers}

            </Typography>
            {volunteers.length === 0 ? 
          <Typography>
              Volunteers that have been confirmed for this oppurtunity will show up here.
          </ Typography> 
      : displayVolunteers}
          </Box>
        </Box>
    )
}

export default EventSection