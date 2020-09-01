import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import { PageViewer } from "../../../data/types/pageTypes";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    fontSize: "18px",
    marginBottom: "32px",
  },
  fieldHeader: {
    fontSize: "12px",
    marginBottom: "8px",
  },
  fieldText: {
    fontSize: "16px",
  },
  card: {
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(3),
    borderRadius: 5,
  },
  bottomCard: {
    margin: `${theme.spacing(2)}px auto ${theme.spacing(0)}px auto`,
    padding: theme.spacing(3),
    borderRadius: 5,
  },
}));

const EventSection = (props: any) => {
  const classes = useStyles();

  var eventStartDate = new Date(props.event.startDate)
    .toLocaleString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .replace(",", "");
  var eventEndDate = new Date(props.event.endDate)
    .toLocaleString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .replace(",", "");
  var eventExpiryDate = new Date(props.event.postingExpiry)
    .toLocaleString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .replace(",", "");

  return (
    <div className={classes.root}>
      <Card className={classes.card} elevation={0}>
        <Typography
          variant="h6"
          classes={{
            root: classes.root,
          }}
        >
          Event Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              component="h1"
              className={classes.fieldHeader}
            >
              ACTIVITY TYPE
            </Typography>
            <Typography variant="body1" className={classes.fieldText}>
              {props.event.activityType.join(", ")}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              component="h1"
              className={classes.fieldHeader}
            >
              PREFERRED SECTOR
            </Typography>
            <Typography variant="body1" className={classes.fieldText}>
              {props.event.preferredSector
                ? props.event.preferredSector.join(", ")
                : ""}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              component="h1"
              className={classes.fieldHeader}
            >
              DATE(S) OF EVENTS
            </Typography>
            <Typography variant="body1" className={classes.fieldText}>
              {eventStartDate} to {eventEndDate}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              component="h1"
              className={classes.fieldHeader}
            >
              GRADES OF PARTICIPATING STUDENTS
            </Typography>
            <Typography variant="body1" className={classes.fieldText}>
              {props.event.gradeOfStudents}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              component="h1"
              className={classes.fieldHeader}
            >
              HOURS OF COMMITMENT
            </Typography>
            <Typography variant="body1" className={classes.fieldText}>
              {props.event.hoursCommitment}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              component="h1"
              className={classes.fieldHeader}
            >
              NUMBER OF STUDENTS
            </Typography>
            <Typography variant="body1" className={classes.fieldText}>
              {props.event.numberOfStudents}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              component="h1"
              className={classes.fieldHeader}
            >
              NUMBER OF VOLUNTEERS NEEDED
            </Typography>
            <Typography variant="body1" className={classes.fieldText}>
              {props.event.numberOfVolunteers}
            </Typography>
          </Grid>
        </Grid>
      </Card>
      <Card className={classes.card} elevation={0}>
        <Typography
          variant="h6"
          classes={{
            root: classes.root,
          }}
        >
          School Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              component="h1"
              className={classes.fieldHeader}
            >
              SCHOOL
            </Typography>
            <Typography>{props.event.contact.school.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              component="h1"
              className={classes.fieldHeader}
            >
              ADDRESS
            </Typography>
            <Typography>
              {props.event.contact.school.address},{" "}
              {props.event.contact.school.city}{" "}
              {props.event.contact.school.province},{" "}
              {props.event.contact.school.postalCode.substr(0, 3)}{" "}
              {props.event.contact.school.postalCode.substr(3, 3)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              component="h1"
              className={classes.fieldHeader}
            >
              TRANSPORTATION
            </Typography>
            <Typography>{props.event.schoolTransportation}</Typography>
          </Grid>
        </Grid>
      </Card>
      {props.isEducator || props.viewerType === PageViewer.volunteer && (
        <Card className={classes.bottomCard} elevation={0}>
          <Typography
            variant="h6"
            classes={{
              root: classes.root,
            }}
          >
            {" "}
            Contact Details{" "}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                component="h1"
                className={classes.fieldHeader}
              >
                Educator
              </Typography>
              <Typography>
                {props.event.contact.firstName} {props.event.contact.lastName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                component="h1"
                className={classes.fieldHeader}
              >
                Position
              </Typography>
              <Typography>{props.event.contact.position}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                component="h1"
                className={classes.fieldHeader}
              >
                Phone Number
              </Typography>
              <Typography>
                {props.event.contact.phoneNumber.substr(0, 3)}{"-"}
                {props.event.contact.phoneNumber.substr(3, 3)}{"-"}
                {props.event.contact.phoneNumber.substr(6, 4)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="subtitle1"
                component="h1"
                className={classes.fieldHeader}
              >
                Email Address
              </Typography>
              <Typography>{props.event.contact.email}</Typography>
            </Grid>
          </Grid>
        </Card>
      )}
      { props.viewerType !== PageViewer.volunteer ? 
        <Grid container direction="row" justify="flex-end" alignItems="flex-end">
          <Typography
            variant="body1"
            style={{ fontSize: "12px", opacity: "0.7" }}
          >
            Posting expires on {eventExpiryDate}
          </Typography>
        </Grid> : null
      } 
      { props.viewerType === PageViewer.volunteer ? 
        <Grid container direction="column" justify="center" alignItems="center" style={{ marginTop:"8%" }}>
          <Typography variant="body1">Can't make the event anymore?</Typography>
          <Typography variant="body2">Cancel Attendance</Typography>
        </Grid>
        : null 
      }
      { props.viewerType === PageViewer.applicant ? 
        <Grid container direction="column" justify="center" alignItems="center" style={{ marginTop:"8%" }}>
          <Typography variant="body1">No longer interested in the event?</Typography>
          <Typography variant="body2">Withdraw Application</Typography>
        </Grid>
        : null 
      }
    </div>
  );
};

export default EventSection;
