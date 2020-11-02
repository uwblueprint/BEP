import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { TextButton, ContainedButton, OutlinedButton } from "../../../components/index";

import { PageViewer } from "../../../data/types/pageTypes";

export interface DialogProps {
  open: boolean;
}

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
  dialogTitle: {
    fontSize: "24px",
    fontWeight: 800,
  },
  dialogText: {
    color: "black",
  },
  dialogBody: {
    paddingLeft: "25px",
  },
}));

const EventSection = (props: any) => {
  const classes = useStyles();
  const [withdrawOpen, setWithdrawOpen] = React.useState(false);
  const [cancelOpen, setCancelOpen] = React.useState(false);
  const [acceptOpen, setAcceptOpen] = React.useState(false);
  const [denyOpen, setDenyOpen] = React.useState(false);

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
  
  const handleOpenCancelConfirm = () => {
    setCancelOpen(true);
  }

  const handleOpenWithdrawConfirm = () => {
    setWithdrawOpen(true);
  }

  const handleStopConfirm = () => {
    setWithdrawOpen(false);
    setCancelOpen(false);
  }

  const handleWithdrawConfirm = () => {
    setWithdrawOpen(false);
  }

  const handleCancelConfirm = () => {
    setCancelOpen(false);
  }

  const handleOpenAcceptConfirm = () => {
    setAcceptOpen(true);
  }

  const handleOpenDeclineConfirm = () => {
    setDenyOpen(true);
  }

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
              {props.event.activityType}
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
            <TextButton onClick={handleOpenCancelConfirm}>
              <Typography variant="body2">Cancel Attendance</Typography>
            </TextButton>
            <Dialog
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                open={cancelOpen}
            >
              <DialogTitle id="alert-dialog-title">
                <Typography variant="h5" className={classes.dialogTitle}>
                  Are you sure you want to{" "}
                  <Typography
                    className={classes.dialogTitle}
                    style={{ color: "red", display: "inline" }}
                  >
                    cancel
                  </Typography>{" "}
                    your attendance of this event?
                </Typography>
              </DialogTitle>
              <DialogContent
                  classes={{
                    root: classes.dialogBody,
                  }}
                >
                  <DialogContentText id="alert-dialog-description">
                    <Typography className={classes.dialogText}>
                      You cannot change your decision after this
                    </Typography>
                  </DialogContentText>
                </DialogContent>
                <DialogActions style={{ margin: 15 }}>
                  <OutlinedButton
                    onClick={handleStopConfirm}
                    style={{ paddingRight: 22, paddingLeft: 22 }}
                  >
                    No
                  </OutlinedButton>
                  <ContainedButton
                    onClick={handleCancelConfirm}
                    style={{ paddingRight: 22, paddingLeft: 22 }}
                  >
                    Yes
                  </ContainedButton>
                </DialogActions>
            </Dialog>
        </Grid>
        : null 
      }
      { props.viewerType === PageViewer.applicant ? 
        <Grid container direction="column" justify="center" alignItems="center" style={{ marginTop:"8%" }}>
          <Typography variant="body1">No longer interested in the event?</Typography>
          <TextButton onClick={handleOpenWithdrawConfirm}>
              <Typography variant="body2">Withdraw Application</Typography>
            </TextButton>
            <Dialog
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                open={withdrawOpen}
            >
              <DialogTitle id="alert-dialog-title">
                <Typography variant="h5" className={classes.dialogTitle}>
                  Are you sure you want to{" "}
                  <Typography
                    className={classes.dialogTitle}
                    style={{ color: "red", display: "inline" }}
                  >
                    withdraw
                  </Typography>{" "}
                    from the event?
                </Typography>
              </DialogTitle>
              <DialogContent
                  classes={{
                    root: classes.dialogBody,
                  }}
                >
                  <DialogContentText id="alert-dialog-description">
                    <Typography className={classes.dialogText}>
                      You cannot change your decision after this
                    </Typography>
                  </DialogContentText>
                </DialogContent>
                <DialogActions style={{ margin: 15 }}>
                  <OutlinedButton
                    onClick={handleStopConfirm}
                    style={{ paddingRight: 22, paddingLeft: 22 }}
                  >
                    No
                  </OutlinedButton>
                  <ContainedButton
                    onClick={handleWithdrawConfirm}
                    style={{ paddingRight: 22, paddingLeft: 22 }}
                  >
                    Yes
                  </ContainedButton>
                </DialogActions>
            </Dialog>
        </Grid>
        : null 
      }

      { props.viewerType === PageViewer.invitee ? 
        <Grid item xs={12}>
          <Grid
            spacing={10}
            container
            alignItems="center"
            justify="center"
            style={{ paddingRight: 100 }}
          >
            <Grid item xs={1} style={{ marginRight: 40 }}>
              <OutlinedButton
                onClick={handleOpenDeclineConfirm}
                style={{ paddingRight: 22, paddingLeft: 22 }}
              >
                Decline
              </OutlinedButton>
            </Grid>
            <Grid item xs={1}>
              <ContainedButton
                onClick={handleOpenAcceptConfirm}
                style={{ paddingRight: 25, paddingLeft: 25 }}
              >
                Accept
              </ContainedButton>
            </Grid>
          </Grid>
        </Grid> 
      : null
      }
    </div>
  );
};

export default EventSection;
