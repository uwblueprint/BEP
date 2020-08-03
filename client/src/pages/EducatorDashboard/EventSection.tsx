import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';


const EventSection = (props: any) => {
  
    return (
      <Box>
          <Box>
            <Typography>Event Details</Typography>
            <Grid container spacing={2} >
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
        </Box>
    )
}

export default EventSection