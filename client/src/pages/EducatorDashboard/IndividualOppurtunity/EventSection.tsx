import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles(() => ({
  root: {
      paddingTop: '10px'
  }
}));


const EventSection = (props: any) => {

  const classes = useStyles()

  var eventStartDate = new Date(props.event.startDate).toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' }).replace(',', '')
  var eventEndDate = new Date(props.event.endDate).toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' }).replace(',', '')
  
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
                    {eventStartDate} to {eventEndDate}
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
          </Box>
        </Box>
    )
}

export default EventSection