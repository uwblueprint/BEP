import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import {
  ContainedButton,
  OutlinedButton,
} from "../../components/index";

import { PageViewer } from "../../data/types/pageTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(3),
    borderRadius: 5,
    boxShadow: "none",
    "&:hover": {
      boxShadow: "0 10px 25px rgba(0,0,0,0.08), 0 6px 6px rgba(0,0,0,0.08)",
    },
  },
  tag: {
    padding: "0px 3px",
    margin: "2px",
    textAlign: "center",
    borderRadius: 2,
    background: "#F7FAFC",
  },
  textHighlight: {
    paddingLeft: "1em",
    color: "#0A79BF",
    fontWeight: 700,
  },
  fieldHeader: {
    marginBottom: "8px",
  },
  eventName: {
    paddingBottom: "26px",
  },
}));

function getDate(props: any) {
  var date;
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

  if (eventStartDate === eventEndDate) {
    date = eventStartDate;
  } else {
    date = `${eventStartDate} to ${eventEndDate}`;
  }

  return date;
}

export default function EventCard(props: any) {
  const classes = useStyles();

  const type = props.type ? props.type : PageViewer.unknown;

  // change this
  const [buttonEnabled, setButtonEnabled] = React.useState(true);
  const [acceptOpen, setAcceptOpen] = React.useState(false);
  const [denyOpen, setDenyOpen] = React.useState(false);
  const [applicantAcceptedSnackbar, setAcceptSnackbarOpen] = React.useState(
    false
  );
  const [applicantDenySnackbar, setDenySnackbarOpen] = React.useState(false);

  // Press "Yes" when opening dialog box for confirming applicant acceptance
  const handleAcceptConfirm = () => {
    setAcceptOpen(false);
    // const newApplication: Application = application;
    // newApplication.status = ApplicationStatus.ACCEPTED;
    //Accept the Applicant
    // updateApplication(newApplication);
    setButtonEnabled(false);
    setAcceptSnackbarOpen(true);
  };

  // Press "Yes" when opening dialog box for confirming applicant rejection
  const handleDeclineConfirm = () => {
    setDenyOpen(false);
    // const newApplication: Application = application;
    // newApplication.status = ApplicationStatus.DECLINED;
    // // Reject the Applicant
    // updateApplication(newApplication);
    setButtonEnabled(false);
    setDenySnackbarOpen(true);
  };

  // Press "No" on either dialog box
  const handleStopConfirm = () => {
    setAcceptOpen(false);
    setDenyOpen(false);
  };

  // Press "Accept" which opens Confirmation Dialog
  const handleOpenAcceptConfirm = () => {
    setAcceptOpen(true);
  };

  // Press "Decline" which opens up a Confirmation Dialog
  const handleOpenDeclineConfirm = () => {
    setDenyOpen(true);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card} elevation={0}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Typography variant="h2" className={classes.eventName}>
                {props.event.eventName}
              </Typography>
            </Grid>
            { type === PageViewer.invitee ? 
              <Grid item xs={3}>
                <Grid
                  spacing={10}
                  container
                  alignItems="flex-end"
                  justify="flex-end"
                  style={{ paddingRight: 100 }}
                >
                  <Grid item xs={1} style={{ marginRight: 40 }}>
                    <OutlinedButton
                      onClick={handleOpenDeclineConfirm}
                      disabled={!buttonEnabled}
                      style={{ paddingRight: 22, paddingLeft: 22 }}
                    >
                      Decline
                    </OutlinedButton>
                    <Dialog
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      open={denyOpen}
                    >
                      <DialogTitle id="alert-dialog-title">
                        <Typography variant="h1">
                          Are you sure you want to{" "}
                          <Typography
                            style={{ color: "red", display: "inline" }}
                          >
                            decline
                          </Typography>{" "}
                        </Typography>
                      </DialogTitle>
                      <DialogContent
                        classes={{
                          root: classes.root,
                        }}
                      >
                        <DialogContentText id="alert-dialog-description">
                          <Typography>
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
                          onClick={handleDeclineConfirm}
                          style={{ paddingRight: 22, paddingLeft: 22 }}
                        >
                          Yes
                        </ContainedButton>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                  <Grid item xs={1}>
                    <ContainedButton
                      onClick={handleOpenAcceptConfirm}
                      disabled={!buttonEnabled}
                      style={{ paddingRight: 25, paddingLeft: 25 }}
                    >
                      Accept
                    </ContainedButton>
                    <Dialog
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      open={acceptOpen}
                    >
                      <DialogTitle id="alert-dialog-title">
                        <Typography variant="h1">
                          <Typography
                            style={{ color: "green", display: "inline" }}
                          >
                            accept
                          </Typography>{" "}
                        </Typography>
                      </DialogTitle>
                      <DialogContent
                        classes={{
                          root: classes.root,
                        }}
                      >
                        <DialogContentText id="alert-dialog-description">
                          <Typography >
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
                          onClick={handleAcceptConfirm}
                          style={{ paddingRight: 22, paddingLeft: 22 }}
                        >
                          Yes
                        </ContainedButton>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                </Grid>
              </Grid> 
            : null}
            
            <Grid item xs={6}>
              <Typography variant="subtitle1" className={classes.fieldHeader}>
                Event Type
              </Typography>
              <Typography variant="body1">
                {props.event.activityType.join(", ")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" className={classes.fieldHeader}>
                Preferred Sector
              </Typography>
              <Typography variant="body1">
                {props.event.preferredSector
                  ? props.event.preferredSector.join(", ")
                  : ""}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" className={classes.fieldHeader}>
                Date(s) of Event
              </Typography>
              <Typography variant="body1">{getDate(props)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" className={classes.fieldHeader}>
                Grades of participating students
              </Typography>
              <Typography variant="body1">
                {props.event.gradeOfStudents.join(", ")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" className={classes.fieldHeader}>
                Hours of Commitment
              </Typography>
              <Typography variant="body1">
                {props.event.hoursCommitment}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" className={classes.fieldHeader}>
                Number of Students
              </Typography>
              <Typography variant="body1">
                {props.event.numberOfStudents}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        { !props.isPastEvent && type === PageViewer.applicant ? (
          <CardContent>
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <Typography variant="subtitle2" className={classes.tag}>
                  Application Status: Pending
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        ) : null}

        { !props.isPastEvent && type !== PageViewer.volunteer && 
            type !== PageViewer.applicant && type !== PageViewer.invitee ? (
          <CardContent>
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <Typography variant="subtitle2" className={classes.tag}>
                  Posting expires on{" "}
                  {new Date(props.event.postingExpiry)
                    .toLocaleString("default", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                    .replace(",", "")}
                </Typography>
              </Grid>
              {props.showOwner && (
                <React.Fragment>
                  <Grid item xs={3}>
                    <Typography variant="subtitle2" className={classes.tag}>
                      Applications Received{" "}
                      <span className={classes.textHighlight}>
                        {props.event.applicantNumber}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle2" className={classes.tag}>
                      Invitations Sent{" "}
                      <span className={classes.textHighlight}>
                        {props.event.invitationNumber}
                      </span>
                    </Typography>
                  </Grid>
                </React.Fragment>
              )}
            </Grid>
          </CardContent>
        ) : null}
      </Card>
    </div>
  );
}
